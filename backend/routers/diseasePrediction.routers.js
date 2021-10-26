const express = require("express");
const router = express.Router();
const predictDisease=require('../controllers/diseasePrediction/diseasePrediction.controllers')
router.get("/disease-prediction", predictDisease);


module.exports = router;
