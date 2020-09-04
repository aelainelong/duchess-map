const mongoose = require("mongoose");

// Map Marker Tag Schema
const TagSchema = mongoose.Schema({
    type: { type: String },
    name: String
});

// Export the Tag model
let Tag = mongoose.model('Tag', TagSchema);
module.exports = Tag;