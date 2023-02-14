const e = require("express");
var express = require("express");
var router = express.Router();;
const fileName = "People.json"
const fs = require('fs')


// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);
let len = data.length;
globalThis.uName;
globalThis.userT;

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

//login user
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        // res.redirect('/dashboard');
        res.redirect('/dashboard')
    } else {
        for (let i = 0; i < len; i++) {
            if ((req.body.email == data[i].id) && (req.body.password == data[i].Password)) {
                uName = data[i].name;
                userT = data[i].Type;
                let newUser = { uId: id, uPwd: password, uType: userT }
                request.session.user = newUser;
                console.log(userT)

                // console.log(data[i].Type)
                response.redirect('/student')
            }
        }
    }
});

module.exports = router;