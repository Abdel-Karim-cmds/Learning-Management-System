const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const sessions = require("express-session");
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require("uuid");
const fileName = "People.json"
const courseFile = "Courses.json"
const fs = require('fs')
const jsonParser = bodyparser.json();
const urlencoded = bodyparser.urlencoded({ extended: false })
const oneDay = 1000 * 60 * 60 * 24;

const router = require('./router');

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}


// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);
let len = data.length;

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ entended: true }))

app.set('view engine', 'hbs');
app.set('trust proxy', 1)

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(cookieParser())

// Enables the use of Express session
app.use(sessions({
    secret: "thisadhjkasjdkashdjkasfasjkfasjkgfasdd4as65418947561984",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay }
}))

app.use('/route', router);

var session;

//home route 
app.get('/', (req, res) => {
    res.render('base', { title: "Login System" });
})

// Admin Dashboard
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

//Main page of stduent/lecturer login
app.get('/dashboard1', (req, res) => {
    res.render('student', { name: session.user.uName, mail: session.user.uEmail, user: newUser.uType })
})

//Get the session information
app.get('/getSession', (req, res) => {
    res.send(session.user)
})

//Course page of stduent/lecturer login
app.get('/dashboard2', (req, res) => {
    if (newUser.uType == 'Student') {
        res.render('stud_courses', { name: session.user.uName, user: session.user.uType, mail: session.user.uEmail, doing: 'learning' });
    } else {
        res.render('stud_courses', { name: session.user.uName, user: session.user.uType, mail: session.user.uEmail, doing: 'teaching' });
    }
})

//Gets the page where the admin sees the lecturers
app.get('/lec', (req, res) => {
    res.render('admin_lec.hbs');
})

//Gets the page where the admin sees the courses
app.get('/a_courses', (req, res) => {
    res.render('admin_courses.hbs');
})

//Login Button
app.post('/login', (req, res) => {
    // let data = JSON.parse(fs.readFileSync('People.json'))
    if (req.body.email == credential.email && req.body.password == credential.password) {
        session = req.session;
        session.userName = req.body.email;
        session.psw = req.body.password;
        console.log(req.session)
        res.redirect('/dashboard') // If admin is logged
    } else {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            if ((req.body.email == data[i].email) && (req.body.password == data[i].Password)) {
                newUser = { uEmail: data[i].email, uName: data[i].stud_name, uID: data[i].id, uPwd: data[i].Password, uType: data[i].Type }
                session = req.session;
                session.user = newUser;
                console.log(req.session)
                if (data[i].Type == 'Student') { // When the lecturer or student logs in
                    res.redirect('/dashboard1')
                } else if (data[i].Type == 'Lecturer') {
                    res.redirect('/dashboard1')
                }
            }
        }
    }
})

//Gets all the Student and lecturer and sends it to the front-end
app.get('/getCourse', function(request, response) {
    const js = fs.readFileSync(fileName, { root: __dirname });
    response.send(js);
})

//Gets all the Courses and  sends to the front end
app.get('/sendCourse', function(request, response) {
    const js = fs.readFileSync(courseFile, { root: __dirname });
    response.send(js);
})

//Terminates the sessions
app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log("user logged out.")
    res.redirect('/');
});


//Joel Obowu (Anold should look take example from this)
//Adds the user to the Person.json
app.post("/person", jsonParser, (request, response) => {
    console.log("Received")
        // the data needs to be screened before been added to the json file
    data.push(request.body);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.end(); // This should be modiied to send error 
});

// Anold Nyato
//***********************/
//This is where the the post method for course addition should be added
//************************/


/*
// Adds the  new lecturer
app.post("/addLec", urlencoded, (request, response) => {
    lec = { id: request.body.idLec, stud_name: request.body.nameLec, Password: request.body.passLec, courses: ["APP4035", "APP4080", "SFE4020"], Type: "Lecturer" }
    console.log(lec)
    data.push(lec);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    // response.end();
});

//Adds the new student
app.post("/addStud", urlencoded, (request, response) => {
    stud = { id: request.body.studID, stud_name: request.body.studName, Password: request.body.studPass, courses: ["APP4035", "APP4080", "SFE4020"], Type: "Student" }
    data.push(stud);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    // response.end();
});
 */


console.log("This is just a random line")

//Opens the port
app.listen(port, () => { console.log("Listening to server 3000") });