const medReminder = require("../../models/medReminder.model");
const medConfirmation = require("../../models/medicineConfirmation.model");
const moment = require("moment");

//const doseId = null;

const getOngoingMedicine = async (req, res) => {
  let user = req.user.id;
const todayDate=new Date()
todayDate.setDate(todayDate.getDate()-1)
  medReminder.find({ user,enddate:{$gte:todayDate} }, (err, reminderList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (reminderList) {
     
      res.send(reminderList);
     
    }
  });
};

const getCompleteMedicine = async (req, res) => {
  let user = req.user.id;
const todayDate=new Date()
todayDate.setDate(todayDate.getDate()-1)
console.log('today ',todayDate)
  medReminder.find({ user,enddate:{$lt:todayDate} }, (err, reminderList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (reminderList) {
     
      res.send(reminderList);
     
    }
  });
};

const postMedicine = async (req, res) => {
  let user = req.user.id;

  const {
    username,
    medname,
    descriptionmed,
    startdate,
    enddate,
    doses,
    userEmail,
  } = req.body;

  const med = new medReminder({
    user,
    username: username,
    medname: medname,
    descriptionmed: descriptionmed,
    startdate: startdate,
    enddate: enddate,
    time: doses,
  });
  med
    .save()
    .then((data) => {
      res.json(data);
      const doseId = data._id;
     
      const date1 = new Date(startdate);
      const date2 = new Date(enddate);
      const days = Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
      const frequency = doses.length;

      for (var i = 0; i <= days; i++) {
        for (var j = 0; j < frequency; j++) {
          const incrementDate = new Date(moment(date1).add(i, "days"));
          const medDose = new medConfirmation({
            user,
            doseId: doseId,
            medname: medname,
            meddate: incrementDate,
            medtime: doses[j].time,
            isTaken: "false",
            userEmail: userEmail,
          });
          medDose
            .save()
            .then((data) => {
              //res.json(data);
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    })
    .catch((error) => {
      res.json(error);
    });

};

const deleteMedicine = async (req, res) => {
  let user = req.user.id;
  medReminder.find({ user }, (err, reminderList) => {
    if (err) {
      console.log(user);
      console.log("Test :" + err);
    }
    if (reminderList) {
      medReminder
        .findByIdAndDelete(req.params.id)
        .then(() => {
          console.log("Medicine deleted.");
          medConfirmation
            .deleteMany({doseId : req.params.id})
            .then(() =>
              res
                .json("Reminders deleted."))
                .catch((err) => res.status(400).json("reminder delete Error: " + err));
        })
        .catch((err) => res.status(400).json("Med delete Error: " + err));
    }
  });
};

module.exports = {  getOngoingMedicine, postMedicine, deleteMedicine,getCompleteMedicine };