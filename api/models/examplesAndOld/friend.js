import mongoose from 'mongoose';

let friendSchema = new mongoose.Schema({
    steamid: String,
    name: String
});

module.exports = mongoose.model('Friend', friendSchema);