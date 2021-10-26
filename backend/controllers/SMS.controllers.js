const { spawn } = require("child_process");

const sendSMS = (phone, msg) => {
  const pyProg = spawn("python", ["../backend/utilities/SMS.api.py", phone, msg]);

  pyProg.stdout.on("data", function (data) {
    console.log(data.toString());
  });

  pyProg.stderr.on("data", function (data) {
    console.error(data.toString());
  });

  pyProg.on("close", function (code) {
    console.log(code);
  });
};
module.exports = sendSMS ;
