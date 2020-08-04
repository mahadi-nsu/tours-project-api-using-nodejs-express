
const express = require('express');
const morgan = require('morgan');

//declare the app
const app = express();

//add json parsing middleware
app.use(express.json());
app.use(morgan('dev'));

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

module.exports = app;