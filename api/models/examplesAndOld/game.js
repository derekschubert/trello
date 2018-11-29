import mongoose from 'mongoose';

let gameSchema = new mongoose.Schema({
    appid: String,
    name: String,
    img_logo_url: String,
    img_icon_url: String
});

module.exports = mongoose.model('Game', gameSchema);