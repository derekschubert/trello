import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  steamid: String,
  games: [{ appid: String, playtime_forever: Number }],
  friends: [{ steamid: String, friend_since: Number }],
});

module.exports = mongoose.model('User', userSchema);

// User (steamid)
// - games
//     - game
//         - appid
//         - name
//         - playtime_forever
//         - img_logo_url
//         - img_icon_url
// - friends
//     - friend
//         - steamid
//         - relationship
//         - friend_since
