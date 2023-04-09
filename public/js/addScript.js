const server = 'http://localhost:3000';

//Adds courses to json file
async function addCourse() {
    console.log("Received Course")
    let cId = document.getElementById('idCourse').value;
    let cName = document.getElementById('nameCourse').value;
    let cDesc = document.getElementById('passCourse').value;
    const url = "/course";
    const course = {
        id: cId,
        c_name: cName,
        description: cDesc
    };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    };
    const response = await fetch(url, options);

    //Display a message when the course has been successfully added
    if(response.status == 400){
        const outcome = await response.json();
        alert (outcome.message)
    }

    //Display a message when the course can't be added
    if(response.status == 200){
        const outcome = await response.json();
        alert (outcome.message)
    }
}

async function addPerson(){
    //Get the info of the user
    let pEmail = document.getElementById('mailStud').value;
    let pId = document.getElementById('studID').value;
    let pName = document.getElementById('studName').value;
    let pPass = document.getElementById('studPass').value;
   
    const url = "/person";

    let studying = [];
    let teaching = [];
    let boxes = document.querySelectorAll('.myChk');

    // Cycle through all the checkboxes
    boxes.forEach(box => {
        //Verify is a checkbox is checked
        if(box.checked){

            //If it is checked get the two radios
            let radio = document.getElementsByName(box.value)

            //Cycle through both radios
            radio.forEach(element => {

                //Decide where to put the course depending on the value
                if(element.checked){
                    if(element.value == 'student'){
                        studying.push(element.name)
                    }
                    else{
                        teaching.push(element.name)
                    }
                }
            });

        }
        
    });

    const person = {
                email: pEmail,
                id: pId,
                stud_name: pName,
                Password: pPass,
                courses: {
                    student:studying,
                    lecturer:teaching
                },
                };

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
    };
    const response = await fetch(url, options);

    //Display a message when the user has been successfully added
    if(response.status == 400){
        const outcome = await response.json();
        alert (outcome.message)
    }

    //Display a message when the user can't be added
    if(response.status == 200){
        const outcome = await response.json();
        alert (outcome.message)
    }
}

if(document.getElementById('person')){
    document.getElementById('person').addEventListener('submit', (e)=>{
    e.preventDefault();
    sID = document.getElementById('studID').value;
    verify(sID)
    if(verify(sID))
        addPerson()
    else
        alert('Invalid User ID')
})}

if(document.getElementById('course')){
document.getElementById('course').addEventListener('submit', (e)=>{
    let cID = document.getElementById('idCourse').value;
    if(cID.length!=7){
        alert("Invalid Course ID")
    }
    else{
    addCourse();}
    e.preventDefault
})}


function verify(id){
    if(/^[0-9]+$/.test(id) && id>=600000 && id<700000)
        return true
    else
        return false
}