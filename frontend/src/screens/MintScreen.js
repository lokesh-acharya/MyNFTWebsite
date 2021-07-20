import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mintMint, detailsMint } from '../actions/mintActions';
import { viewFile } from '../actions/helperActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  MINT_MINT_RESET,
} from '../constants/mintConstants';

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

  const mintHandler = () => {
    dispatch(mintMint(mint._id));
  };

  // const handleDownload = (event) => {
  //   event.preventDefault();
  //   dispatch(viewFile(mint.file1.file));
  // };

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
                  <strong>Name:</strong> <br />
                  <strong>Description:</strong> <br />
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
                  <button
                    type="button"
                    className="primary block"
                    onClick={mintHandler}
                  >
                    Mint Mint
                  </button>
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
