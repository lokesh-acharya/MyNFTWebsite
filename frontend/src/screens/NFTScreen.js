import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector } from 'react-redux';
import { detailsMint } from '../actions/mintActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
// import {
//   MINT_MINT_RESET,
// } from '../constants/mintConstants';

export default function NFTScreen(props) {
  const mintId = props.match.params.id;
  const mintDetails = useSelector((state) => state.mintDetails);
  const { mint, loading, error } = mintDetails;
  
  // const mintMint1 = useSelector((state) => state.mintMint1);
  // const {
  //   loading: loadingMint,
  //   error: errorMint,
  //   success: successMint,
  // } = mintMint1;
  
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if(successMint) {
  //     dispatch({ type: MINT_MINT_RESET });
  //     dispatch(detailsMint(mintId));
  //   }
  // }, [dispatch, mintId, successMint]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsMint(mintId));
  });

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
                    ? <img src={mint.assetURL} alt =''/>
                    : `Check asset at ${mint.assetURL}`
                  }
                </p>
                <ul>
                  <li>
                    Details:
                    <p>Created by {mint.transaction.from}</p>
                    <p>{mint.file3.name}</p> 
                  </li>
                  <li>
                    About {mint.file3.name}
                    <p>{mint.file3.details}</p>
                  </li>
                  <li>
                    Details
                    <p>Contract Address: {mint.transaction.to}</p>
                    <p>Transaction Hash: {mint.transaction.transHash}</p>
                    <p>Token URI: {mint.transaction.tokenURI}</p>
                    <p>Minted at: {mint.transaction.timestamp}</p>
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