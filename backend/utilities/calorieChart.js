const fs = require("fs");
const fastcsv = require("fast-csv");
const calorieModel = require("../models/caloriesChart.models");

const saveCalorieToDB = () => {
  let stream = fs.createReadStream("../backend/utilities/calories.csv");
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push({
        category: data[0], 
        name: data[1],
        qty: 1,
        calories: data[2],
      });
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      // console.log(csvData);
      for (let i = 0; i < csvData.length; i++) {
        // console.log(csvData[i]["name"]);
        calorieModel.findOne({ name: csvData[i]["name"] }).then((ans) => {
          if (!ans) {
            calorieModel.create(csvData[i], (err, res) => {
              if (err) throw err;
            });
          }
        });
      }
    });

  stream.pipe(csvStream);
};

module.exports = saveCalorieToDB;
