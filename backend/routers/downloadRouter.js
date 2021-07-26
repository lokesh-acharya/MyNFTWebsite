import express from 'express';
import { isAuth } from '../utils.js';
import Config from '../config.js';
import dotenv from 'dotenv';

dotenv.config();
const downloadRouter = express.Router();

function Download(fileKey) {
  const AWS = require('aws-sdk');
  const s3 = new AWS.S3({
    credentials: {
      secretAccessKey: Config.SECRET,
      accessKeyId: Config.ID,
      region: Config.REGION,
    },
  });

  const params = {
    Bucket: Config.BUCKET_NAME,
    Key: fileKey,
  };
  return s3.getObject(params).createReadStream();
}

downloadRouter.get('/:userId/:fileName', isAuth, function(req, res, next){
  // download the file via aws s3 here
  var fileKey = req.params.fileName;
  res.attachment(fileKey);
  var fileStream = Download(fileKey);
  fileStream.pipe(res);
});

export default downloadRouter;