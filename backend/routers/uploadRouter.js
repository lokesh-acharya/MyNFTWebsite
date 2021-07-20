// import multer from 'multer';
import express from 'express';
import path from 'path';
// import fs from 'fs';
import { isAuth } from '../utils.js';
import Config from '../config';
import dotenv, { config } from 'dotenv';

dotenv.config();
const uploadRouter = express.Router();

// uploadRouter.post('/:userId/:random', isAuth, (req, res) => {  
//   const AWS = require('aws-sdk');  
//   const s3 = new AWS.S3({
//     accessKeyId: config.ID,
//     secretAccessKey: config.SECRET
//   });
  
//   // const file = req.file;
//   const file = req.file;
//   const fileContent = fs.readFileSync(file);
//   var random = req.params.random;
//   var extension = path.extname(file.originalname);
  
//   // Setting up S3 upload parameters
//   const params = {
//       Bucket: config.BUCKET_NAME,
//       Key: `${random}${extension}`, // File name you want to save as in S3
//       Body: fileContent
//   };

//   // Uploading files to the bucket
//   s3.upload(params, function(err, data) {
//       if (err) {
//         throw err;
//       }
//       console.log(`File uploaded successfully.`);
//   });
//   res.send(`/${req.file.filename}`);
// });

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     const userId = req.params.userId;
//     const dir = `uploads/${userId}`;    
//     if(!fs.existsSync(dir)){
//       fs.mkdirSync(dir);
//     }    
//     cb(null, dir);
//   },
//   filename(req, file, cb) {
//     var random = req.params.random;
//     var extension = path.extname(file.originalname);    
//     cb(null, `${random}${extension}`);
//   },
// });

// const upload = multer({ storage }).single('file');

// uploadRouter.post('/:userId/:random', isAuth, upload, (req, res) => {
//   res.send(`/${req.file.filename}`);
// });

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// const s3 = new aws.S3();

// aws.config = new aws.Config();
// aws.config.update({
//   secretAccessKey: Config.SECRET,
//   accessKeyId: Config.ID,
//   region: "ap-south-1",
// });

const s3 = new aws.S3({
  credentials: {
      secretAccessKey: Config.SECRET,
      accessKeyId: Config.ID,
      region: "ap-south-1",
  },
});

const upload = multer({
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: Config.BUCKET_NAME,
    metadata: function(req,file, cb){
      cb(null, {fieldName: "Test"});
    },
    key: function (req, file, cb) {
      var random = req.params.random;
      var extension = path.extname(file.originalname);    
      cb(null, `${random}${extension}`);
    },
  }),
});

uploadRouter.post('/:userId/:random', isAuth, upload.single('file'), (req, res) => {
  res.send(`/${req.file.filename}`);
});

export default uploadRouter;