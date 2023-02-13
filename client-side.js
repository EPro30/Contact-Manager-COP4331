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

function getContact(id){
kids = id.children
console.log( kids[0].innerText)
localStorage.setItem("firstName", kids[0].innerText);
 localStorage.setItem("lastName", kids[1].innerText);
 localStorage.setItem("email", kids[3].innerText);
 localStorage.setItem("phoneNumber", kids[2].innerText);
 localStorage.setItem("dateCreated", kids[4].innerText);
}

  
function generateTable() {

  
  console.log(window.innerWidth)
  if(window.innerWidth < 800){
    details = true
  }
 else{
  details = false
    
  }
 
  var table = $('#contactList').bootstrapTable({
    columns: [{
      field: 'firstName',
      title: 'First \n Name',
      sortable: "True",
      cellStyle: 'cellStyle',
      dataVisible: "True"      
    }, {
      field: 'lastName',
      title: 'Last \nName',
      sortable: "True",
      cellStyle: 'cellStyle',
      dataVisible: "True"
    }, {
      field: 'phoneNumber',
      title: 'Phone \n Number',
      sortable: "True",
      cellStyle: 'cellStyle',
      dataVisible: "False"
    },{
      field: 'email',
      title: 'Email',
      sortable: "True",
      cellStyle: 'cellStyle',
      dataVisible: "False"
    }
  ],
  showButtonIcons:true,
  detailView: true,
    smartDisplay: true,
    data: contactListTEMP,
    pagination: true,
    pageSize: 8, //your page size here
    pageList: [25, 50, 75, 100],//list of page sizes
    headerStyle: 'headerStyle',
    rowStyle: 'rowStyle'
    
    
  })

  $("#contactList").on("click-row.bs.table", function (row, $el, field) {
   console.log($el.firstName)
    localStorage.setItem("firstName", $el.firstName);
    localStorage.setItem("lastName", $el.lastName);
    localStorage.setItem("email", $el.email);
    localStorage.setItem("phoneNumber",$el.phoneNumber);
    localStorage.setItem("dateCreated",$el.dateCreated);
    window.location.href = "edit.html";


  });

  if(details){
    table.bootstrapTable('hideColumn', 'email')
    table.bootstrapTable('hideColumn', 'phoneNumber')
  }

  // test()
  }

  function detailFormatter(index, row) {
    var html = []
    $.each(row, function (key, value) {
      if(key == 'firstName'){
        html.push('<p><b>' + 'First Name' + ':</b> ' + value + '</p>')
      }
      else if(key == 'lastName'){
        html.push('<p><b>' + 'Last Name' + ':</b> ' + value + '</p>')
      }
      else if(key == 'email'){
        html.push('<p><b>' + 'Email' + ':</b> ' + value + '</p>')
      }
      else if(key == 'phoneNumber'){
        html.push('<p><b>' + 'Phone Number' + ':</b> ' + value + '</p>')
      }
      else if(key == 'dateCreated'){
        html.push('<p><b>' + 'Date Created' + ':</b> ' + value + '</p>')
      }
      
    })
    return html.join('')
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

function headerStyle(column) {
  return {
    firstName: {
      classes: 'p-0 m-0 border-0 text-break',
      // css: {
      //   ' font-size': '85%',
      //   'column-width': '10%'
      //  }
    },
    lastName: {
      id: 'lName',
      classes: 'p-0 m-0 border-0 text-break',
      // css: {
      //   ' font-size': '85%',
      //   'column-width': '10%'
      //  }
    },
    email: {
      classes: 'p-0 m-0 border-0 text-break',
      // css: {
      //   ' font-size': '85%',
      //   'column-width': '25%'
      //  }
    },
    phoneNumber: {
      classes: 'p-0 m-0 border-0 text-break',
      
    },
    dateCreated: {
      classes: 'p-0 m-0 border-0 text-break',
      
    },
  }[column.field]
}

function cellStyle(value, row, index) {
  return {
    classes: 'px-0 m-0 border-top border-bottom border-0',
    // css: {
    //  ' font-size': '85%'
    // }
  }
}

function rowStyle(row, index) {
 
  return {
    // classes: 'p-0 m-0 border-0',
    // css: {
    //   'column-width': '7%',
    //   'font-size': '75%',
    //   color: 'blue'
    // }
  }
}
function buttons () {
  return {
    btnUsersAdd: {
      text: 'Highlight Users',
      icon: 'fa-users',
      event: function () {
        alert('Do some stuff to e.g. search all users which has logged in the last week')
      },
      attributes: {
        title: 'Search all users which has logged in the last week'
      }
    },
    btnAdd: {
      text: 'Add new row',
      icon: 'fa-plus',
      event: function () {
        alert('Do some stuff to e.g. add a new row')
      },
      attributes: {
        title: 'Add a new row to the table'
      }
    }
  }
}