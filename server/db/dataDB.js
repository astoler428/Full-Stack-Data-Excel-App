const Data = require("../models/Data");

//create a new datapoint
async function create(datapoint) {
  await Data.create({ datapoint: datapoint });
}

//random datapoint without tags
async function findUntaggedDatapoint() {
  const randomDataPoint = await Data.aggregate([
    { $match: { tags: { $size: 0 } } },
    { $sample: { size: 1 } },
  ]);

  return randomDataPoint;
}

//any random datapoint
async function findRandomDatapoint() {
  const randomDataPoint = await Data.aggregate([{ $sample: { size: 1 } }]);
  return randomDataPoint;
}

//random datapoint with specific tag
async function findDatapointWithTag(tag) {
  const randomDataPoint = await Data.aggregate([
    { $match: { tags: tag } },
    { $sample: { size: 1 } },
  ]);
  return randomDataPoint;
}

module.exports = {
  create,
  findUntaggedDatapoint,
  findRandomDatapoint,
  findDatapointWithTag,
};
