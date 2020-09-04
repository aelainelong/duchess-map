const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import our database schema models
let Tag = require('./models/tag');
let User = require('./models/user');

// Import our API routes
let markerRouter = require('./routes/markerRouter');

// Set up our express app
const app = express();
const port = 4000;

// Make sure request body is parsed into JSON format and server logs in dev mode
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Database
const dbURL = 'mongodb+srv://ael_mdb_admin:UETZtOX2KXEMgI41@cluster0.xrijk.mongodb.net/duchess_map_db?retryWrites=true&w=majority';

// Connect backend server to the database
mongoose
    .connect(dbURL, { 
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
app.listen(port, () => console.log(`Server listening on port ${port}`));



