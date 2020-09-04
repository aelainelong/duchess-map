const express = require("express");
const markerRouter = express.Router();

// Import our database schema model
let Marker = require('./../models/marker');

markerRouter
    // Create Marker - adds new marker to database
    .post('/', async (req, res, next) => {
        try {
            const marker = new Marker(req.body);
            const result = await marker.save();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    })
    // Get Markers - retrieves markers from database, with or without filters
    .get('/', async (req, res, next) => {
        try {
            const { year, type } = req.query;
            let queryConfig = {};

            // Filter by year
            if(year){
                queryConfig.year = year;
            }

            // Filter by type
            if(type){
                queryConfig.type = type;
            }

            //console.log(queryConfig);
            const results = await Marker.find(queryConfig).exec();

            res.send({
                "filters": req.query,
                "type": "FeatureCollection",
                "features": results
            });
        } catch (err) {
            res.status(500).send(err);
        } finally {
            next();
        }
    })
    // Retrieve Marker by ID - fetches a specific marker from database
    .get('/:id', async (req, res, next) => {
        try {
            const marker = await Marker.findById(req.params.id).exec();
            res.send(marker);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            next();
        }
    })
    // Update Marker - overwrites existing marker in database
    .put('/:id', async (req, res, next) => {
        try {
            const marker = await Marker.findById(req.params.id).exec();
            marker.set(req.body);
            const result = await marker.save();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            next();
        }
    })
    // Delete Marker - removes existing marker from database
    .delete('/:id', async (req, res, next) => {
        try {
            const result = await Marker.deleteOne({ _id: req.params.id }).exec();
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        } finally {
            next();
        }
    });

module.exports = markerRouter;
