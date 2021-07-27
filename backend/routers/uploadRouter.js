import multer from 'multer';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { isAuth } from '../utils.js';
import dotenv from 'dotenv';

import aws from "aws-sdk";
import multerS3 from "multer-s3";

dotenv.config();
const uploadRouter = express.Router();

function Upload() {
  // const aws = require("aws-sdk");
  // const multer = require("multer");
  // const multerS3 = require("multer-s3");

  const s3 = new aws.S3({
    credentials: {
      secretAccessKey: process.env.SECRET,
      accessKeyId: process.env.ID,
      region: process.env.REGION,
    }
  });

  const upload = multer({
    storage: multerS3({
      acl: 'public-read',
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      metadata: function(req, file, cb){
        cb(null, {fieldName: "Test"});
      },
      key: function (req, file, cb) {
        var random = req.params.random;
        var extension = path.extname(file.originalname);    
        cb(null, `${random}${extension}`);
      },
    }),
  });
  return upload;
}

uploadRouter.post('/:userId/:random', isAuth, Upload().single('file'), (req, res) => {
  res.send(`/${req.file.filename}`);
});

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // const dir = '/uploads';
    // if(!fs.existsSync(dir)){
    //   fs.mkdirSync(dir);
    // }
    cb(null, `${__dirname}/uploads`);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});  
const upload = multer({ storage }).single('file');
uploadRouter.post('/', upload, (req, res) => {
  res.send('file uploaded');
});

export default uploadRouter;