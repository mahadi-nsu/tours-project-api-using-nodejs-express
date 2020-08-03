const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
var path = require('path');


const app = express();
const port = 3000;

//add json parsing middleware
app.use(express.json());
app.use(morgan('dev'));


//adding custom middleware
app.use((req, res, next) => {
    console.log("hello from middleware");
    // req.requestTime
    next();
});

//middleware to show the request time
app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    next();
});


//Tour routes
// const tourRouter = express.Router();
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})