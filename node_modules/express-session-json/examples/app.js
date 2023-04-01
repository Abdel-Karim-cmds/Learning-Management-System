#!/usr/bin/env node

//Needed for monit/upstart
process.chdir(__dirname);

var express = require('express'),
    JsonStore = require('../lib/express-session-json');

var app = module.exports = express();

app.configure(function(){    
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({ store: new JsonStore() }));
    app.use(app.router);
});

app.get('/', function(req, res) {
    res.send('HERE');
    res.end();
});

app.listen(3000);

