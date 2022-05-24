import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import sessions from 'express-session';


// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
import stripeLib from 'stripe'
const stripe = stripeLib('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


import models from './models.js'
import indexRouter from './routes/index.js';
import itemsRouter from './routes/items.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) =>{
    req.models = models
    req.stripe = stripe
    next()
})


app.use('/', indexRouter);
app.use('/items', itemsRouter);

export default app;
