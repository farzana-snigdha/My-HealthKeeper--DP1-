const MultipleFile = require("../../models/specializedHealthInfo.model");

const getallMediaFiles = async (req, res) => {
  try {
    const folderID = req.headers["folderid"];

    const files = await MultipleFile.findOne({ folderID });
    res.status(200).send(files.files);
  } catch (error) {
    res.send(error.message);
  }
};

const deleteFiles = async (req, res) => {
  const filePaths = req.headers["filepath"];
  let folder = req.params.folder;
  console.log("folder", filePaths);
  MultipleFile.updateOne(
    { folder: folder },
    { $pull: { files: { filePath: filePaths } } }
  )
    .then((qq) => console.log("ko ", qq))
    .catch((err) => {
      console.log(err);
    });
};
const updateMediaFiles = async (req, res) => {
  const folder = req.headers["folder"];
  console.log("folderID: ", folder);
  let filesArray = [];
  await MultipleFile.findOne({ folder: folder }).then((filedata) => {
    //console.log('filedata',filedata)
    if (filedata.files.length != 0) {
      for (let i = 0; i < filedata.files.length; i++) {
        filesArray.push(filedata.files[i]);
      }
    } else {
      filesArray = [];
    }
  });

  req.files.forEach((element) => {
    const file = {
      fileName: element.originalname,
      filePath: element.path,
      fileType: element.mimetype,
      // fileSize: fileSizeFormatter(element.size, 2),
    };
    filesArray.push(file);
  });
  //console.log(filesArray);
  await MultipleFile.findOneAndUpdate(
    { folder },

    { $set: { files: filesArray, numberOfFiles: filesArray.length } },

    { returnNewDocument: true },

    function (err, result) {
      if (err) {
        console.log("mediaFiles", err);
      }
      if (result) {
        console.log("success ", result);
        res.status(200).send(result.files);
      }
    }
  );
};

const getFolderItems = async (req, res) => {
  try {
    const folderID = req.headers["folderid"];
    // console.log("folderID: ", folderID);
    const files = await MultipleFile.findById(folderID, function (err, ans) {
      if (err) {
        console.log("getallMediaFiles>err: ", "no files found");
        res.send("no files found");
      }
      if (ans) {
        //  console.log("getallMediaFiles>ans: ", ans.files);
        res.status(200).send(ans.files);
      }
    });
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  getallMediaFiles,
  deleteFiles,
  updateMediaFiles,
  getFolderItems,
};
