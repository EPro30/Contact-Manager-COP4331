const urlBase = "https://cscop4331c.com/LAMPAPI";
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
    // Storing login credentials
    let login = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;

    // JSON object for login credentials
    let tmp = { Login: login, Password: password };
    
    // Converting JSON Object to JSON string
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data
    let url = urlBase + "/Login." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                    // Storing user credentials response from the database
                    userId = jsonObject.response[0].ID;
                    firstName = jsonObject.response[0].FirstName;
                    lastName = jsonObject.response[0].LastName;

                    window.location.href = "contactList.html";
                    saveUserCookie();
                } else {
                    // Input login-crdentials did not match any user
                    // in the database
                    document.getElementById("submitButtonError").innerHTML =
                        "Invalid User ID or Password. Please try again.";
                    document.getElementById("submitButtonError").style.display =
                        "block";

                    return;
                }
            }
        };
        // sending data
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

// Function to create new user account
function SignUp() {
    // Storing new user credentials
    firstName = document.getElementById("fname").value;
    lastName = document.getElementById("lname").value;
    let login = document.getElementById("email").value;
    let password = document.getElementById("cnfmpwd").value;
    
    // JSON object for new user credentials
    let tmp = {
        FirstName: firstName,
        LastName: lastName,
        Login: login,
        Password: password,
    };
    
    // Converting JSON object to JSON string
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data
    let url = urlBase + "/SignUp." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                    // New user added to the database
                    window.location.href = "contactList.html";
                    userId = jsonObject.ID;
                    saveUserCookie();
                } else {
                    // Duplicate user Id found in the database
                    document
                        .getElementById("email")
                        .classList.add("is-invalid");
                    document.getElementById("usernameError").innerHTML =
                        "This username already exists";
                    document.getElementById("usernameError").style.display =
                        "block";
                    return;
                }
            }
        };
        // sending data
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

// Function to reset user credentials and expiry time
function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie =
        "UserCookie=firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

// Function to add new contact to the database
function addContact() {
    // load current user credentials
    readUserCookie();
    
    // Storing new Contact information
    contactFirstName = document.getElementById("fname").value;
    contactLastName = document.getElementById("lname").value;
    phoneNumber = document.getElementById("phone").value;
    emailAddress = document.getElementById("email").value;

    // JSON Object for new Contact information
    let tmp = {
        FirstName: contactFirstName,
        LastName: contactLastName,
        PhoneNumber: phoneNumber,
        EmailAddress: emailAddress,
        UserID: userId,
    };
    
    // Converting JSON Object to JSON string
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data 
    let url = urlBase + "/CreateContact." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                  // New contact successfully added to the database
                    window.location.href = "contactList.html";
                } else {
                  // Duplicate phone numbers found in the contact list
                    document
                        .getElementById("phone")
                        .classList.add("is-invalid");
                    document.getElementById("existingNumber").innerHTML =
                        "This phone number already exists in your contacts";
                    document.getElementById("existingNumber").style.display =
                        "block";
                    return;
                }
            }
        };
        // sending data
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

// Function to delete contact based on phone number
function deleteContact() {
    // load current user credentials
    readUserCookie();
    
    // store phone number of the selected contact
    phoneNumber = document.getElementById("displayPhone").textContent;
  
    // JSON Object for phone number and userId 
    // required for filtering database
    let tmp = {
        PhoneNumber: phoneNumber,
        UserID: userId,
    };

    // Converting JSON Object to JSON string
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data
    let url = urlBase + "/DeleteContact." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                // Selected contact has been deleted successfully
                // from the database
                    window.location.href = "contactList.html";
                } else {
                    return;
                }
            }
        };
        // sending data
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

function fetchContacts() {

    // Clear search error message
    document.getElementById("errorMsg").textContent = "";
    
    // load current user information
    readUserCookie();

    // JSON object for user id required for filtering database
    let tmp = { UserID: userId };
    
    // Converting JSON Object to JSON String
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data 
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
                
                // contact list found for the given user id
                if (jsonObject.status == true) 
                    generateTable(jsonObject.response);
            }
        };
        // sending data
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

// Function to filter contact list for specific search input
function searchAPI() {

  // clear search error message.
  document.getElementById("errorMsg").textContent = "";
  
  // load current user information
	readUserCookie();
 
  // store search input
	let searchContents = document.getElementById("searchBar").value;
    
    // JSON object for serach input and user input
    // required for filtering database
    let tmp = { UserId: userId, SearchFor: searchContents};
    
    // Converting JSON object to JSON String
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data
    let url = urlBase + "/Search." + extension;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    try {
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                  // Destroying and regenerating table based on search response
                    $("#contactList").bootstrapTable("destroy");
                    generateTable(jsonObject.response);
                } else {
                  // Destroy and Set error message
                    $("#contactList").bootstrapTable("destroy");
                    document.getElementById("errorMsg").innerHTML =
                        "No record(s) found.";
                    document.getElementById("errorMsg").style.display =
                        "block";
                }
            }
        };
        // sending data
        xhr.send(jsonPayload);
    } catch (err) {
      console.log(err.message);
    }
}

// Function to update selected contact
async function updateContact() {

    // Fetch selected contact
    [userId, contactId] = await fetchOneContact();

    // Store current contact information
    [contactFirstName, contactLastName, emailAddress, phoneNumber] =
        getTextFieldValues();

    // JSON Object for current contact information
    let tmp = {
        ID: contactId,
        FirstName: contactFirstName,
        LastName: contactLastName,
        PhoneNumber: phoneNumber,
        EmailAddress: emailAddress,
        UserID: userId,
    };
    
    // Converting JSON object to JSON string
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data
    let url = urlBase + "/ContactUpdate." + extension;
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
                // Contact information successfully updated
                    window.location.href = "contactList.html";
                } else {
                // Duplicate entries found
                    document.getElementById("existingNumber").innerHTML = 
                        "One or more contacts exist with similar information.";
                    document.getElementById("existingNumber").style.display = "block";
                    return;
                }
            }
        };
        // sending data
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err.message);
    }
}

// Function to retrieve input from text fields
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

// Function to fetch individual contact from contact list
function fetchOneContact() {
    readUserCookie();
    
    // Filter contact list based on phone number
    phoneNumber = document.getElementById("displayPhone").textContent;

    // JSON object for specific phone number and userId
    let tmp = { PhoneNumber: phoneNumber, UserID: userId };
    
    // Converting JSON object to JSON string
    let jsonPayload = JSON.stringify(tmp);
    
    // Making HTTP request to send and retrieve data
    let url = urlBase + "/FetchOneContact." + extension;
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                if (jsonObject.status == true) {
                    // retrieving data on successful query execution
                    contactId = jsonObject.response[0].ID;
                    resolve([userId, contactId]);
                } else {
                    reject("Failed to fetch contact");
                }
            }
        };
        // sending data
        xhr.send(jsonPayload);
    });
}

// Function to read document.cookie for current user
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

// Function to store User information in document.cookie
function saveUserCookie() {
    // Storing expiry time for current user
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    
    // Storing individual fields
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

// Function to extract individual information from user cookie
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
    }
}

// Function to generate and display table for contact list
function generateTable(response) {
    console.log(response);
    if (localStorage.getItem("pageSize") === null) {
        localStorage.setItem("pageSize", 8);
    }
    if (
        !(localStorage.getItem("pageSize") == 4) &&
        !(localStorage.getItem("pageSize") == 8) &&
        !(localStorage.getItem("pageSize") == 16) &&
        !(localStorage.getItem("pageSize") == 24)
    ) {
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
                field: "FirstName",
                title: "First Name",
                sortable: true,
                cellStyle: "cellStyle",
                align: "center",
            },
            {
                field: "LastName",
                title: "Last Name",
                sortable: true,
                cellStyle: "cellStyle",
                align: "center",
            },
            {
                field: "PhoneNumber",
                title: "Phone Number",
                sortable: "True",
                cellStyle: "cellStyle",
                align: "center",
            },
            {
                field: "EmailAddress",
                title: "Email Address",
                sortable: "True",
                cellStyle: "cellStyle",
                align: "center",
            },
        ],
        showButtonIcons: true,
        detailView: true,
        smartDisplay: true,
        data: response,
        pagination: true,
        cache: false,
        pageSize: localStorage.getItem("pageSize"), //your page size here
        pageList: [4, 8, 16, 24], //list of page sizes
        headerStyle: "headerStyle",
        onPageChange: function (number, size) {
            drop = parseInt(
                document.getElementsByClassName("page-size")[0].innerText
            );
            localStorage.setItem("pageSize", drop);
            styling();
        },
        onSort: function (name, order) {
            styling();
        },
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
    tab = document.getElementById("contactList").parentElement;
    tableWidth = tab.offsetWidth;
    tableHeight = tab.offsetHeight;
    tableRatio = tableHeight / tableWidth;

    // wider table = smaller number
    if (
        localStorage.getItem("pageSize") == 4 ||
        table.bootstrapTable("getData").length <= 8
    ) {
        if (tableRatio >= 174 / 630) {
            table.bootstrapTable("hideColumn", "EmailAddress");
        }
        if (tableRatio > 174 / 630) {
            table.bootstrapTable("hideColumn", "PhoneNumber");
        }
    } else if (localStorage.getItem("pageSize") == 8) {
        if (tableRatio >= 298 / 663) {
            table.bootstrapTable("hideColumn", "EmailAddress");
        }
        if (tableRatio > 322 / 630) {
            table.bootstrapTable("hideColumn", "PhoneNumber");
        }
    } else if (localStorage.getItem("pageSize") == 16) {
        console.log("Test");
        if (tableRatio > 568 / 870) {
            table.bootstrapTable("hideColumn", "EmailAddress");
        }
        if (tableRatio > 568 / 450) {
            table.bootstrapTable("hideColumn", "PhoneNumber");
        }
    } else if (localStorage.getItem("pageSize") == 24) {
        table.bootstrapTable("showColumn", "phoneNumber");
        if (tableRatio > 830 / 870) {
            table.bootstrapTable("hideColumn", "EmailAddress");
        }
        if (tableRatio > 830 / 630) {
            table.bootstrapTable("hideColumn", "PhoneNumber");
        }
    }
}

// Function to format contact list details
function detailFormatter(index, row) {
    var html = [];

    html.push('<div class= "mx-auto justify-content-center"><div>');
    $.each(row, function (key, value) {
        if (key == "FirstName") {
            html.push(
                '<p ><b class = "form-label">' +
                    "First Name" +
                    ":</b> " +
                    value +
                    "</p>"
            );
        } else if (key == "LastName") {
            html.push(
                '<p><b class = "form-label">' +
                    "Last Name" +
                    ":</b> " +
                    value +
                    "</p>"
            );
        } else if (key == "EmailAddress") {
            html.push(
                '<p><b class = "form-label">' +
                    "Email" +
                    ":</b> " +
                    value +
                    "</p>"
            );
        } else if (key == "PhoneNumber") {
            html.push(
                '<p><b class = "form-label">' +
                    "Phone Number" +
                    ":</b> " +
                    value +
                    "</p>"
            );
        } else if (key == "DateCreated") {
            html.push(
                '<p><b class = "form-label">' +
                    "Date Created" +
                    ":</b> " +
                    value +
                    "</p>"
            );
        }
    });
    html.push("</div></div>");
    return html.join("");
}

// Function to set display individual contact information
function getContact(id) {
    kids = id.children;
    localStorage.setItem("FirstName", kids[0].innerText);
    localStorage.setItem("LastName", kids[1].innerText);
    localStorage.setItem("EmailAddress", kids[3].innerText);
    localStorage.setItem("PhoneNumber", kids[2].innerText);
    // localStorage.setItem("dateCreated", kids[4].innerText);
}

// Function to set display of home-page
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

// Function to set display of edit-page
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

// Function to set display of home-page tab title
function titleButFun() {
    title = document.getElementsByTagName("title");
    for (i of title) {
        i.innerText = localStorage
            .getItem("FirstName")
            .concat(" ".concat(localStorage.getItem("LastName")));
    }
}

// Function to set display of edit-page tab title
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

// Function to set display of table header
function headerStyle(column) {
    return {
        firstName: {
            classes: "p-0 m-0 border-0 text-break",
            // css: {
            //   ' font-size': '85%',
            //   'column-width': '10%'
            //  }
        },
        lastName: {
            id: "lName",
            classes: "p-0 m-0 border-0 text-break",
            // css: {
            //   ' font-size': '85%',
            //   'column-width': '10%'
            //  }
        },
        EmailAddress: {
            classes: "p-0 m-0 border-0 text-break",
            // css: {
            //   ' font-size': '85%',
            //   'column-width': '25%'
            //
        },
        phoneNumber: {
            classes: "p-0 m-0 border-0 text-break",
        },
        dateCreated: {
            classes: "p-0 m-0 border-0 text-break",
        },
    }[column.field];
}

// Supplementary Function
function cellStyle(value, row, index) {
    return {
        //classes: 'px-0 m-0 border-top border-bottom border-0',
        // css: {
        //  ' font-size': '85%'
        // }
    };
}

// Supplementary Function
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

// Function to set display of home page
function welcome() {
    title = document.getElementById("welcomeCustom");
    title.innerText = "Welcome " + firstName + " " + lastName + "!";
}

// Function to set display of home page tab title
function titleButFunHome() {
    title = document.getElementById("homeTitle");
    title.innerText = firstName + " " + lastName + "'s contacts";
}
