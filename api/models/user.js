import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  username: String,
  email: String,
  boards: [Number],
  teams: [Number],
});

module.exports = mongoose.model('User', userSchema);
