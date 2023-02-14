// const server = 'http://localhost:3000';

studentsList = []
//Gets a list of all student and lecturers
async function getdetails2() {
    getCourse()
    let response = await fetch("/getCourse", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);
    selectStudents(jsondata)
}

function selectStudents(elements){
    elements.forEach(element => {
        if(element.Type == 'Student'){
            studentsList.push(element)
        }
    });
    console.log(studentsList)
    populateStudents(studentsList)
}

function populateStudents(students){
    var table = document.getElementById('table');
    students.forEach(student => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(student.id);
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(student.stud_name);
        dataName.appendChild(textName);
        var dataEmail = document.createElement('td');
        var textEmail = document.createTextNode(student.email);
        dataEmail.appendChild(textEmail);
        var dataBtn = document.createElement('Button');
        dataBtn.className = "btn btn-warning"
        dataBtn.setAttribute("data-toggle","modal")
        dataBtn.setAttribute("data-target","#studModal")
        dataBtn.setAttribute("onclick","getId(this)")
        var textBtn = document.createTextNode("View more details");
        dataBtn.appendChild(textBtn)
        row.appendChild(dataId)
        row.appendChild(dataName)
        row.appendChild(dataEmail)
        row.appendChild(dataBtn)
        table.appendChild(row);
    });
}


function getId(element) {
    // alert("row" + element.parentNode.parentNode.rowIndex + 
    // " - column" + element.parentNode.cellIndex);
console.log(element.parentNode.rowIndex)
rowi = element.parentNode.rowIndex;


// cell = element.parentNode.rowIndex.document.getElementsByTagName('td')


var table = document.getElementById('table');

console.log("HI element")
console.log(element.parentNode.parentNode)
}


// function something(element){
//     console.log("Hi")
//     // Track onclicks on all td elements
// var table = document.getElementsByTagName("table")[0];
// // Get all the rows in the table
// var rows = table.getElementsByTagName("tr");

// for (var i = 0; i < rows.length; i++) {
//     //Get the cells in the given row
//     var cells = rows[i].getElementsByTagName("td");
//     for (var j = 0; j < cells.length; j++) {
//         // Cell Object
//         var cell = cells[j];
//         cell.rowIndex = i;
//         cell.positionIndex = j;
//         cell.totalCells = cells.length;
//         cell.totalRows = rows.length;
//         // Track with onclick
//         console.log("CELLS")
//         console.log(cell);
//         cell.onclick = function () {
//             alert("I am in row " + this.rowIndex + " (out of " + this.totalRows + " rows) and I am position " + this.positionIndex + " (out of " + this.totalCells + " cells)");
//         };
//     }
// }
// }