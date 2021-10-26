const express = require("express");
const { upload } = require("../utilities/filehelper");
const router = express.Router();
const auth=require("../middleware/auth");
const {
  saveSpecializedHealthInfo,
  getallSpecializedHealthInfo,
  getFolderDataForModal,
  updateSpecializedHealthInfo,
 deleteFolder,
} = require("../controllers/SpHealth.controllers/specializedHealthInfo.controllers");

const {getallMediaFiles,deleteFiles, getFolderItems,updateMediaFiles} =require('../controllers/SpHealth.controllers/mediaFile.SpHealth.controllers')
router.post(
  "/save-specialized-health-info",
  upload.array("files"),
  saveSpecializedHealthInfo
);
router.get("/get-specializedHealthInfo",auth, getallSpecializedHealthInfo);
router.get("/getallMediaFiles", getallMediaFiles);
router.patch("/updateSpecializedHealthInfo/:folderId", updateSpecializedHealthInfo);
router.get("/getFolderItems", getFolderItems);
router.delete('/deleteFolder/:folderId',deleteFolder)
router.get('/getFolderDataForModal/:folderId',getFolderDataForModal)
router.put("/updateMediaFiles",  upload.array("files"),updateMediaFiles);
router.delete('/deleteFiles/:folder',deleteFiles)
module.exports = router;
