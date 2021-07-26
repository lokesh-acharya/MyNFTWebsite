require('dotenv').config();

export const awsToIPFS = async(filename) => {  

  const aws = require('aws-sdk');
  const axios = require('axios');
  const fs = require('fs');
  const FormData = require('form-data');

  const s3AccessKeyId = 'AKIAXWHK6I3DFF2YJWU6';
  const s3AccessSecret = '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';
  const s3Region = 'ap-south-1';
  const s3Bucket = 'mynftwebuploads';
  const apiKey = 'ad6f958a2098f31d4b1e';
  const apiSecret = '16237782d8507734b1703e1142b323f9a99caec0a7a7f9082e280476f68f0b0f';

  // const s3AccessKeyId = process.env.REACT_APP_ID;
  // const s3AccessSecret = process.env.REACT_APP_SECRET;
  // const s3Region = process.env.REACT_APP_REGION;
  // const s3Bucket = process.env.REACT_APP_BUCKET_NAME;
  // const apiKey = process.env.REACT_APP_PINATA_KEY;
  // const apiSecret = process.env.REACT_APP_PINATA_SECRET;

  var form = new FormData();
  const fileName = filename;
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  let s3 = new aws.S3({
    credentials: {
      secretAccessKey: s3AccessSecret,
      accessKeyId: s3AccessKeyId,
      region: s3Region
    }
  });

  console.log(fileName);
  console.log(s3);

  // const s3Stream = s3.getObject({
  //   Bucket: s3Bucket,
  //   Key: fileName
  // }).createReadStream();

  const s3Stream = s3.getObject({ 
    Bucket: s3Bucket,
    Key: fileName
  }, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  }).createReadStream();

  form.append('file', s3Stream, {
    filename: fileName //required or it fails
  });

  var config = {
    method: 'post',
    url: url,
    'maxBodyLength': Infinity,
    headers: {
      'pinata_api_key': apiKey,
      'pinata_secret_api_key': apiSecret,
      ...form.getHeaders()
    },
    data: form
  };

  axios(config)
    .then(function (response) {
      return { sucess: true, data: JSON.stringify(response.data) };
    })
    .catch(function (error) {
      return { sucess: false, data: JSON.stringify(error) };
    });
};

export const awsToIPFS1 = async(filename) => {
  const ipfsClient = require('ipfs-http-client');
  const AWS = require('aws-sdk');
  const fileName = filename;
  const s3AccessKeyId = 'AKIAXWHK6I3DFF2YJWU6';
  const s3AccessSecret = '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';
  const s3Region = 'ap-south-1';
  const s3Bucket = 'mynftwebuploads';  

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

  const tempIPFS = ipfsClient({
    host: 'localhost',
    port: 5001,
    protocol: 'http'
  });

  tempIPFS.add({
    content: s3Stream
  }, {
    cidVersion: 1
  }).then((res) => {
    return { sucess: true, data: JSON.stringify(res.data) };
  }).catch((e) => {
    return { sucess: true, data: JSON.stringify(e.message) };
  });
}