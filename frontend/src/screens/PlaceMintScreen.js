import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMint } from '../actions/mintActions';
import MintRequestSteps from '../components/MintRequestSteps';
import { MINT_CREATE_RESET } from '../constants/mintConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceMintScreen(props) {
  const bag = useSelector((state) => state.bag);
  
  const mintCreate = useSelector((state) => state.mintCreate);
  const { loading, success, error, mint } = mintCreate;
    
  const dispatch = useDispatch();
  const placeMintHandler = () => {
    dispatch(createMint({ ...bag }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/mint/${mint._id}`);
      dispatch({ type: MINT_CREATE_RESET });
    }
  }, [dispatch, mint, props.history, success]);
  
  return (
    <div>
      <MintRequestSteps step1 step2 step3 step4 step5></MintRequestSteps>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>File 1</h2>
                <p>
                  <strong>Name:</strong> {bag.file1.name} <br />
                  <strong>Description:</strong> {bag.file1.desc} <br />
                  <strong>File:</strong> {bag.file1.file}                  
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
              <h2>File 2</h2>
                <p>
                  <strong>Name:</strong> {bag.file2.name} <br />
                  <strong>Description:</strong> {bag.file2.desc} <br />
                  <strong>File:</strong> {bag.file2.file}                  
                </p>
              </div>
            </li>
            <li>
              <div className="card card-body">
              <h2>File 3</h2>
                <p>
                  <strong>Name:</strong> {bag.file3.name} <br />
                  <strong>Description:</strong> {bag.file3.desc} <br />
                  <strong>File:</strong> {bag.file3.file}                  
                </p>
              </div>
            </li>            
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <button
                  type="button"
                  onClick={placeMintHandler}
                  className="primary block"                  
                >
                  Place Mint
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
