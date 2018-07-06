const readlineSync = require("readline-sync");

const getCoords = require("./get-coords");
const getStops = require("./tfl-api/get-stops");

const express = require('express')
const app = express()

app.use(express.static('frontend'));

app.get('/departureBoards/:postcode', function(req, res) {
    let postcode = req.params.postcode;

    getCoords(postcode) //NW5 1TL
        .then(getStops)
        .then(stops => stops.splice(0,2))
        .then(stops => Promise.all(stops.map(stop=>stop.getArrivals())))
        .then(stops => res.send(stops))
        .catch(error => {
            console.log(error);
            res.status(500);
            res.send(error.message);
        });
})

app.listen(3000)