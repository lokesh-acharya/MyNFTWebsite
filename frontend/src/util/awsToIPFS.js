require('dotenv').config();

export const awsToIPFS = async (filename) => {
  const aws = require('aws-sdk');
  // const axios = require('axios');
  const pinataSDK = require('@pinata/sdk');
  
  const s3AccessKeyId = process.env.REACT_APP_ID;
  const s3AccessSecret = process.env.REACT_APP_SECRET;
  const s3Region = process.env.REACT_APP_REGION;
  const s3Bucket = process.env.REACT_APP_BUCKET_NAME;
  const apiKey = process.env.REACT_APP_PINATA_KEY;
  const apiSecret = process.env.REACT_APP_PINATA_SECRET;

  const fileName = filename;
  // const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

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

  s3.getObject(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      return { success: false, message: err }
    } 
    else {
      let csvBlob = new Blob([data.Body.toString()], {
        type: 'text/csv;charset=utf-8;',
      });
      var stream = csvBlob.stream();
      const pinata = pinataSDK(apiKey, apiSecret);
      
      pinata.testAuthentication()
      .then((result) => {
        console.log(result)
      }).catch((err) => {
        return { success: false, message: err }
      });    
      pinata.pinFileToIPFS(stream).then((result) => {
        return { success: true, result: result }
      }).catch((err) => {
        return { success: false, message: err }
      });
    }
  });
  
  // console.log(fileName);
  // console.log(s3);

  // const s3Stream = s3.getObject(params, 
  //   function(err, data) {
  //     if (err) console.log(err, err.stack); // an error occurred
  //     else     console.log(data);           // successful response
  //   }
  // ).createReadStream();  

  // form.append('file', s3Stream, {
  //   filename: fileName //required or it fails
  // });

  // var config = {
  //   method: 'post',
  //   url: url,
  //   headers: {
  //     'pinata_api_key': apiKey,
  //     'pinata_secret_api_key': apiSecret,      
  //     'Content-Type': `multipart/form-data; boundary= ${form._boundary}`,
  //   },
  //   data: form
  // };
  // await axios(config)
  //   .then(function (response) {
  //     return { sucess: true, data: JSON.stringify(response.data) };
  //   })
  //   .catch(function (error) {
  //     return { sucess: false, data: JSON.stringify(error) };
  //   });
  // return axios
  //   .post(url, form.file, {
  //     headers: {
  //       pinata_api_key: apiKey,
  //       pinata_secret_api_key: apiSecret,
  //     }
  //   })
  //   .then(function (response) {
  //     return {
  //       success: true,
  //       data: response.data
  //     };
  //   })
  //   .catch(function (error) {
  //     console.log(error)
  //     return {
  //       success: false,
  //       message: error.message,
  //     }
  //   });
};