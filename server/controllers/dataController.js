const { exportToExcel, exportToDataExcelFile } = require("../excel/excel.js");
const Data = require("../models/Data");
const dataDB = require("../db/dataDB");

//controller that gets called when data is added

async function addData(req, res) {
  //get the data from the body

  let { link, date, data1, data2, data3, data4 } = req.body;

  //export certain data values into a row in these two excel files

  exportToExcel("./Source.xlsx", { link, date });
  exportToExcel("./Context.xlsx", { link, data1, data2, data3, data4 });

  let dataPoints = [data1, data2, data3, data4];
  let nonEmptyDataPoints = dataPoints.filter((dataPoint) => dataPoint !== "");

  //add datapoint to Data Database

  nonEmptyDataPoints.forEach((datapoint) => dataDB.create(datapoint));

  //excel file gets written over every time by writing the data database into it
  exportToDataExcelFile();
}

//controller that gets a random datapoint from the database based on a potential tag filter

async function getRandomData(req, res) {
  const tag = req.query.tag;
  let randomDataPoint;

  //if empty tag, only use datapoints with no tags (tag array is empty)

  if (tag === "") randomDataPoint = await dataDB.findUntaggedDatapoint();
  else if (tag === "RANDOM DATA")
    randomDataPoint = await dataDB.findRandomDatapoint();
  else randomDataPoint = await dataDB.findDatapointWithTag(tag);

  //comes back as an array, so take the first element
  randomDataPoint = randomDataPoint[0];
  if (!randomDataPoint) {
    res.status(404).json({ message: "No datapoint found with that tag" });
    return;
  }
  res.json(randomDataPoint);
}

module.exports = { addData, getRandomData };
