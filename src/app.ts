// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import morgan from "morgan";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const usersRoutes = require('./api/routes/users.ts');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));

// Routes which should handle requests
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        },
        req
    })
});

module.exports = app;
