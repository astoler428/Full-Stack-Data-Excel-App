const Tag = require("../models/Tag");

//create new tag
async function create(newTag) {
  await Tag.create({ name: newTag });
}

//Get all tags
async function getAllTags() {
  const allTags = await Tag.find();
  return allTags;
}

module.exports = {
  create,
  getAllTags,
};
