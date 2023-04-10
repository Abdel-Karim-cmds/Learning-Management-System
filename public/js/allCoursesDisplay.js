courses = []

async function getCourse() {
    let response = await fetch("/sendCourse", { method: "GET" });
    let data = await response.text();
    jsondata = JSON.parse(data);
    for (let index = 0; index < jsondata.length; index++) {
        courses.push(jsondata[index]);
        
    }
    populataTable(courses)
}

function populataTable(courses) {
    var table = document.getElementById('table');
    courses.forEach(courses => {
        var row = document.createElement('tr');
        var dataId = document.createElement('td');
        var textId = document.createTextNode(courses.id);
        dataId.className = 'courseID'
        dataId.appendChild(textId);
        var dataName = document.createElement('td');
        var textName = document.createTextNode(courses.c_name);
        dataName.appendChild(textName);
        var dataCourse = document.createElement('td');
        var textCourse = document.createTextNode(courses.description);
        dataCourse.appendChild(textCourse);
        row.appendChild(dataId)
        row.appendChild(dataName)
        row.appendChild(dataCourse)
        table.appendChild(row);
    });

}