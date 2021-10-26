const express = require("express");
const router = express.Router();
const auth=require("../middleware/auth")

const {getOngoingMedicine,postMedicine,deleteMedicine,getCompleteMedicine} = require('../controllers/medicineReminder.controllers/medReminder.controller');

router.get('/CurrentMedReminder',auth, getOngoingMedicine);
router.get('/CompleteMedReminder',auth, getCompleteMedicine);
router.post('/medReminder',auth, postMedicine);
router.delete('/medReminder/delete/:id',auth, deleteMedicine);
module.exports=router;