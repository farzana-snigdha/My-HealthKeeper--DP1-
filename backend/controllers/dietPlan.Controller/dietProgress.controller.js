const DailyCalorie = require("../../models/dailyCalorie");

const getMonthlyDietData = async (req, res) => {
  let user = req.user.id;
  let selectedMonth = req.headers["months"];
  let selectedyear = req.headers["year"];
  let consumed_cal_data = [];
  let req_cal_data = [];
  let cal_date = [];
  let totalCal = 0;
  let burn_data=[]
  console.log("getMonthlyDietData ", selectedyear);

  DailyCalorie.find({ user }, (err, data) => {
    if (data) {
      for (let i = 0; i < data.length; i++) {
        let split_date = String(data[i]["date"]).split(" ");
        console.log(split_date);
        if (split_date[1] == selectedMonth && split_date[3] == selectedyear) {
          totalCal = totalCal + data[i]["consumedCalories"]-data[i]['burnedCalories'];
          consumed_cal_data.push(data[i]["consumedCalories"]);
          req_cal_data.push(data[i]["requiredCalories"]);
          cal_date.push(data[i]["date"].toISOString().slice(0, 10));
          burn_data.push(data[i]['burnedCalories'])
        }
      }
      console.log(
        "cons ",
        burn_data,
        "      req ",
        req_cal_data,
        "         date",
        cal_date,
        "       vv",
        totalCal
      );
      res.send({
        consume_cal: consumed_cal_data,
        req_cal: req_cal_data,
        cal_date: cal_date,
        totalCal: totalCal / 30,
        burn_data:burn_data,
      });
    }
  });
};

module.exports = getMonthlyDietData;
