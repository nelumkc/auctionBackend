const mongoose = require("mongoose");
const bidSchema = require('./bid');

// Create a Schema object
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  url: { type: String, required: true },
  bids: [bidSchema],
});

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;