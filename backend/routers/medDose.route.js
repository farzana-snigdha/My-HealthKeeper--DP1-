const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth");

const { getDoses, doseConfirmUpdate,getMissedDoses } = require("../controllers/medicineReminder.controllers/medDose.controller");

router.get('/medDose',auth, getDoses);
router.post('/medDose/:id', doseConfirmUpdate);
router.get('/medDoseMissed/:id',auth, getMissedDoses);

module.exports=router;