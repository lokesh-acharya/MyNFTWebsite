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
    const transaction = req.body.tranaction;
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
  '/:id/ifps',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const mint = await Mint.findById(req.params.id);
    if(mint) {
      const { sucess, data } = awsToIPFS(mint.file3.file);
      if(sucess) {
        res.send({ sucess: true, message: "aws to ipfs done!", result: data });
      } else {
        res.status(500).send({ sucess: false, message: data});
      }
    } else {
      res.status(404).send({ sucess: false, message: 'Mint Request Not Found' });
    }
  })
);

export default mintRouter;
