const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const port = 3000;
//add json parsing middleware
app.use(express.json());
app.use(morgan('dev'));

//fetch data from file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

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

//functions
const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedTime: req.requestedTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req, res) => {
    const id = req.params.id * 1;
    //   if(id>tours.length){
    //     return res.status(404).json({
    //         status : 'fail',
    //         message : 'invalid ID'
    //     })
    //   }
    const tour = tours.find(function (element) {
        return (element.id === id);
    });
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Tour doesnt exist'
        })
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id * 1 + 1;
    console.log(newId);
    const newTour = Object.assign(
        { id: newId },
        req.body
    )
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
}

const updateTour = (req, res) => {
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        })
    }
    id = req.params.id * 1;
    const tour = tours.find(function (element) {
        return (element.id === id);
    });
    res.status(200).json({
        status: "Success",
        data: {
            tour: tour
        }
    })
}

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    console.log(id);
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(204).json({
        status: 'success',
        data: null
    })
}

// All routes
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not implemented yet"
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not implemented yet"
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not implemented yet"
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not implemented yet"
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not implemented yet"
    })
}

// All routes
// app.get('/api/v1/tours',getAllTours);
// app.get('/api/v1/tours/:id',getTour);
// app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

//Tour routes
const tourRouter = express.Router();
app.use('/api/v1/tours', tourRouter);

// const tourRouter = express.Router();
tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour);
tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

//User routes
const userRouter = express.Router();
app.use('/api/v1/users', userRouter)
userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser);
userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)
//server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})