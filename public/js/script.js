// const server = 'http://localhost:3000';
userStudCourse = [];
userLecCourse = [];
userCourses = [];
allCourses = [];

async function getSession() {
  let response = await fetch("/getSession", { method: "GET" });
  let data = await response.text();
  let sessionInfo = JSON.parse(data);
  userStudCourse = sessionInfo.courses.student;
  userLecCourse = sessionInfo.courses.lecturer;
  userCourses = sessionInfo.courses;
  populateInfoTable(sessionInfo);
}

//Gets a list of all student and lecturers
async function getCourse() {
  let response = await fetch("/sendCourse", { method: "GET" });
  let data = await response.text();
  allCourses = JSON.parse(data);
  populateCourseTable(allCourses);
}

//Populate the table with the user's informations
function populateInfoTable(information) {
  let table = document.getElementById("informationTable");
  var row = document.createElement("tr");
  var dataId = document.createElement("td");
  var textId = document.createTextNode(information.id);
  dataId.appendChild(textId);
  var dataName = document.createElement("td");
  var textName = document.createTextNode(information.stud_name);
  dataName.appendChild(textName);
  var dataEmail = document.createElement("td");
  var textEmail = document.createTextNode(information.email);
  dataEmail.appendChild(textEmail);
  row.appendChild(dataId);
  row.appendChild(dataName);
  row.appendChild(dataEmail);
  table.appendChild(row);
  getCourse();
}

//Populate the course Information table
function populateCourseTable(courses) {
  courses.forEach((course) => {
    if (userStudCourse.includes(course.id)) {
      createRow(course, "Student");
    }
    if (userLecCourse.includes(course.id)) {
      createRow(course, "Lecturer");
    }
  });
}

// Function that creates the row with the type of individual i.e student or lecturer
function createRow(course, type) {
  var table = document.getElementById("courseTable");
  var row = document.createElement("tr");
  var dataId = document.createElement("td");
  var textId = document.createTextNode(course.id);
  dataId.appendChild(textId);
  var dataName = document.createElement("td");
  var textName = document.createTextNode(course.c_name);
  dataName.appendChild(textName);
  var dataCourse = document.createElement("td");
  var textCourse = document.createTextNode(course.description);
  dataCourse.appendChild(textCourse);
  var dataType = document.createElement("td");
  var textType = document.createTextNode(type);
  dataType.appendChild(textType);
  row.appendChild(dataId);
  row.appendChild(dataName);
  row.appendChild(dataCourse);
  row.appendChild(dataType);
  table.appendChild(row);
}
