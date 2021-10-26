"use strict";
const MultipleFile = require("../../models/specializedHealthInfo.model");

const saveSpecializedHealthInfo = async (req, res) => {
  try {
    // let user = req.headers["userid"];
    let { user, folder, description, noteDate } = req.body;
    let filesArray = [];
    await MultipleFile.find({ user, folder }).then((result) => {
      req.files.forEach((element) => {
        const file = {
          fileName: element.originalname,
          filePath: element.path,
          fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2),
        };
        filesArray.push(file);
      });
      // console.log("eccec ", result.length);
      const multipleFiles = new MultipleFile({
        user: user,
        folder: folder,
        description: description,
        noteDate: noteDate,
        files: filesArray,
        numberOfFiles: filesArray.length,
      });
      multipleFiles
        .save()
        .then(() => {
          res.json({ msg: "Files Uploaded Successfully" });
        })
        .catch((err) => {
          res.json({ msg: "This folder already exists" });
        });
    });
  } catch (error) {
    console.log("cqecd ", error.message);
    res.send(error.message);
  }
};

const updateSpecializedHealthInfo = async (req, res) => {
  let folder = req.params.folderId;
  let {  jj } = req.body;

  await MultipleFile.findOneAndUpdate(
    {_id:  folder },
    {
      description:jj,
     
    }
  )
    .then(() => {
      res.json({ msg: "Update Success!" });
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
};

const deleteFolder = async (req, res) => {
  let folder = req.params.folderId;
  console.log("folder", folder);
  await MultipleFile.findByIdAndDelete(folder)
    .then(() => {
      res.json({ msg: "Folder Successfully Deleted!" });
    })
    .catch((err) => {
      res.json({ msg: err.message });
    });
};

const getallSpecializedHealthInfo = async (req, res, next) => {
  try {

    let user = req.user.id;

    // console.log("user          ", user);
    const files = await MultipleFile.find({ user });
    // console.log("files", files);
    res.status(200).send(files);
  } catch (error) {
    res.send(error.message);
  }
};

const getFolderDataForModal = async (req, res) => {
  
    let folder = req.params.folderId;
    
    MultipleFile.find(
      {
        _id:folder
        
      },
      (err, ans) => {
        if (err) {
          // console.log(user);
          console.log("Test :" + err);
        }
        if (ans) {
          res.send(ans[0]);
          console.log(ans);
          console.log("done")
        }
      }
    );

 
};

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = {
  saveSpecializedHealthInfo,
  getallSpecializedHealthInfo,
  updateSpecializedHealthInfo,
  deleteFolder,
  getFolderDataForModal,
};
