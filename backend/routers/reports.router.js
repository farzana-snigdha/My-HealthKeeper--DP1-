const express = require("express");
const router = express.Router();
const { reports,prediction } = require("../controllers/reports.controller");
const { upload } = require("../utilities/filehelper");

router.get('/reports', prediction)
router.post('/reports_predict',upload.single("file"), reports)
module.exports = router;