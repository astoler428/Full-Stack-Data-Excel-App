const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//data has a datapoint and an array of tags

const dataSchema = new Schema({
  datapoint: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    default: [String],
  },
});

//third parameter is collection name
module.exports = mongoose.model("Data", dataSchema, "data");

//idea - include a date created, so I can sort and submit to data excel file
