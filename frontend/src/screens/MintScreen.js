import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mintMint, detailsMint } from '../actions/mintActions';
// import { getIPFS } from '../actions/helperActions';
import { viewFile } from '../actions/helperActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  MINT_MINT_RESET,
} from '../constants/mintConstants';
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from '../util/interact.js';
import { awsToIPFS } from '../util/awsToIPFS.js'

export default function MintScreen(props) {
  const mintId = props.match.params.id;
  const mintDetails = useSelector((state) => state.mintDetails);
  const { mint, loading, error } = mintDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const mintMint1 = useSelector((state) => state.mintMint1);
  const {
    loading: loadingMint,
    error: errorMint,
    success: successMint,
  } = mintMint1;

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");  

  useEffect(() => {
    async function fetchData() {
      const { address, status } =  await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
      addWalletListener();
    }
    fetchData();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !mint ||
      successMint ||
      (mint && mint._id !== mintId)
    ) {
      dispatch({ type: MINT_MINT_RESET });
      dispatch(detailsMint(mintId));
    }
  }, [dispatch, mintId, successMint, mint]);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <p>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </p>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  // const [startMint, setStartMint] = useState(false);
  // const [ipfsResult, setIpfsResult] = useState({});
  // const [mintResults, setMintResults] = useState({});

  // useEffect(() => {
  //   const fetchMintData = async () => {
  //     const name = mint.file3.name;
  //     const description = mint.file3.desc;
  //     const assetUrl = `https://gateway.pinata.cloud/ipfs/${ipfsResult.data.IpfsHash}`;
  //     const mintResults = await mintNFT(assetUrl, name, description);
  //     setMintResults(mintResults);
  //   }
  //   fetchMintData()
  // }, [mint, ipfsResult])
  
  // const onMintPressed = async () => {
  //   if(!startMint) setStartMint(true);
  //   if(ipfsResult.success) {
  //     const name = mint.file3.name;
  //     const description = mint.file3.desc;
  //     const assetUrl = `https://gateway.pinata.cloud/ipfs/${ipfsResult.data.IpfsHash}`;
  //     const mintResults = await mintNFT(assetUrl, name, description);
  //     // await getMintResult(assetUrl, name, description);
  //     if(mintResults.success) {
  //       setStatus(mintResults.status);
  //       dispatch(mintMint(mint._id, assetUrl, mintResults.transaction));
  //       // window.location.reload();
  //     }
  //     else {
  //       setStatus(mintResults.status);
  //     }
  //   }
  //   else {
  //     console.log(ipfsResult.message);
  //   }
  // }
  
  const getAWStoIPFS = async() => {
    const data = await awsToIPFS(mint.file3.file);
    return data;
  }
  const getMintResult = async() => {
    const name = mint.file3.name;
    const description = mint.file3.desc;
    const assetUrl = `https://gateway.pinata.cloud/ipfs/${ipfsResult.data.IpfsHash}`;
    const mintResults = await mintNFT(assetUrl, name, description);
    return mintResults; 
  }

  const onMintPressed = async () => {
    // let ipfsResult = await getIPFS(userInfo, mint._id);
    // const ipfsResult = await awsToIPFS(mint.file3.file);
    const aws = require('aws-sdk');
    // const axios = require('axios');
    const pinataSDK = require('@pinata/sdk');
    
    const s3AccessKeyId = process.env.REACT_APP_ID;
    const s3AccessSecret = process.env.REACT_APP_SECRET;
    const s3Region = process.env.REACT_APP_REGION;
    const s3Bucket = process.env.REACT_APP_BUCKET_NAME;
    const apiKey = process.env.REACT_APP_PINATA_KEY;
    const apiSecret = process.env.REACT_APP_PINATA_SECRET;

    const fileName = mint.file3.file;
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

    var ipfsResult;
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
          ipfsResult = { success: false, message: err }
        });
        pinata.pinFileToIPFS(stream).then((result) => {
          return { success: true, data: result }
        }).catch((err) => {
          ipfsResult = { success: false, message: err }
        });
      }
    });
    // const ipfsResult = await getAWStoIPFS();
    console.log(ipfsResult);
    if(ipfsResult.success) {
      const name = mint.file3.name;
      const description = mint.file3.desc;
      const assetUrl = `https://gateway.pinata.cloud/ipfs/${ipfsResult.data.IpfsHash}`;
      // const mintResults = await mintNFT(assetUrl, name, description);
      // await getMintResult(assetUrl, name, description);
      // const mintResults = await getMintResult()
      await mintNFT(assetUrl, name, description)
        .then((value) => {
          if(value.success) {
            setStatus(value.status);
            dispatch(mintMint(mint._id, assetUrl, value.transaction));
            // window.location.reload();
          }
          else {
            setStatus(value.status);
          } 
        });
      // if(mintResults.success) {
      //   setStatus(mintResults.status);
      //   dispatch(mintMint(mint._id, assetUrl, mintResults.transaction));
      //   // window.location.reload();
      // }
      // else {
      //   setStatus(mintResults.status);
      // }
    }
    else {
      console.log(ipfsResult.message);
    }
  };

  return loading ?
  (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Mint {mint._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>File 1</h2>
                <p>
                  <strong>Name:</strong> {mint.file1.name} <br />
                  <strong>Description:</strong> {mint.file1.desc} <br />
                  <strong>File:</strong>
                    <Link to={`/${mint.file1.file}`} onClick={()=> {
                      dispatch(viewFile(mint.file1.file));
                    }}>
                      {mint.file1.file}
                    </Link>
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
              <h2>File 2</h2>
                <p>
                  <strong>Name:</strong> {mint.file2.name} <br />
                  <strong>Description:</strong> {mint.file2.desc} <br />
                  <strong>File:</strong>
                    <Link to={`/${mint.file2.file}`} onClick={()=> {
                      dispatch(viewFile(mint.file2.file));
                    }}>
                      {mint.file2.file}
                    </Link>
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
              <h2>File 3</h2>
                <p>
                  <strong>Name:</strong> {mint.file3.name} <br />
                  <strong>Description:</strong> {mint.file3.desc} <br />
                  <strong>File:</strong>
                    <Link to={`/${mint.file3.file}`} onClick={()=> {
                      dispatch(viewFile(mint.file3.file));
                    }}>
                      {mint.file3.file}
                    </Link>                  
                </p>
              </div>
            </li>
            <li>
                {mint.isMinted ? (
                  <MessageBox variant="success">
                    Minted at {mint.mintedAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Minted</MessageBox>
                )}
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul> 
              {userInfo.isAdmin && !mint.isMinted && (
                <li>
                  {loadingMint && <LoadingBox></LoadingBox>}
                  {errorMint && (
                    <MessageBox variant="danger">{errorMint}</MessageBox>
                  )}
                  <button id="walletButton" onClick={connectWalletPressed}>
                    {walletAddress.length > 0 ? (
                      "Connected: " +
                      String(walletAddress).substring(0, 6) +
                      "..." +
                      String(walletAddress).substring(38)
                    ) : (
                      <span>Connect Wallet</span>
                    )}
                  </button>
                  <br></br>
                  <button id="mintButton" onClick={onMintPressed}>
                    Mint NFT
                  </button>
                  <p id="status" style={{ color: "red" }}>
                    {status}
                  </p>
                </li>
              )}
              {mint.isMinted && (
                <li>
                  {loadingMint && <LoadingBox></LoadingBox>}
                  {errorMint && (
                    <MessageBox variant="danger">{errorMint}</MessageBox>
                  )}
                  <Link to={`/nft/${mint._id}`}>See NFT transaction</Link>
                </li>
              )}
              <li>
                <Link to='/' >Go back home</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}