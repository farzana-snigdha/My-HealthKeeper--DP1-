const DietTargetModel = require("../../models/diet.targetModel");
const saveTargetInfo = async (req, res) => {
  let { height, weight, age, gender, levelOfActivity, target, user } = req.body;
  const dailyRequiredCalories = calculateCalorieNeed(
    height,
    weight,
    age,
    gender,
    levelOfActivity,
    target
  );
  console.log("dailyRequiredCalories ", dailyRequiredCalories);
  const info = new DietTargetModel({
    height: height,
    weight: weight,
    age: age,
    gender: gender,
    levelOfActivity: levelOfActivity,
    target: target,
    user: user,
    dailyRequiredCalories: dailyRequiredCalories,
  });
  info
    .save()
    .then(() => {
      res.json({ msg: "information for diet Uploaded Successfully" });
    })
    .catch((err) => {
      console.log("DietTargetModel ", err);
      res.send(err);
    });
};

const calculateCalorieNeed = (
  height,
  weight,
  age,
  gender,
  levelOfActivity,
  target
) => {
  weightInLbs = weight * 2.20462;
  let requiredCalories = 0;
  const BMR = calculateBMR(height, weightInLbs, age, gender);
  const BMRactivity = calculateBMRwithActivity(BMR, levelOfActivity);
  if (target == "gain") {
    requiredCalories = BMRactivity + 500;
  }
  if (target == "same") {
    requiredCalories = BMRactivity;
  }
  if (target == "loss") {
    requiredCalories = BMRactivity - 500;
  }

  return Math.round(requiredCalories);
};

const calculateBMRwithActivity = (BMR, levelOfActivity) => {
  let requiredCalories = 0;
  if (levelOfActivity == "sedentary") {
    requiredCalories = BMR * 1.2;
  } else if (levelOfActivity == "lightly active") {
    requiredCalories = BMR * 1.375;
  } else if (levelOfActivity == "moderately active") {
    requiredCalories = BMR * 1.55;
  } else if (levelOfActivity == "very active") {
    requiredCalories = BMR * 1.725;
  } else if (levelOfActivity == "extra active") {
    requiredCalories = BMR * 1.9;
  }
  return requiredCalories;
};
const calculateBMR = (height, weightInLbs, age, gender) => {
  let BMR = 0;
  if (gender == "Male") {
    BMR = 66 + 6.3 * weightInLbs + 12.9 * height - 6.8 * age;
  }
  if (gender == "Female") {
    BMR = 655 + 4.3 * weightInLbs + 4.7 * height - 4.7 * age;
  }
  return BMR;
};
module.exports = saveTargetInfo;
