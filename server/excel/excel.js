//all functions relating to creating and exporting to excel files

const xlsx = require("xlsx");
const Data = require("../models/Data");

function exportToExcel(fileName, data) {
  let file = xlsx.readFile(fileName);
  xlsx.utils.sheet_add_json(file.Sheets.Sheet1, [data], {
    origin: -1,
    skipHeader: 1,
  });
  xlsx.writeFile(file, fileName);
}

async function createFile(fileName) {
  const workBook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet([]);
  xlsx.utils.book_append_sheet(workBook, worksheet, "Sheet1");
  xlsx.writeFile(workBook, fileName);
}

async function exportToDataExcelFile() {
  let file = xlsx.readFile("./Data.xlsx");
  let lineNumber = 0;

  const allData = await Data.find();
  allData.forEach((pieceOfData) => {
    xlsx.utils.sheet_add_json(
      file.Sheets.Sheet1,
      [[pieceOfData.datapoint, ...pieceOfData.tags]],
      {
        skipHeader: 1,
        origin: lineNumber++,
      }
    );
    xlsx.writeFile(file, "./Data.xlsx");
  });
}

module.exports = { exportToExcel, createFile, exportToDataExcelFile };
