import mongoose from 'mongoose';

let catSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Cat', catSchema);