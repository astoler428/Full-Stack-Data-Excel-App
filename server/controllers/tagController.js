const { exportToDataExcelFile } = require("../excel/excel.js");
const Data = require("../models/Data");
const Tag = require("../models/Tag");
const tagDB = require("../db/tagDB");

//recentTag stores the last used tag
let recentTag;

async function getAllTags(req, res) {
  const allTags = await tagDB.getAllTags();
  res.json(allTags);
}

async function updateTag(req, res) {
  //get the id of the datapoint and a list of the new tags
  const { _id, newTags } = req.body;

  //find the datapoint in the database
  const dataPoint = await Data.findOne({ _id: _id });

  //only add new tags to datapoint if not there
  newTags.forEach(async (newTag) => {
    if (!dataPoint.tags.includes(newTag)) dataPoint.tags.push(newTag);

    //only add tag to tagDB if not there
    const existingTag = await Tag.findOne({ name: newTag });
    if (!existingTag) await tagDB.create(newTag);
  });

  await dataPoint.save();
  exportToDataExcelFile();
  res.json({});
}

//controller that handles the update request of the recent tag

async function updateRecentTag(req, res) {
  recentTag = req.body.tag;
  res.json({});
}

//controller that returns the most recently used tag so it can be the default in the dropdown

async function getRecentTag(req, res) {
  res.json(recentTag || "");
}

module.exports = {
  getAllTags,
  updateTag,
  updateRecentTag,
  getRecentTag,
};
