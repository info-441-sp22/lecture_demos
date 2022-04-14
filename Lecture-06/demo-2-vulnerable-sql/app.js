import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import apiRouter from './routes/api.js'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// import sqlite database
import sqlite3 from 'sqlite3'
const sqlite3v = sqlite3.verbose()

//initialize db
let db = new sqlite3v.Database(':memory:', (err) => {
    if(err){
        return console.error(err.message)
    }
    console.log("Connected to the in memory sqlite")
})

//initialize the tables and data
db.serialize(() => {
    db.run("CREATE TABLE people(first_name text, last_name text)")
    .run(`INSERT INTO people(first_name, last_name)
          VALUES ("Kyle", "Thayer"),
                 ("Kyle", "Chandler"),
                 ("Jaimie", "Jin"),
                 ("Bryan", "Phan")
    `)

    db.run("CREATE TABLE secret_table(message text)")
    .run(`INSERT INTO secret_table(message)
          VALUES('The password for Kyle is: Pa55w0rd'),
                ('The treasure is hidden on the 5th floor')`)
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    //add the db variable to the request
    req.db = db;
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

export default app;
