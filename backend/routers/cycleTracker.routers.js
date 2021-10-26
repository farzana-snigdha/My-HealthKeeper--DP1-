const express = require("express");
const router = express.Router();
const cycleTrackerCtrl = require("../controllers/menstrualCycle.controllers/cycleTrackerControllers");
const notesCycleTrackerControllers=require('../controllers/menstrualCycle.controllers/notes.cycleTracker.controllers')
const auth = require("../middleware/auth");

router.post("/setup-initial-data", auth, cycleTrackerCtrl.setupInitialData);
router.post("/cycleTracker-notes", auth, notesCycleTrackerControllers.createNotes);
router.get("/cycleTracker-display-notes", auth, notesCycleTrackerControllers.displayNotes);
router.patch("/update-menstrual-data",auth,cycleTrackerCtrl.updateInitialData)
router.get("/is-initial-data-available",auth,cycleTrackerCtrl.isInitialDataAvailable)
router.get('/get_last_period_days_number',auth,cycleTrackerCtrl.getTotalDaysSincePeriod)
router.get('/last_cycle_length',auth,cycleTrackerCtrl.getCycleLength)

module.exports = router;
