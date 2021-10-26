const genHealthSchema = require("../../models/genHealth.model");



const getSugarData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Sugar",
      inputDate: { $gte: fromDate },
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;
        //  console.log(health_data);
        health_data.forEach((cdata) => {
          chart_data.push(parseInt(cdata.info));
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};

const getWeightData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Weight",
      inputDate: { $gte: fromDate },
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;
        //  console.log(health_data);
        health_data.forEach((cdata) => {
          chart_data.push(parseInt(cdata.info));
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};

const getBpSysData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Bp",
      inputDate: { $gte: fromDate },
      bpType: "systolic",
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;

        health_data.forEach((cdata) => {
          chart_data.push(cdata.info);
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};
const getBpDiasData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Bp",
      inputDate: { $gte: fromDate },
      bpType: "diastolic",
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;

        health_data.forEach((cdata) => {
          chart_data.push(cdata.info);
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};

const getPulseData = async (req, res) => {
  let user = req.user.id;
  let health_data = [];
  let chart_data = [];
  let chart_date = [];
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - 7);

  genHealthSchema.find(
    {
      user: user,
      infoTitle: "Pulse",
      inputDate: { $gte: fromDate },
    },
    (err, data) => {
      if (err) {
        console.log(user);
        console.log("Chart Data :" + err);
      }
      if (data) {
        health_data = data;
        // console.log(health_data);
        health_data.forEach((cdata) => {
          chart_data.push(parseInt(cdata.info));
          chart_date.push(cdata.inputDate.toISOString().slice(0, 10));
        });

        // console.log(chart_date)
        // console.log(chart_data)

        res.send({ infoData: chart_data, dates: chart_date });
      }
    }
  );
};
const getHistory = async (req, res) => {
  let user = req.user.id;
  const dates = req.headers["dates"];
  const infolist = [];
  genHealthSchema.find({ user }, (err, dataList) => {
    if (err) {
      console.log("Health info get :" + err);
    }
    if (dataList) {
      dataList.forEach((data) => {
        const dbDate = data.inputDate.toISOString().slice(0, 10);
        if (dates == dbDate) {
          infolist.push(data);
        }
      });
      console.log(infolist[0]);
      res.send(infolist);
    }
  });
};


module.exports = {
  
  getSugarData,
  getWeightData,
  getBpSysData,
  getBpDiasData,
  getPulseData,
  getHistory,
 
};
