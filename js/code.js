const urlBase = 'http://cscop4331c.com/LAMPAPI';
const extension = 'php';

let userId = 0;
let firstName = "";
let lastName = "";

let contactFirstName = "";
let contactLastName = "";
let phoneNumber = "";
let emailAddress = "";
let contactId = "";

function doLogin()
{
	let login = document.getElementById("user").value;
	let password = document.getElementById("pass").value;

	// document.getElementById("loginResult").innerHTML = "";

	let tmp = {Login:login,Password:password};
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/Login.' + extension;

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
				
				if (jsonObject.status == true)
				{
					userId = jsonObject.response[0].ID;
				}
				else
				{
					// document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.response[0].FirstName;
				lastName = jsonObject.response[0].LastName;

				window.location.href = "contactList.html";

				saveUserCookie();
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
	readUserCookie();
	console.log(userId);
	let tmp = {UserID: userId};
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/FetchAllContacts.' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

	xhr.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200)
		{
			let jsonObject = JSON.parse( xhr.responseText );
      if (jsonObject.status == true)
			  populateTable(jsonObject.response);
		}
	};

	xhr.send(jsonPayload);
}

function populateTable(jsonObject) {
	let tableBody = document.getElementById("tableBody");
	for (var i = 0; i < jsonObject.length; i++)
	{
		var contact = jsonObject[i];
		console.log(contact);
		var row = "<tr><td>" + contact.FirstName + "</td><td>" + contact.LastName + "</td><td>" + contact.PhoneNumber + "</td><td>" + contact.EmailAddress + "</td></tr>"; 
		tableBody.innerHTML += row;
	}
}

function SignUp()
{
  firstName = document.getElementById("fname").value;
	lastName =  document.getElementById("lname").value;
	let login = document.getElementById("username").value;
	let password = document.getElementById("password").value;
  
	let tmp = {FirstName: firstName, LastName: lastName, Login: login, Password: password};
	let jsonPayload = JSON.stringify( tmp );
	let url = urlBase + '/SignUp.' + extension;

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

				if (jsonObject.status == true)
				{
					// not the actual homepage
					window.location.href = "contactList.html";

          userId = jsonObject.ID;
					saveUserCookie();
				}
				else
				{
					// document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
			}
		};
		xhr.send( jsonPayload );
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function deleteUser()
{
	
}

/*

	create user - Completed
		- firstname, lastname, login, password
	update user
		- firstname, lastname, login, password, id
	delete user
		- id
	login user - completed
	sign out - completed

	fetch contacts - completed
	update contact
		- firstname, lastname, phoneNumber, emailAddress, userId
	delete contact
		- phoneNumber, userId
	create contact
		- firstname, lastname, phonenumber, emailaddress, userid

	page close - completed

*/

function readCookie( name )
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++)
	{
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1,c.length);

		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}

	return null;
}

function saveContactCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "ContactCookie=firstName=" + contactFirstName + ",lastName=" + contactLastName + ",phoneNumber=" + phoneNumber + ",emailAddress=" + emailAddress + ",userId=" + userId + ";expires=" + date.toGMTString();
}


function saveUserCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "UserCookie=firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readContactCookie()
{
	
}

function readUserCookie()
{
	userId = -1;
	// let data = document.cookie;
	let data = readCookie("UserCookie");
  if (data == null)
  {
    window.location.href = "index.html";
  }
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
		// document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "UserCookie=firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
