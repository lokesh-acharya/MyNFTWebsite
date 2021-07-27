import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET || 'iamthegreatest',
    {
      expiresIn: '24h',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'iamthegreatest',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' });
  }
};

export const awsToIPFS = async (filename) => {
  var axios = require('axios');
  var FormData = require('form-data');
  var form = new FormData();
  const AWS = require('aws-sdk');
  const fileName = filename;

  const Config = require('./config.js');
  const s3AccessKeyId = Config.ID;
  const s3AccessSecret = Config.SECRET;
  const s3Region = Config.REGION;
  const s3Bucket = Config.BUCKET_NAME;

  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const apiKey = Config.PINATA_KEY;
  const apiSecret = Config.PINATA_SECRET;

  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3AccessSecret,
      region: s3Region
    }
  });

  let s3Stream = s3.getObject({
    Bucket: s3Bucket,
    Key: fileName
  }).createReadStream();

  form.append('file', s3Stream, {
    filename: fileName //required or it fails
  });

  var config = {
    method: 'post',
    url: url,
    data: form,
    maxBodyLength: 'Infinity',
    maxContentLength: 'Infinity',
    headers: {
      pinata_api_key: apiKey,
      pinata_secret_api_key: apiSecret,
      ...form.getHeaders()
    },
  };

  return (
    await axios(config)
    .then(function (response) {
      return {
        success: true,
        data: response.data   
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        data: error.message
      }
    })
  )
}

// export const awsToIPFS = async (filename) => {
//   var FormData = require('form-data');
//   var form = new FormData();
//   const AWS = require('aws-sdk');
//   const fileName = filename;

//   const Config = require('./config.js');
//   const s3AccessKeyId = Config.ID;
//   const s3AccessSecret = Config.SECRET;
//   const s3Region = Config.REGION;
//   const s3Bucket = Config.BUCKET_NAME;

//   const s3 = new AWS.S3({
//     credentials: {
//       accessKeyId: s3AccessKeyId,
//       secretAccessKey: s3AccessSecret,
//       region: s3Region
//     }
//   });

//   let s3Stream = s3.getObject({
//     Bucket: s3Bucket,
//     Key: fileName
//   }).createReadStream();

//   form.append('file', s3Stream, {
//     filename: fileName //required or it fails
//   });
  
//   return form;
// }
