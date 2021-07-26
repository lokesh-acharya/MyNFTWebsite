require('dotenv').config();

export const awsToIPFS = async(filename) => {  

  const aws = require('aws-sdk');
  const axios = require('axios');
  const FormData = require('form-data');

  const s3AccessKeyId = process.env.REACT_APP_ID;
  const s3AccessSecret = process.env.REACT_APP_SECRET;
  const s3Region = process.env.REACT_APP_REGION;
  const s3Bucket = process.env.REACT_APP_BUCKET_NAME;
  const apiKey = process.env.REACT_APP_PINATA_KEY;
  const apiSecret = process.env.REACT_APP_PINATA_SECRET;

  var form = new FormData();
  const fileName = filename;
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

  const s3 = new aws.S3({
    credentials: {
      secretAccessKey: s3AccessSecret,
      accessKeyId: s3AccessKeyId,
      region: s3Region,
    },
  });

  const params = {
    Bucket: s3Bucket,
    Key: fileName,
  };

  // console.log(fileName);
  // console.log(s3);

  const s3Stream = s3.getObject(params).createReadStream();
  // const s3Stream = s3.getObject({ 
  //   Bucket: s3Bucket,
  //   Key: fileName
  // }, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // }).createReadStream();

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