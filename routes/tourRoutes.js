const express = require('express');
const fs = require('fs');

//fetch data from file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

const router = express.Router();

router
    .route('/')
    .get(getAllTours)
    .post(createTour);
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;    