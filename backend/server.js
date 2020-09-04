const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

// Import our database schema models
let Tag = require('./models/tag');
let User = require('./models/user');

// Import our API routes
let markerRouter = require('./routes/markerRouter');

// Set up our express app
const app = express();
const PORT = process.env.PORT || 4000;

// Make sure request body is parsed into JSON format and server logs in dev mode
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect backend server to the database
mongoose
    .connect(process.env.DB_URI, { 
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .catch(function (reason) {
        console.log('Unable to connect to the mongodb instance. Error: ', reason);
    });
mongoose.connection
    .once('open', () => console.log("Successfully connected to the database."))
    .on('error', err => console.log("Error connecting to the database:", err));

// Hook up the routers for our CRUD methods (do not move this higher up)
app.use('/api/markers', markerRouter);

// Launch the backend server onto a port
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



