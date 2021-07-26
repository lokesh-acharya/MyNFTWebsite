import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { detailsMint } from '../actions/mintActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function NFTScreen(props) {
  const mintId = props.match.params.id;
  const mintDetails = detailsMint(mintId);

  const mintDetail = useSelector((state) => state.mintDetails);
  const { mint, loading, error } = mintDetail;  

  var typeOfAsset = `image/*`;
  
  return loading ?
  (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>NFT {mint._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Asset</h2>
                <p>
                  { 
                    typeOfAsset.startsWith("image/") === true
                    ? <img src={mintDetails.assetURL} alt =''/>
                    : `Check asset at ${mintDetails.assetURL}`
                  }
                </p>
                <ul>
                  <li>
                    Details:
                    <p>Created by {mintDetails.transaction.from}</p>
                    <p>{mintDetail.file3.name}</p> 
                  </li>
                  <li>
                    About {mintDetails.file3.name}
                    <p>{mintDetail.file3.details}</p>
                  </li>
                  <li>
                    Details
                    <p>Contract Address: {mintDetail.transaction.to}</p>
                    <p>Transaction Hash: {mintDetail.transaction.transHash}</p>
                    <p>Token URI: {mintDetail.transaction.tokenURI}</p>
                    <p>Minted at: {mintDetail.transaction.timestamp}</p>
                  </li>
                </ul>
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
