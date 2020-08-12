
const express = require('express');
const morgan = require('morgan');

//declare the app
const app = express();

//add json parsing middleware
app.use(express.json());
// app.use(morgan('dev'));
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

// serve static files
app.use(express.static(`${__dirname}/public`));

//middleware to show the request time
app.use((req, res, next) => {
    req.requestedTime = new Date().toISOString();
    next();
});


// routes
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;