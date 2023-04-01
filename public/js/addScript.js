const server = 'http://localhost:3000';
var pId;
var pName;
var pPass;
var pType;
var pEmail;
var allCourses = []

//Gets all the courses in the json file
async function getCourse() {
    let response = await fetch("/sendCourse", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);
    allCourses = jsondata
    console.log("All courses")
    console.log(allCourses)
    populateCourse(allCourses)
}


// adds the student to the json file
async function addStud() {
    console.log("Received Student")
    pEmail = document.getElementById('mailStud').value;
    pId = document.getElementById('studID').value;
    pName = document.getElementById('studName').value;
    pPass = document.getElementById('studPass').value;
    const url = server + "/person";
    const stud = {
        email: pEmail,
        id: pId,
        stud_name: pName,
        Password: pPass,
        courses: ["APP4035", "APT4900", "SFE4020"], // This needs to be changed so that the data is fetched dynamically
        Type: "Student"
    };
    console.log(stud);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stud),
    };
    const response = await fetch(url, options);
    console.log(response);

}

// adds the lecturer to the json file
async function addLec() {
    console.log("Received Lecturer")
    pEmail = document.getElementById('mailLec').value;
    pId = document.getElementById('idLec').value;
    pName = document.getElementById('nameLec').value;
    pPass = document.getElementById('passLec').value;
    const url = server + "/person";
    const lec = {
        email: pEmail,
        id: pId,
        stud_name: pName,
        Password: pPass,
        courses: ["APP4035", "APT4900", "SFE4020"], // This needs to be changed so that the data is fetched dynamically
        Type: "Lecturer"
    };
    console.log(lec);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(lec),
    };
    const response = await fetch(url, options);
    console.log(response); // This should also change in order to display message using alert() instead of console.log

}

//To populate the course form
function populateCourse(courses){
    let courseList = document.getElementById('checkboxList')
    courses.forEach(course => {
        var breaks = document.createElement('br');
        var check = document.createElement('input')
        var span = document.createElement('span')
        check.setAttribute("type", "checkbox")
        check.setAttribute("value",course.id)
        check.className = "myChk"
        var TextValue = document.createTextNode(course.id)
        span.appendChild(TextValue)
        // val.createTextNode(course.id)
        // check.innerHTML(course.id)
        courseList.appendChild(check)
        courseList.appendChild(span)
        courseList.appendChild(breaks)
        // courseList.innerText(span)
        // console.log(TextValue)
        // courseList.appendChild(val)
    });
}

//*******************************  
// This is where the addCourse function should be located
// ******************************/


/* Manav Patel, you can refer to script and script2 to see how the jsondata is been received from the backend
You need two arrays, student adn lecturer which will hold the data
Once you receive the entire json file you should split them into two different arrays
and if the student tab is active the you populate the table with the student array else with the lecturer array
you can even create another js file if need be
you can then go to the hbs file for the student and make an onload function that will automatically populate the table
*/