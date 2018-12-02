import mongoose from 'mongoose';
import nanoid from 'nanoid';

const Team = new mongoose.Schema({
  id: String,
  name: String,
  members: [String],
});

const List = new mongoose.Schema({
  shortid: {
    type: String,
    default: () => nanoid(8),
  },
  color: {
    type: String,
    default: () => '#dfe3e6',
  },
  name: String,
  cardOrder: [String],
});

const Card = new mongoose.Schema({
  shortid: {
    type: String,
    default: () => nanoid(8),
  },
  name: String,
  description: String,
});

const boardSchema = new mongoose.Schema({
  shortid: {
    type: String,
    default: () => nanoid(8),
  },
  name: String,
  color: String,
  owner: String,
  visibility: String,
  team: Team,
  admins: [String],
  moderators: [String],
  members: [String],
  lists: [List],
  cards: [Card],
  listOrder: [String],
});

module.exports = mongoose.model('Board', boardSchema);
