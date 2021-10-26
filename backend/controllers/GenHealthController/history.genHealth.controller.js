const genHealthSchema = require("../../models/genHealth.model");

const getMonthlyHistory = async (req, res) => {
    let user = req.user.id;
    const year = req.headers["year"];
    const months = req.headers["months"];
    console.log(year, "   ", months);
  const info=[]
    const weightList = [];
    const sysList = [];
    const diasList = [];
    const sugarList = [];
    const pulseList = [];
    const yy=[]
    await genHealthSchema
      .find({ user })
      .then((ans) => {
        ans.forEach((hist) => {
          const histDate = hist["inputDate"].toISOString().slice(0, 10);
          const datess = histDate.split("-");
          // console.log(datess)
          if (year == datess[0] && months == datess[1]) {
            // console.log(hist)
            yy.push(hist["inputDate"].toISOString().slice(0, 10));
            if (hist["infoTitle"] == "Pulse") {
              // console.log(hist["info"]);
              pulseList.push(hist["info"]);
            }
            if (hist["infoTitle"] == "Weight") {
              // console.log(hist["info"]);
              weightList.push(hist["info"]);
            }
            if (hist["infoTitle"] == "Sugar") {
              // console.log(hist["info"]);
              sugarList.push(hist["info"]);
            }
            if (hist["infoTitle"] == "Bp") {
              if (hist["bpType"] == "systolic") {
                sysList.push(hist["info"]);
              }
              if (hist["bpType"] == "diastolic") {
                diasList.push(hist["info"]);
              }
            }
          }
          // console.log(histDate)
        });
        const eachDate = [...new Set(yy)];

        console.log(
          sugarList
                );
        res.send({
          date: eachDate,
          sugar: sugarList,
          weight: weightList,
          pulse: pulseList,
          sys: sysList,
          dias: diasList,
          info:info
        });
        
      })
      .catch((err) => {
        console.log(err);
      });
    // await genHealthSchema.find({ user }, (err, dataList) => {
    //   if (err) {
    //     console.log("Health info get :" + err);
    //   }
    //   if (dataList) {
    //     dataList.forEach((data) => {
    //       console.log(data)
  
    //       // .toISOString().slice(0,10)
    //       // const dbYear = data.inputDate.toString().slice(0, 10);
    //       // console.log(dbYear)
    //       // const dbMonth = data.inputDate.getMonth().toString().slice(0, 10);
    //       // console.log(dbMonth)
  
    //       // if (year == dbYear && months ==dbMonth ) {
    //       //   infolist.push(data);
    //       // }
  
    //     });
    //     console.log(infolist[0]);
    //     res.send(infolist);
    //   }
    // });
  };

module.exports={ getMonthlyHistory}