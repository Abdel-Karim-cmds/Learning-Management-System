const server = 'http://localhost:3000';
var type;
var userName;
information = []
courses = []
pCourse = []

sessionInfo = []

async function getSession(){
    let response = await fetch('/getSession', {method:"GET"})
    let data = await response.text()
    sessionInfo = JSON.parse(data)
    getCourse()
}

// Gets a spcific course that the user is affiliated to
function getspCourse(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(element.email==sessionInfo.uEmail){
            console.log("I found it")
            pCourse.push(element.courses)
            information.push(element)
            populateTable(information)
        }
    }
}

//Gets a list of all student and lecturers
async function getCourse() {
    let response = await fetch("/getCourse", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);
    getspCourse(jsondata);
}

//Display the information on the table
function populateTable(informations) {
    var table = document.getElementById('table');
    informations.forEach(information => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(information.id);
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(information.stud_name);
        dataName.appendChild(textName);
        var dataCourse = document.createElement('td');
        var textCourse = document.createTextNode(information.Password);
        dataCourse.appendChild(textCourse);
        var dataEmail = document.createElement('td');
        var textEmail = document.createTextNode(information.email);
        dataEmail.appendChild(textEmail);
        row.appendChild(dataId)
        row.appendChild(dataName)
        row.appendChild(dataCourse)
        row.appendChild(dataEmail)
        table.appendChild(row);
    });
}