const mongoose = require("mongoose");
// Create a Schema object
const Schema = mongoose.Schema;

const bidSchema = new Schema({
  biddername: { type: String, required: true },
  bidamount: { type: Number, required: true },
});

//const bids = mongoose.model('300365641_Chandramini', bidSchema);
module.exports = bidSchema;
