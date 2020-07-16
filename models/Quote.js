const mongoose = require("mongoose") 

// Schema
const Schema = mongoose.Schema;
const QuoteSchema = new Schema({
  title: String,
  Author: String,
  quote: String,
  date: {
    type: String,
    default: Date.now(),
  },
});

// Model
const Quote = mongoose.model("Quote", QuoteSchema);

module.exports =  Quote;