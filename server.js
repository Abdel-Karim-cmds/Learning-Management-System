const express = require('express');
const sessions = require("express-session");
const JsonStore = require('express-session-json')(sessions)
const path = require('path');
const bodyparser = require("body-parser");
const cookieParser = require('cookie-parser');
const fileName = "People.json"
const courseFile = "Courses.json"
const fs = require('fs')
const jsonParser = bodyparser.json();
const oneDay = 1000 * 60 * 60 * 24;

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

// Load People json from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

// Load Course json from file
let rawCourse = fs.readFileSync(courseFile)
let dataCourse = JSON.parse(rawCourse)

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ entended: true }))

app.set('view engine', 'hbs');
app.set('trust proxy',1)


app.use((request, response, next) => {
    response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); 
    response.setHeader("Pragma", "no-cache"); 
    response.setHeader("Expires", "0"); 
    next()
});

app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))
app.use(cookieParser())

// Enables the use of Express session
app.use(sessions({
    secret: "thisadhjkasjdkashdjkasfasjkfasjkgfasdd4as65418947561984",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    store: new JsonStore()
}))

var session;
var message;

//home route 
app.get('/', (request, response) => {
    response.render('base', { title: "Login System", error:message });
})

// Admin Dashboard
app.get('/dashboard', (request, response) => {
    response.render('dashboard');
})

//Main page of stduent/lecturer login
app.get('/dashboard1', (request, response) => {
    response.render('student',{ name: session.user.stud_name})
})

//Get the session information
app.get('/getSession',(request,response)=>{
    response.send(request.session.user)
})

//Gets the page where the admin sees the courses
app.get('/a_courses', (request, response) => {
    if(session.user){
    response.render('admin_courses.hbs');}
})

//Login Button
app.post('/login', (request, response) => {
    if (request.body.email == credential.email && request.body.password == credential.password) {
        // session = request.session;
        request.session.user = request.body;
        response.redirect('/dashboard') // If admin is logged
    } else {
        for (let i = 0; i < data.length; i++) {
            if ((request.body.email == data[i].email) && (request.body.password == data[i].Password)) {
                // session = request.session;
                request.session.user = data[i];
                return response.redirect('/dashboard1')
            }
        }
        message = "Incorrect username or password"
        return response.redirect('/')
    }
})

//Gets all the Student and lecturer and sends it to the front-end
app.get('/getPeople', function(request, response) {
    const js = fs.readFileSync(fileName, { root: __dirname });
    response.send(js);
})

//Gets all the Courses and  sends to the front end
app.get('/sendCourse', function(request, response) {
    const js = fs.readFileSync(courseFile, { root: __dirname });
    response.send(js);
})

//Terminates the sessions
app.get('/logout', (request, response) =>{
    message = ""
    request.session.destroy((err) => {
        if(err) throw err;
        console.log("User logged out")
        response.redirect('/'); // redirect to the home page
    })
});


//Adds the user to the Person.json
app.post("/person", jsonParser, (request, response) => {
    try{
        data.forEach(element => {
        // the data isscreened before been added to the json file
            if((element.id == request.body.id )|| (element.email == request.body.email)){
                return response.json({
                    statusCode: 400,
                    method: request.method,
                    message: "This user already exists"
                });
            }
            
        });
        
        // If the data does not exist it is been added into the json file
        console.log("Received User")
        data.push(request.body);
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
        return response.json({
            statusCode: 200,
            method: request.method,
            message: "User Inserted Successfully"
        });
    }
    catch(err){
        console.log("There was an error while inserting the user")
    }
});

//Adds the course to the Courses.json
app.post("/course", jsonParser, (request, response) => {
    try{
        //dataCourse is the Courses file
        dataCourse.forEach(element => {
        // the data is screened before been added to the json file
            if((element.id == request.body.id) || (element.c_name == request.body.c_name)){
                console.log("This already exists")
                return response.json({
                    statusCode: 400,
                    method: request.method,
                    message: "This course already exists"
                });
            }
        });

        // If the data does not exist it is been added into the json file
        console.log("Received Course")
        dataCourse.push(request.body);
        fs.writeFileSync(courseFile, JSON.stringify(dataCourse, null, 2));
        return response.json({
            statusCode: 200,
            method: request.method,
            message: "Course Inserted Successfully"
        });
    }
    catch(err){
        console.log("There was an error while inserting the course")}
});


//Opens the port
app.listen(port, () => { console.log("Listening to server 3000") });