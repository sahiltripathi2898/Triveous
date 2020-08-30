const mongoose = require('mongoose');
const uuid = require('uuid');

const BookmarkSchema = mongoose.Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return uuid.v1();
    },
  },
  Link: {
    type: String,
    unique: true,
  },
  Title: {
    type: String,
  },
  TimeCreated: { type: Number, default: Math.floor(Date.now() / 1000) },
  TimeUpdated: { type: Number, default: Math.floor(Date.now() / 1000) },
  Publisher: String,
  Tags: [
    {
      _id: {
        type: String,
        default: function genUUID() {
          return uuid.v1();
        },
      },
      Title: String,
      TimeCreated: { type: Number, default: Math.floor(Date.now() / 1000) },
      TimeUpdated: { type: Number, default: Math.floor(Date.now() / 1000) },
    },
  ],
});

module.exports = mongoose.model('bookmarkModel', BookmarkSchema);
