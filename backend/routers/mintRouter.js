import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Mint from '../models/mintModel.js';
import User from '../models/userModel.js';
import {
  isAdmin,
  isAuth,
  awsToIPFS
} from '../utils.js';

const mintRouter = express.Router();

mintRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mints = await Mint.find({}).populate(
      'user',
      'name'
    );
    res.send(mints);
  })
);

mintRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mints = await Mint.aggregate([
      {
        $group: {
          _id: null,
          numMints: { $sum: 1 },          
          totalMinted: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, mints });
  })
);

mintRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const mints = await Mint.find({ user: req.user._id });
    res.send(mints);
  })
);

mintRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const mint = new Mint({
      user: req.user._id,
      file1: req.body.file1,
      file2: req.body.file2,
      file3: req.body.file3
    });
    const createdMint = await mint.save();
    res
      .status(201)
      .send({ message: 'New Mint Request Created', mint: createdMint });
  })
);

mintRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const mint = await Mint.findById(req.params.id);
    if (mint) {
      res.send(mint);
    } else {
      res.status(404).send({ message: 'Mint Request Not Found' });
    }
  })
);

mintRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mint = await Mint.findById(req.params.id);
    if (mint) {
      const deleteMint = await mint.remove();
      res.send({ message: 'Mint Request Deleted', mint: deleteMint });
    } else {
      res.status(404).send({ message: 'Mint Request Not Found' });
    }
  })
);

mintRouter.put(
  '/:id/mint',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mint = await Mint.findById(req.params.id);
    const assetURL = req.body.assetURL;
    const transaction = req.body.transaction;
    if (mint) {      
      mint.isMinted = true;
      mint.mintedAt = Date.now();
      mint.assetURL = assetURL;
      mint.tranaction = transaction;    
      const updatedMint = await mint.save();
      res.send({ message: 'Token Minted', mint: updatedMint });
    } else {
      res.status(404).send({ message: 'Mint Request Not Found' });
    }
  })
);

mintRouter.get(
  '/:id/ifps1',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mint = await Mint.findById(req.params.id);
    if(mint) {
      const result = await awsToIPFS(mint.file3.file);
      if(result.sucess) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result.data));
      }
      else {
        // res.setHeader('Content-Type', 'application/json');
        res.status(500).send({ message: JSON.stringify(result.data) });
      }
    } else {
      res.status(404).send({ message: 'Mint Request Not Found' });
    }
  })
);

mintRouter.get(
  '/:id/ifps',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mint = await Mint.findById(req.params.id);
    if(mint) {
      const axios = require('axios');
      // const FormData = require('form-data');
      const AWS = require('aws-sdk');
      const pinataSDK = require('@pinata/sdk');
      
      const fileName = mint.file3.file;
      const s3AccessKeyId = process.env.ID;
      const s3AccessSecret = process.env.SECRET;
      const s3Region = process.env.REGION;
      const s3Bucket = process.env.BUCKET_NAME;          
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

      // var form = new FormData();
      // form.append('file', s3Stream, {
      //   filename: fileName //required or it fails
      // });

      const pinata = pinataSDK(apiKey, apiSecret);
      pinata.testAuthentication().then((result) => {}).catch((err) => {
        res.status(500).send(err);
      });
    
      pinata.pinFileToIPFS(s3Stream).then((result) => {
        res.send(result);
      }).catch((err) => {
        res.status(500).send(err);
      });

      // var params = {
      //   method: 'post',
      //   url: `http://localhost:${process.env.PORT}/api/upload/`,
      //   data: form,
      //   headers: {
      //     ...form.getHeaders()
      //   },
      // };
      // await axios(params)
      //   .then(function (response) {})
      //   .catch(function (error) {
      //     res.status(500).send({
      //       success: false,
      //       message: error.message,
      //     })
      //   })
      // s3.getObject({
      //     Bucket: s3Bucket,
      //     Key: fileName
      //   }, (err, data) => {
      //   if (err) {
      //     res.status(500).send(err);
      //   } else {
      //     let csvBlob = new Blob([data.Body.toString()], {
      //       type: 'text/csv;charset=utf-8;',
      //     });
      //     form.append('file', csvBlob, {
      //       filename: fileName
      //     });
      //   }
      // });
      // let data1 = new FormData();
      // data1.append('file', fs.createReadStream(`${__dirname}/uploads/` + fileName));
      

      // const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
      // const apiKey = process.env.PINATA_KEY;
      // const apiSecret = process.env.PINATA_SECRET;

      // axios.post(
      //   url,
      //   form,
      //   {
      //     maxContentLength: 'Infinity',
      //     headers: {
      //       'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      //       'pinata_api_key': apiKey,
      //       'pinata_secret_api_key': apiSecret
      //     }
      //   }
      // ).then(function (response) {
      //   res.send({
      //     success: true,
      //     result: response.data
      //   })
      // }).catch(function (error) {
      //   res.status(500).send({
      //     success: false,
      //     message: error.message,
      //   })
      // });
    }
    else {
      res.status(404).send({ message: 'Mint Request Not Found' });
    }
  })
);

mintRouter.get(
  '/ifps/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mint = await Mint.findById(req.params.id);
    if(mint) {
      const aws = require('aws-sdk');
      const pinataSDK = require('@pinata/sdk');
      
      const s3AccessKeyId = process.env.APP_ID;
      const s3AccessSecret = process.env.SECRET;
      const s3Region = process.env.REGION;
      const s3Bucket = process.env.BUCKET_NAME;
      const apiKey = process.env.PINATA_KEY;
      const apiSecret = process.env.PINATA_SECRET;

      const fileName = mint.file3.file;
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
          // console.log(err, err.stack);          
          // return { success: false, message: err }
          res.status(500).end();
        }
        else {
          var stream = data.createReadStream()
          const pinata = pinataSDK(apiKey, apiSecret);          
          pinata.pinFileToIPFS(stream).then((result) => {
            res.send(result);
          }).catch((err) => {
            res.status(500).end();
          });
        }
      });
    }
    else {
      res.status(404).send({ message: 'Mint Request Not Found' });
    }
  })
)

export default mintRouter;