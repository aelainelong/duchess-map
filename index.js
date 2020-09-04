const path = require("path");
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
const PORT = process.env.PORT || 4000;

// Add middlewares
app.use(express.static(path.join(__dirname, "/client", "build")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch(err => console.log('Unable to connect to the mongodb instance. Error: ', err));
mongoose.connection
    .once('open', () => console.log("Successfully connected to the database."))
    .on('error', err => console.log("Error connecting to the database:", err));

// Hook up the routers for our CRUD methods (do not move this higher up)
app.use('/api/markers', markerRouter);

// Start the express server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));



