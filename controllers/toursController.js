const fs = require('fs');

//fetch data from file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next) => {
    // console.log(`tour id is ${val}`);
    // console.log("Mahadi");
    const id = req.params.id;
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        })
    }
    next();
}

exports.checkInputDatas = (req, res, next) => {
    let data = req.body.name;
    console.log("Mahadi");
    console.log(data);
    if (data.length === 0) {
        return res.status(404).json({
            status: 'fail',
            message: `You can't provide empty data`
        })
    }
    next();
}

exports.checkInputName = (req, res, next) => {
    console.log(req.body);
    let name = req.body.name;
    if (!name) {
        return res.status(404).json({
            status: 'fail',
            message: `You can't provide empty name`
        })
    }
    next();
}

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedTime: req.requestedTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.getTour = (req, res) => {

    const id = req.params.id * 1;

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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {

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

exports.deleteTour = (req, res) => {



    res.status(204).json({
        status: 'success',
        data: null
    })
}