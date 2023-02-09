//  populateFullScreen( data);
// search();
// sortTable();
// getContact();
// populateTable();
// generateTable();
//  fixDataTable();

// var currentContact= {
//   firstName: "fname",
//   lastName: "lname",
//   phoneNumber: "123",
//   email: "test",
//   dateCreated: new Date("8/12/2001")
// }

var contactListTEMP =[{
  firstName: "Clementine",
  lastName: "Pitceathly",
  email: "cpitceathly0@ycombinator.com",
  phoneNumber: "778-259-5352",
  dateCreated: "4/3/2022"
}, {
  firstName: "Morgun",
  lastName: "Edwins",
  email: "medwins1@vinaora.com",
  phoneNumber: "349-757-0383",
  dateCreated: "2/23/2020"
}, {
  firstName: "Haily",
  lastName: "Youngman",
  email: "hyoungman2@mail.ru",
  phoneNumber: "996-160-1041",
  dateCreated: "12/1/2022"
}, {
  firstName: "Glyn",
  lastName: "Eglise",
  email: "geglise3@webnode.com",
  phoneNumber: "400-198-0743",
  dateCreated: "2/12/2022"
}, {
  firstName: "Sidoney",
  lastName: "Smaridge",
  email: "ssmaridge4@state.tx.us",
  phoneNumber: "728-321-7881",
  dateCreated: "4/15/2021"
}, {
  firstName: "Waite",
  lastName: "Blencoe",
  email: "wblencoe5@networksolutions.com",
  phoneNumber: "725-880-2604",
  dateCreated: "10/18/2022"
}, {
  firstName: "Zita",
  lastName: "Akett",
  email: "zakett6@wikia.com",
  phoneNumber: "356-263-8571",
  dateCreated: "7/9/2021"
}, {
  firstName: "Sabra",
  lastName: "Gariff",
  email: "sgariff7@ehow.com",
  phoneNumber: "202-896-0989",
  dateCreated: "7/15/2019"
}, {
  firstName: "Gaby",
  lastName: "Samwaye",
  email: "gsamwaye8@woothemes.com",
  phoneNumber: "296-612-3463",
  dateCreated: "12/26/2021"
}, {
  firstName: "Donny",
  lastName: "Itter",
  email: "ditter9@discovery.com",
  phoneNumber: "156-100-7066",
  dateCreated: "2/11/2020"
}, {
  firstName: "Rex",
  lastName: "Wildor",
  email: "rwildora@businesswire.com",
  phoneNumber: "197-435-8457",
  dateCreated: "5/4/2021"
}, {
  firstName: "Guglielmo",
  lastName: "Bradley",
  email: "gbradleyb@macromedia.com",
  phoneNumber: "238-754-1894",
  dateCreated: "11/25/2019"
}, {
  firstName: "Aaron",
  lastName: "Votier",
  email: "avotierc@rediff.com",
  phoneNumber: "712-323-0028",
  dateCreated: "9/20/2021"
}, {
  firstName: "Gabi",
  lastName: "Bauman",
  email: "gbaumand@wp.com",
  phoneNumber: "843-706-1028",
  dateCreated: "6/19/2021"
}, {
  firstName: "Lorrie",
  lastName: "Sherwill",
  email: "lsherwille@cmu.edu",
  phoneNumber: "791-266-8474",
  dateCreated: "12/5/2020"
}, {
  firstName: "Allyn",
  lastName: "Topes",
  email: "atopesf@gov.uk",
  phoneNumber: "627-972-7748",
  dateCreated: "2/12/2021"
}, {
  firstName: "Timothee",
  lastName: "Daldan",
  email: "tdaldang@howstuffworks.com",
  phoneNumber: "597-464-4477",
  dateCreated: "8/2/2022"
}, {
  firstName: "Mikol",
  lastName: "Piken",
  email: "mpikenh@uol.com.br",
  phoneNumber: "282-491-1243",
  dateCreated: "9/26/2019"
}, {
  firstName: "Wilhelm",
  lastName: "Shoveller",
  email: "wshovelleri@foxnews.com",
  phoneNumber: "621-443-3521",
  dateCreated: "3/12/2022"
}, {
  firstName: "Clem",
  lastName: "Louw",
  email: "clouwj@wiley.com",
  phoneNumber: "149-588-7740",
  dateCreated: "1/1/2021"
}, {
  firstName: "Niles",
  lastName: "MacBey",
  email: "nmacbeyk@w3.org",
  phoneNumber: "192-502-5033",
  dateCreated: "4/11/2020"
}, {
  firstName: "Cherianne",
  lastName: "Coast",
  email: "ccoastl@umich.edu",
  phoneNumber: "868-518-0303",
  dateCreated: "3/7/2021"
}, {
  firstName: "Krishna",
  lastName: "Ridings",
  email: "kridingsm@wikipedia.org",
  phoneNumber: "264-400-4856",
  dateCreated: "5/14/2022"
}, {
  firstName: "Ruth",
  lastName: "Janning",
  email: "rjanningn@weibo.com",
  phoneNumber: "833-848-1233",
  dateCreated: "4/30/2019"
}]





function search() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("contactList");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    tdF= tr[i].getElementsByTagName("td")[0];
    tdL= tr[i].getElementsByTagName("td")[1];
    tdE= tr[i].getElementsByTagName("td")[2];
    tdP= tr[i].getElementsByTagName("td")[3];
    tdD= tr[i].getElementsByTagName("td")[4];
    

    if (tdF || tdL || tdE || tdP || tdD) {
      txtValueF= ((tdF.textContent || tdF.innerText) .toUpperCase().indexOf(filter)) >-1;
      txtValueL= ((tdL.textContent || tdL.innerText) .toUpperCase().indexOf(filter)) >-1;
      txtValueE=(( tdE.textContent || tdE.innerText) .toUpperCase().indexOf(filter)) >-1;
      txtValueP = ((tdP.textContent || tdP.innerText) .toUpperCase().indexOf(filter)) >-1;
      txtValueD = ((tdD.textContent || tdPD.innerText) .toUpperCase().indexOf(filter)) >-1;

      if (txtValueF || txtValueL || txtValueE ||txtValueP || txtValueD) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("contactList");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
function getContact(id){
kids = id.children
console.log(localStorage.getItem("firstName"))
localStorage.setItem("firstName", kids[0].innerText);
 localStorage.setItem("lastName", kids[1].innerText);
 localStorage.setItem("email", kids[3].innerText);
 localStorage.setItem("phoneNumber", kids[2].innerText);
 localStorage.setItem("dateCreated", kids[4].innerText);
}


function populateTable(){
  table = document.getElementById("contactList");
  data = contactListTEMP;
  for (let element of data) {
    let row = table.insertRow( document.getElementById("contactList").rows.length);
    row.setAttribute("class", " text-center flex-fill px-3 ")
    row.setAttribute("onClick", "location.href='Expand.html'; getContact(this);")
    row.setAttribute("class",  " text-center flex-fill px-3 ")
    row.setAttribute("style",  "white-space: nowrap;")
    var cell1 = row.insertCell(0);
    cell1.innerText = element.firstName
    var cell2 = row.insertCell(1);
    cell2.innerText = element.lastName
    var cell3 = row.insertCell(2);
    cell3.innerText = element.email
    var cell4 = row.insertCell(3);
    cell4.innerText = element.phoneNumber
    var cell5 = row.insertCell(4);
    cell5.innerText  = element.dateCreated
  
  
  }
}
function generateTable() {

  var width = window.innerWidth * 0.6
  var height =window.innerHeight * 0.5

let table = new DataTable('#contactList',{
  columns: [
      {  data: 'firstName', title: 'First Name', className: 'row-border hover',width: "10%"},
      { data: 'lastName', title: 'Last Name', className: 'row-border hover',width: "10%" },
      {data:'phoneNumber',  title:  'Phone Number', className: 'row-border hover',width: "25%"  },
      { data:'email', title:  'Email', className: 'row-border hover', width: "40%"},
      { data: 'dateCreated' ,title:  'Date Created', className: 'row-border hover', width: "15%", type: "date" }
  ],
  scrollCollapse: true,
  data : contactListTEMP,
  rowId: 'contact',
  scrollX: width,
  scrollY: height,
  paging: true,
  pageLength: 8,
  lengthMenu: [4,8,16],
  buttons: false,
});
fixDataTable()



  }


function fixDataTable(){
rows = document.getElementsByClassName("even")
for(element of rows)
{
  element.setAttribute("onmouseover", "getContact(this);")
  element.setAttribute("onclick", " location.href='expand.html'")
}
rowsOdd= document.getElementsByClassName("odd")
for(element of rowsOdd)
{
  element.setAttribute("onmouseover", "getContact(this);")
  element.setAttribute("onclick", " location.href='expand.html'")
  
}

buttons = document.getElementsByClassName("paginate_button page-item ")
for(element of buttons){
  var temp = element.getAttribute("class")
  var att = temp.concat(" bg-dark border border-3 border-primary")
  element.setAttribute("class", att)
}

links = document.getElementsByClassName("page-link")
for(element of buttons){
  var temp = element.getAttribute("class")
  var att = temp.concat(" text-white bg-dark border border-3 border-primary")
  element.setAttribute("class",att )
}

select = document.getElementsByTagName("select")
for(element of select){
  var temp = element.getAttribute("style")
  if(temp){
    var att = temp.concat(" color:white")
    element.setAttribute("class",att )
  }
  if(temp){
    var att = temp.concat(" color:white")
    element.setAttribute("class",att )
  }

  var tempB= element.getAttribute("class")
  var attB = tempB.concat(" text-white")
  element.setAttribute("class",attB)
  element.setAttribute("data-bs-theme","dark" )
}


search = document.getElementsByTagName('input')
for(element of buttons){
  var temp = element.getAttribute("class")
  var att = temp.concat(" bg-dark text-white")
  element.setAttribute("class", att)
  element.setAttribute("style", 'color:white!important')

}

}

function populateFullScreen(){
console.log(localStorage.getItem("firstName"))
document.getElementById("displayFirst").innerText =  localStorage.getItem("firstName");
document.getElementById("displayLast").innerText =localStorage.getItem("lastName");
document.getElementById("displayEmail").innerText =localStorage.getItem("email");
document.getElementById("displayPhone").innerText = localStorage.getItem("phoneNumber");
document.getElementById("displayDate").innerText = localStorage.getItem("dateCreated");

}

function populateFullScreenEdit(){
  console.log(localStorage.getItem("firstName"))
  document.getElementById("displayFirst").innerText =  localStorage.getItem("firstName");
  document.getElementById("displayLast").innerText =localStorage.getItem("lastName");
  document.getElementById("displayEmail").innerText =localStorage.getItem("email");
  document.getElementById("displayPhone").innerText = localStorage.getItem("phoneNumber");
  
  }

function titleButFun(){
  title = document.getElementsByTagName("title")
  for(i of title ){
    i.innerText =  localStorage.getItem("firstName").concat(" ".concat(localStorage.getItem("lastName")) ) 
  }
}

function titleButFunEdit(){
  title = document.getElementsByTagName("title")
  for(i of title ){
    i.innerText =  "Edit ".concat(localStorage.getItem("firstName").concat(" ".concat(localStorage.getItem("lastName")) ) )
  }
}