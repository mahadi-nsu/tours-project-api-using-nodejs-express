const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

//fetch data from file
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// GET req
app.get('/api/v1/tours', (req, res) => {
    // res.status(200).send("backend is working");
    // console.log(tours);
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
})

app.get('/api/v1/tours/:id', (req, res) => {
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
})

//add json parsing middleware
app.use(express.json());
//setroute
// POST req
app.post('/api/v1/tours', (req, res) => {
    //  create new id for new tour
    const newId = tours[tours.length - 1].id * 1 + 1;
    console.log(newId);
    //  create new object and assign id and request body to the object
    const newTour = Object.assign(
        { id: newId },
        req.body
    )
    console.log(newTour);
    //  push object to tours
    tours.push(newTour);
    // console.log(tours);
    //  write into the file
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })
    //  send response 
})
//take request body

///PATCH 
app.patch('/api/v1/tours/:id', (req, res) =>{
    if (id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        })
    } 
    id = req.params.id *1;
    const tour = tours.find(function (element) {
        return (element.id === id);
    });
    res.status(200).json({
        status: "Success",
        data: {
            tour: tour
        }
    })

});
// delete
app.delete('/api/v1/tours/:id',(req,res)=>{
    const id = req.params.id*1;
    console.log(id);
    if(id>tours.length){
        return res.status(404).json({
            status : 'fail',
            message : 'Invalid ID'
        })
    }

    res.status(204).json({
        status : 'success',
        data : null
    })
})

//server
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})