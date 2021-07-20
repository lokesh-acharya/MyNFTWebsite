import express from 'express';
import { isAuth } from '../utils.js';
import Config from '../config';
import dotenv, { config } from 'dotenv';

dotenv.config();
const downloadRouter = express.Router();

// downloadRouter.get('/:userId/:fileName', isAuth, function(req, res) { 
//   // const path = `uploads/${req.params.userId}/${req.params.fileName}`;
//   const path = `uploads/${req.params.fileName}`;
//   try {
//     res.download(path, function (err) {
//       console.log(err);
//     });
//   } catch (err) {
//     res.send(err);
//     console.log(err);
//   }
// });

downloadRouter.get('/:userId/:fileName', isAuth, function(req, res, next){
  // download the file via aws s3 here
  var fileKey = req.params.fileName;
  
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3({
    credentials: {
        secretAccessKey: Config.SECRET,
        accessKeyId: Config.ID,
        region: "ap-south-1",
    },
  });

  const params = {
    Bucket: Config.BUCKET_NAME,
    Key: fileKey,
  };

  res.attachment(fileKey);
  var fileStream = s3.getObject(params).createReadStream();
  fileStream.pipe(res);
});

export default downloadRouter;