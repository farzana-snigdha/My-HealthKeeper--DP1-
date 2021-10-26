const genHealthSchema = require("../../models/genHealth.model");

const postHealthInfo = async (req, res) => {
  let user = req.user.id;

  const { infoTitle, info } = req.body;
  //console.log(new Date().toISOString().slice(0, 10))

  if (infoTitle === "Bp") {
    let bp_split = info.split("/");
    genHealthSchema
      .findOne({
        user: user,
        infoTitle: infoTitle,
        inputDate: new Date().toISOString().slice(0, 10),
      })
      .then((health) => {
        if (health) {
          genHealthSchema
            .findOneAndUpdate(
              {
                user: user,
                infoTitle: infoTitle,
                inputDate: new Date().toISOString().slice(0, 10),
                bpType: "systolic",
              },
              { info: bp_split[0] }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
          genHealthSchema
            .findOneAndUpdate(
              {
                user: user,
                infoTitle: infoTitle,
                inputDate: new Date().toISOString().slice(0, 10),
                bpType: "diastolic",
              },
              { info: bp_split[1] }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          const sysInfo = new genHealthSchema({
            user,
            infoTitle: infoTitle,
            bpType: "systolic",
            info: bp_split[0],
            inputDate: new Date().toISOString().slice(0, 10),
          });
          sysInfo
            .save()
            .then((data) => res.json(data))
            .catch((err) => res.json(err));

          const diasInfo = new genHealthSchema({
            user,
            infoTitle: infoTitle,
            bpType: "diastolic",
            info: bp_split[1],
            inputDate: new Date().toISOString().slice(0, 10),
          });
          diasInfo
            .save()
            .then((data) => {
              console.log("ddqdwssdx");
              res.json(data);
            })
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  } else {
    genHealthSchema
      .findOne({
        user: user,
        infoTitle: infoTitle,
        inputDate: new Date().toISOString().slice(0, 10),
      })
      .then((health) => {
        if (health) {
          genHealthSchema
            .findOneAndUpdate(
              {
                user: user,
                infoTitle: infoTitle,
                inputDate: new Date().toISOString().slice(0, 10),
              },
              { info }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          const healthInfo = new genHealthSchema({
            user,
            infoTitle: infoTitle,
            info: info,
            inputDate: new Date().toISOString().slice(0, 10),
          });
          healthInfo
            .save()
            .then((data) => {
              console.log("asedqkwisjiw");
              res.json(data);
            })
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  }
};

module.exports={postHealthInfo}