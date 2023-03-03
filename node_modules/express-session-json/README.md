# Express-session-json [![NPM version](https://badge.fury.io/js/express-session-json.png)](http://badge.fury.io/js/express-session-json) [![Build Status](https://travis-ci.org/darul75/express-session-json.png?branch=master)](https://travis-ci.org/darul75/express-session-json) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/express-session-json/counters/views.png)](https://sourcegraph.com/github.com/darul75/express-session-json)

Simple JSON file session store for Express (Connect I guess)

## Why ?

Because we may need it for simple cases.

## Install

~~~
npm install express-session-json
~~~

## Usage

Due to express >= 4 changes, we now need to pass express-session to the function express-session-json exports in order to extend session.Store:

Example for express < 4:

```javascript
var express = require('express'),
    JsonStore = require('express-session-json')(express.session);

var app = module.exports = express();

app.configure(function(){    
    app.use(express.cookieParser('your secret here'));
    app.use(express.session({ store: new JsonStore() }));
    ...
});

```

Example for express >= 4:

```javascript
var express = require('express'),
    cookieParser = require('cookie-parser'),
    session = require('express-session') ,
    JsonStore = require('express-session-json')(session);

var app = module.exports = express();

app.use(cookieParser('your secret here'));
app.use(session({
    secret: 'your secret here' ,
    resave: false,
    saveUninitialized: false,
    store: new JsonStore()
});

...

```


## Options

- **filename** : filename, default 'express-sessions.json'
- **path** : directory where to save, default 'node_modules/express-session-json/'

## Metrics

[![NPM](https://nodei.co/npm/express-session-json.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/express-session-json/)

## License

The MIT License (MIT)

Copyright (c) 2013 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
