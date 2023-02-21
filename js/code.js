const urlBase = "http://cscop4331c.com/LAMPAPI";
const extension = "php";

// USER VARIABLES
let userId = 0;
let firstName = "";
let lastName = "";

// CONTACT VARIABLES
let contactFirstName = "";
let contactLastName = "";
let phoneNumber = "";
let emailAddress = "";
let contactId = "";

// Function to login a user
function doLogin() {
  let login = document.getElementById("email").value;
  let password = document.getElementById("pwd").value;

  let tmp = { Login: login, Password: password };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/Login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) {
          userId = jsonObject.response[0].ID;
          firstName = jsonObject.response[0].FirstName;
          lastName = jsonObject.response[0].LastName;

          window.location.href = "contactList.html";
          saveUserCookie();
        } else 
        {
          document.getElementById("submitButtonError").innerHTML = "Invalid User ID or Password. Please try again.";
          document.getElementById("submitButtonError").style.display = "block";
          
          return;
        }
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    // ADD ERROR MESSAGE
  }
}

function SignUp() {
  firstName = document.getElementById("fname").value;
  lastName = document.getElementById("lname").value;
  let login = document.getElementById("email").value;
  let password = document.getElementById("cnfmpwd").value;

  let tmp = {
    FirstName: firstName,
    LastName: lastName,
    Login: login,
    Password: password,
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/SignUp." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) {
          // not the actual homepage
          window.location.href = "contactList.html";
          userId = jsonObject.ID;
          saveUserCookie();
        } else {
          document.getElementById("email").classList.add("is-invalid");
          document.getElementById("usernameError").innerHTML =
            "This username already exists";
          document.getElementById("usernameError").style.display = "block";
          return;
        }
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    // document.getElementById("loginResult").innerHTML = err.message;
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie =
    "UserCookie=firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function addContact() {
  readUserCookie();
  contactFirstName = document.getElementById("fname").value;
  contactLastName = document.getElementById("lname").value;
  phoneNumber = document.getElementById("phone").value;
  emailAddress = document.getElementById("email").value;

  let tmp = {
    FirstName: contactFirstName,
    LastName: contactLastName,
    PhoneNumber: phoneNumber,
    EmailAddress: emailAddress,
    UserID: userId,
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/CreateContact." + extension;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) {
          window.location.href = "contactList.html";
        } else {
          document.getElementById("phone").classList.add("is-invalid");
          document.getElementById("existingNumber").innerHTML =
            "This phone number already exists in your contacts";
          document.getElementById("existingNumber").style.display = "block";
          return;
        }
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    // document.getElementById("loginResult").innerHTML = err.message;
  }
}

function deleteContact() {
  readUserCookie();
  phoneNumber = document.getElementById("displayPhone").textContent;

  let tmp = {
    PhoneNumber: phoneNumber,
    UserID: userId,
  };

  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/DeleteContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) {
          window.location.href = "contactList.html";
        } else {
          return;
        }
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    // document.getElementById("loginResult").innerHTML = err.message;
  }
}

function fetchContacts() {
  readUserCookie();

  let tmp = { UserID: userId };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/FetchAllContacts." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      // check if readystate is DONE (4) and the status is OK (200)
      if (this.readyState == 4 && this.status == 200) {
        // save the response from the api
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) generateTable(jsonObject.response);
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    // ADD ERROR MESSAGE
  }
}

async function updateContact() {
  [userId, contactId] = await fetchOneContact();

  [contactFirstName, contactLastName, emailAddress, phoneNumber] =
    getTextFieldValues();

  let tmp = {
    ID: contactId,
    FirstName: contactFirstName,
    LastName: contactLastName,
    PhoneNumber: phoneNumber,
    EmailAddress: emailAddress,
    UserID: userId,
  };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/UpdateContact." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      // check if readystate is DONE (4) and the status is OK (200)
      if (this.readyState == 4 && this.status == 200) {
        // save the response from the api
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) {
          window.location.href = "contactList.html";
        } else {
          return;
        }
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    // ADD ERROR MESSAGE
  }
}

function getTextFieldValues() {
  if (document.getElementById("fname").value === "") {
    contactFirstName = document.getElementById("displayFirst").textContent;
  } else {
    contactFirstName = document.getElementById("fname").value;
  }

  if (document.getElementById("lname").value === "") {
    contactLastName = document.getElementById("displayLast").textContent;
  } else {
    contactLastName = document.getElementById("lname").value;
  }

  if (document.getElementById("email").value === "") {
    emailAddress = document.getElementById("displayEmail").textContent;
  } else {
    emailAddress = document.getElementById("email").value;
  }

  if (document.getElementById("phone").value === "") {
    phoneNumber = document.getElementById("displayPhone").textContent;
  } else {
    phoneNumber = document.getElementById("phone").value;
  }

  return [contactFirstName, contactLastName, emailAddress, phoneNumber];
}

function fetchOneContact() {
  readUserCookie();
  phoneNumber = document.getElementById("displayPhone").textContent;

  let tmp = { PhoneNumber: phoneNumber, UserID: userId };
  let jsonPayload = JSON.stringify(tmp);
  let url = urlBase + "/FetchOneContact." + extension;

  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.status == true) {
          contactId = jsonObject.response[0].ID;
          resolve([userId, contactId]);
        } else {
          reject(new Error("Failed to fetch contact"));
        }
      }
    };
    xhr.send(jsonPayload);
  });
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

function saveUserCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "UserCookie=firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}

function readUserCookie() {
  userId = -1;
  let data = readCookie("UserCookie");

  if (data == null) {
    window.location.href = "index.html";
  }

  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    // document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
  }
}

function generateTable(response) {
  if(localStorage.getItem('pageSize') === null)
    {
      localStorage.setItem("pageSize", 8);
      
    }
    if(!(localStorage.getItem('pageSize') == 4)&&!(localStorage.getItem('pageSize') == 8)&&!(localStorage.getItem('pageSize') == 16) &&!(localStorage.getItem('pageSize') == 24))
    {
      localStorage.setItem("pageSize", 8);
      
    }

  if (window.innerWidth < 800) {
    details = true;
  } else {
    details = false;
  }

  var table = $("#contactList").bootstrapTable({
    columns: [
            {
            field: 'FirstName',
            title: 'First Name',
            sortable: true,
            cellStyle: 'cellStyle',
            align: 'center'
          }, {
            field: 'LastName',
            title: 'Last Name',
            sortable: true,
            cellStyle: 'cellStyle',
            align: 'center'
          }, {
            field: 'PhoneNumber',
            title: 'Phone Number',
            sortable: "True",
            cellStyle: 'cellStyle',
            align: 'center',
            
          },{
            field: 'EmailAddress',
            title: 'Email Address',
            sortable: "True",
            cellStyle: 'cellStyle' ,
            align: 'center'
          }
        ],
    showButtonIcons: true,
    detailView: true,
    smartDisplay: true,
    data: response,
    pagination: true,
    pageSize:  localStorage.getItem("pageSize"), //your page size here
    pageList: [4, 8, 16, 24], //list of page sizes
    headerStyle: "headerStyle",
    onPageChange: function (number, size) {
            drop = parseInt(document.getElementsByClassName('page-size')[0].innerText)
             localStorage.setItem("pageSize", drop);
             styling();
          },
          onSort: function (name, order) {
        
             styling();
          }
  });

  $("#contactList").on("click-row.bs.table", function (row, $el, field) {
    localStorage.setItem("FirstName", $el.FirstName);
    localStorage.setItem("LastName", $el.LastName);
    localStorage.setItem("EmailAddress", $el.EmailAddress);
    localStorage.setItem("PhoneNumber", $el.PhoneNumber);
    // localStorage.setItem("dateCreated", $el.dateCreated);
    window.location.href = "edit.html";
  });
  
   // logic to make the table more responsive
          tab = document.getElementById("contactList").parentElement
          tableWidth = tab.offsetWidth
          tableHeight =  tab.offsetHeight
          tableRatio = tableHeight/tableWidth
          
          console.log(String(tableHeight), '/', String(tableWidth))
          // wider table = smaller number
          if((localStorage.getItem('pageSize') == 4) || (table.bootstrapTable('getData').length <=8 ) ){
            if((tableRatio) >= (174 / 630)) {
                  table.bootstrapTable('hideColumn', 'EmailAddress');
              }
            if((tableRatio) > (174 / 630)) {
              table.bootstrapTable('hideColumn', 'PhoneNumber');
              }

          } 
          else if(localStorage.getItem('pageSize') == 8){
            if((tableRatio) >= (298 / 663)) {
                  table.bootstrapTable('hideColumn', 'EmailAddress');
              }
            if((tableRatio) > (322 / 630)) {
                    table.bootstrapTable('hideColumn', 'PhoneNumber');
              }

          }
          else  if(localStorage.getItem('pageSize') == 16){
            console.log("Test" )
            if((tableRatio) > ( 568 / 870)) {
                  table.bootstrapTable('hideColumn', 'EmailAddress');
              }
            if((tableRatio) >( 568 / 450 )) {
                    table.bootstrapTable('hideColumn', 'PhoneNumber');
              }

          }
          else if(localStorage.getItem('pageSize') == 24){
            table.bootstrapTable('showColumn', 'phoneNumber');
            if((tableRatio) > ( 830 / 870)) {
                  table.bootstrapTable('hideColumn', 'EmailAddress');
              }
            if((tableRatio) >(830 / 630)) {
              table.bootstrapTable('hideColumn', 'PhoneNumber');
              }

          }
  


}

function detailFormatter(index, row) {
    var html = []
    
    
  
    html.push('<div class= "mx-auto justify-content-center"><div>');
    $.each(row, function (key, value) {
      if(key == 'FirstName'){
        html.push('<p ><b class = "form-label">' + 'First Name' + ':</b> ' + value + '</p>');
      }
      else if(key == 'LastName'){
        html.push('<p><b class = "form-label">' + 'Last Name' + ':</b> ' + value + '</p>');
      }
      else if(key == 'EmailAddress'){
        html.push('<p><b class = "form-label">' + 'Email' + ':</b> ' + value + '</p>');
      }
      else if(key == 'PhoneNumber'){
        html.push('<p><b class = "form-label">' + 'Phone Number' + ':</b> ' + value + '</p>');
      }
      else if(key == 'DateCreated'){
        html.push('<p><b class = "form-label">' + 'Date Created' + ':</b> ' + value + '</p>');
      }
      
    })
    html.push('</div></div>');
    return html.join('');
  }


function getContact(id) {
  kids = id.children;
  localStorage.setItem("FirstName", kids[0].innerText);
  localStorage.setItem("LastName", kids[1].innerText);
  localStorage.setItem("EmailAddress", kids[3].innerText);
  localStorage.setItem("PhoneNumber", kids[2].innerText);
  // localStorage.setItem("dateCreated", kids[4].innerText);
}

function populateFullScreen() {
  document.getElementById("displayFirst").innerText =
    localStorage.getItem("FirstName");
  document.getElementById("displayLast").innerText =
    localStorage.getItem("LastName");
  document.getElementById("displayEmail").innerText =
    localStorage.getItem("EmailAddress");
  document.getElementById("displayPhone").innerText =
    localStorage.getItem("PhoneNumber");
}

function populateFullScreenEdit() {
  document.getElementById("displayFirst").innerText =
    localStorage.getItem("FirstName");
  document.getElementById("displayLast").innerText =
    localStorage.getItem("LastName");
  document.getElementById("displayEmail").innerText =
    localStorage.getItem("EmailAddress");
  document.getElementById("displayPhone").innerText =
    localStorage.getItem("PhoneNumber");
}

function titleButFun() {
  title = document.getElementsByTagName("title");
  for (i of title) {
    i.innerText = localStorage
      .getItem("FirstName")
      .concat(" ".concat(localStorage.getItem("LastName")));
  }
}

function titleButFunEdit() {
  title = document.getElementsByTagName("title");
  for (i of title) {
    i.innerText = "Edit ".concat(
      localStorage
        .getItem("FirstName")
        .concat(" ".concat(localStorage.getItem("LastName")))
    );
  }
}

function headerStyle(column) {
  return {
    firstName: {
      classes: 'p-0 m-0 border-0 text-break'
      // css: {
      //   ' font-size': '85%',
      //   'column-width': '10%'
      //  }
    },
    lastName: {
      id: 'lName',
      classes: 'p-0 m-0 border-0 text-break'
      // css: {
      //   ' font-size': '85%',
      //   'column-width': '10%'
      //  }
    },
    EmailAddress: {
      classes: 'p-0 m-0 border-0 text-break'
      // css: {
      //   ' font-size': '85%',
      //   'column-width': '25%'
      //  
    },
    phoneNumber: {
      classes: 'p-0 m-0 border-0 text-break'
      
    },
    dateCreated: {
      classes: 'p-0 m-0 border-0 text-break'
      
    }
  }[column.field];
}

function cellStyle(value, row, index) {
  return {
    //classes: 'px-0 m-0 border-top border-bottom border-0',
    // css: {
    //  ' font-size': '85%'
    // }
  };
}

function rowStyle(row, index) {
 
  return {
    // classes: 'p-0 m-0 border-0',
    // css: {
    //   'column-width': '7%',
    //   'font-size': '75%',
    //   color: 'blue'
    // }
  };
}


function welcome(){
  title = document.getElementById("welcomeCustom");
  title.innerText = "Welcome "+ (firstName) + " " +  lastName +"!";
}
function titleButFunHome(){
  title = document.getElementById("homeTitle");
  title.innerText =( (firstName) + " " +  lastName +"'s contacts");
}
  
function AccountSettings(){
  fName = document.getElementById("currentFName");
  fName.innerText = firstName;

  lName = document.getElementById("currentLName");
  lName.innerText = lastName;

  email = document.getElementById("currentEmail");
  email.innerText = userId;

}



