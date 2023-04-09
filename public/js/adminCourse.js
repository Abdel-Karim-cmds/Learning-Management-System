
//Gets a list of all student and lecturers
async function getPeople() {
    //Call the function that will get The list of all courses
    getCourse()


    let response = await fetch("/getPeople", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);

    //Call the function that populates the people with the fetched data
    populatePeople(jsondata)
}

// Populates all the people on the table
function populatePeople(people) {
    var table = document.getElementById('table');
    people.forEach(person => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        dataId.className ="userID";
        var textId = document.createTextNode(person.id);
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(person.stud_name);
        dataName.appendChild(textName);
        var dataEmail = document.createElement('td');
        var textEmail = document.createTextNode(person.email);
        dataEmail.appendChild(textEmail);
        var dataPass = document.createElement('td');
        var textPass = document.createTextNode(person.Password);
        dataPass.appendChild(textPass);
        var dataStud = document.createElement('td');
        var textStud = document.createTextNode(person.courses.student);
        dataStud.appendChild(textStud);
        var dataLec = document.createElement('td');
        var textLec = document.createTextNode(person.courses.lecturer);
        dataLec.appendChild(textLec);
        row.appendChild(dataId)
        row.appendChild(dataName)
        row.appendChild(dataEmail)
        row.appendChild(dataPass)
        row.appendChild(dataStud)
        row.appendChild(dataLec)
        table.appendChild(row);
    });

}


// Gets all the courses from the json file
async function getCourse() {
    let response = await fetch("/sendCourse", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);

    //Calls the function that populates all the courses
    populateCourse(jsondata)
}


//Populates the list of course on the form 
function populateCourse(courses) {
    let courseList = document.getElementById('checkboxList')
    courses.forEach(course => {

        var breaks = document.createElement('br');

        //Creates the input tag
        var check = document.createElement('input')

        //Creates the span where the course id will be displayed
        var span = document.createElement('span')

        // Adds attribute to the input type
        check.setAttribute("type", "checkbox")
        check.setAttribute("value", course.id)
        check.className = "courseCheckList"
        check.setAttribute("onchange", "enable(this)")

        // Get the course id and assigns it to the checkbox
        var TextValue = document.createTextNode(course.id)
        span.appendChild(TextValue)


        //create the radio for student
        var studentRadio = document.createElement('input')

        //Define the attribute of the student radio
        studentRadio.setAttribute("type", "radio")
        studentRadio.setAttribute("value", "student");
        studentRadio.className = "studentRadioButton"
        studentRadio.setAttribute("name", course.id)

        //Disable all radios by default
        studentRadio.setAttribute("disabled", "true")

        //create the placeholder for the student
        var stud = document.createElement('span')
        var studType = document.createTextNode("Student")
        stud.appendChild(studType)

        //create the radio for lecturer
        var lecturerRadio = document.createElement('input')

        //Define the attribute of the lecturer radio
        lecturerRadio.setAttribute("type", "radio")
        lecturerRadio.setAttribute("value", "lecturer");
        lecturerRadio.id = "lecturerRadioButton"
        lecturerRadio.setAttribute("name", course.id)

        // //Disable all buttons by default
        lecturerRadio.setAttribute("disabled", "true")

        //create the placeholder for the student
        var lecs = document.createElement('span')
        var lecsType = document.createTextNode("Lecturer")
        lecs.appendChild(lecsType)

        //Append all that to the check to the list
        courseList.appendChild(check)
        courseList.appendChild(span)
        courseList.appendChild(studentRadio);
        courseList.appendChild(stud)
        courseList.appendChild(lecturerRadio)
        courseList.appendChild(lecs)
        courseList.appendChild(breaks)

    });

    onlyOneCheckBox()

}

//Make sure that only a maximum of 4 course is been selected
function onlyOneCheckBox() {
    var checkboxgroup = document.getElementById('checkboxList').getElementsByClassName('myChk')
    var limit = 4;
    for (var i = 0; i < checkboxgroup.length; i++) {
        checkboxgroup[i].onclick = function () {
            var checkedcount = 0;
            for (var i = 0; i < checkboxgroup.length; i++) {
                checkedcount += (checkboxgroup[i].checked) ? 1 : 0;
            }
            if (checkedcount > limit) {
                alert("You can select maximum of 4 courses.");
                this.checked = false;
            }
        }
    }
}

// Enables or disabled the radio button
function enable(element) {
    //Checks if the checkbox is checked  and enables the corresponfing radios
    if (element.checked) {
        let radios = document.getElementsByName(element.value)
        radios.forEach(radio => {
            radio.removeAttribute("disabled")
        });
    }
    //If it is not checked i.e was previously checked. It will disable the radio
    else {
        let radios = document.getElementsByName(element.value)
        radios.forEach(radio => {
            radio.setAttribute("disabled", "true")
        });

    }
}