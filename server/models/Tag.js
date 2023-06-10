const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Tag model just has a tag name

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
