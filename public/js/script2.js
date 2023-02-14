const server = 'http://localhost:3000';
var type;
var userName;
information = [] // Will contain the details about the suer
courses = [] // Willl contain all the courses
pCourse = [] // Will contain all the courses the user is doing
datas = [] // Contains all the information about the courses the user is doing
sessionInfo = [] // Contains the session information


// Gets the name and Type(Student or Lecturer) of user 
// function getInfo() {
//     type = document.getElementById('user').innerText;
//     userName = document.getElementById('name').innerText;
//     getCourse()
// }


async function getSession(){
    let response = await fetch('/getSession', {method:"GET"})
    let data = await response.text()
    sessionInfo = JSON.parse(data)
    getCourse()
}

//Gets all the courses in the json file
async function getCourse() {
    let response = await fetch("/sendCourse", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);
    courses = jsondata
    console.log("All courses")
    console.log(jsondata)
    getdetails()
}

//Gets a list of all student and lecturers
async function getdetails() {
    let response = await fetch("/getCourse", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);
    console.log("All lecs and studs")
    console.log(jsondata)
    getspCourse(jsondata)

}

function getspCourse(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(element.email==sessionInfo.uEmail){
            console.log("I found it")
            pCourse.push(element.courses)
            information.push(element)
            console.log("Infromation")
            console.log(information)
            console.log(pCourse)
            compare(pCourse[0])
        }
    }
}


// Gets the information about the courses offered by the user
function compare(array){
    console.log("Hi")
    console.log(array)
    console.log(courses)
    array.forEach(element => {
        for (let index = 0; index < courses.length; index++) {
            if (element == courses[index].id) {
                datas.push(courses[index])
            }
        }
    });
    console.log("DATA PUSH")
    console.log(datas)
    populataTable(datas)
}

//Display the information on the table
function populataTable(p_courses) {
    var table = document.getElementById('table');
    p_courses.forEach(p_course => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(p_course.id);
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(p_course.c_name);
        dataName.appendChild(textName);
        var dataCourse = document.createElement('td');
        var textCourse = document.createTextNode(p_course.description);
        dataCourse.appendChild(textCourse);
        row.appendChild(dataId)
        row.appendChild(dataName)
        row.appendChild(dataCourse)
        table.appendChild(row);
    });

}