// const urlBase = 'http://COP4331-5.com/LAMPAPI';
const urlBase = 'http://cscop4331c.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";
let user;

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	let login = document.getElementById("user").value;
	let password = document.getElementById("pass").value;

	// document.getElementById("loginResult").innerHTML = "";

	let tmp = {login:login,password:password};
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/UserLogin.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				let jsonObject = JSON.parse( xhr.responseText );
				user = new User(jsonObject.data[0].ID, jsonObject.data[0].FirstName, jsonObject.data[0].LastName);
				
				if (jsonObject.status == true)
				{
					userId = jsonObject.data[0].ID;
				}
				else
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				// firstName = jsonObject.firstName;
				// lastName = jsonObject.lastName;
				
				console.log(user.userId + ' ' + user.firstName + ' ' + user.lastName);

				window.location.href = "contactList.html";

				saveCookie();
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function fetchContacts() {
	let tmp = {userId: user.userId};
	let jsonPayload = JSON.stringify( tmp );
	console.log(jsonPayload);
	let url = urlBase + '/ContactFetchAll.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	

	xhr.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200)
		{
			let jsonObject = JSON.parse( xhr.responseText );
			populateTable(jsonObject);
		}
	};

	xhr.send(jsonPayload);
}

function populateTable(jsonObject) {
	let tableBody = document.getElementById("tableBody");
	for (var i = 0; i < jsonObject.length; i++)
	{
		var contact = jsonObject[i];
		var row = "<tr><td>" + contact.firstName + "</td><td>" + contact.lastName + "</td><td>" + contact.phoneNumber + "</td><td>" + contact.email + "</td></tr>"; 
		tableBody.innerHTML += row;
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	let newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	let tmp = {color:newColor,userId,userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/AddColor.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	let colorList = "";

	let tmp = {search:srch,userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchColors.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = async function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}


class User {
	constructor(userId, firstName, lastName) {
		this._userId = id;
		this._firstName = firstName;
		this._lastName = lastName;
	}

	get userId() {
		return this._userId;
	}

	set userId(value) {
		this._userId = value;
	}

	get firstName() {
		return this._firstName;
	}

	set firstName(value) {
		this._firstName = value;
	}

	get lastName() {
		return this._lastName;
	}

	set lastName(value) {
		this._lastName = value;
	}
}