import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log("This is the first additional middleware I added!")
    next();
})

app.use(function(req, res, next) {
    console.log("Second middleware, where I save a value!")
    //modify request by adding a field to it
    req.testValue = 3;
    next();
})

app.use(function(req, res, next) {
    console.log(
        "third middle, where I see the value of req.testValue is " + 
        req.testValue)
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;
