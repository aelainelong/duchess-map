const mongoose = require("mongoose");

// User Schema
const UserSchema = mongoose.Schema({
    username: String,
    password: String
});

// Export the User model
let User = mongoose.model('User', UserSchema);
module.exports = User;