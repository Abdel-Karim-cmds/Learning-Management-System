#!/usr/bin/env node

//Needed for monit/upstart
process.chdir(__dirname);

var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    JsonStore = require('../lib/express-session-json')(session);

var app = module.exports = express();

app.use(cookieParser('your secret here'));
app.use(session({
    secret: 'your secret here' ,
    resave: false,
    saveUninitialized: false,
    store: new JsonStore()
}));

app.get('/', function(req, res) {
    res.send('HERE');
    res.end();
});

app.listen(3000);

