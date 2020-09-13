const mongoose = require("mongoose");

// Map Marker Schema
const MarkerSchema = mongoose.Schema({
    type: { type: String },
    geometry: {
        type: { type: String },
        coordinates: Array
    },
    properties: {
        name: String,
        date: Date,
        year: Number,
        country: String,
        province: String,
        category: Array,
        locations: Array,
        organisations: Array,
        topics: Array,
        designers: Array,
        images: Array
    }
});

// Export the Map Marker model
let Marker = mongoose.model('Marker', MarkerSchema);
module.exports = Marker;