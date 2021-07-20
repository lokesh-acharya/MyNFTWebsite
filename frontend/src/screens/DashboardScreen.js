import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { summaryMint } from '../actions/mintActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function DashboardScreen() {
  const mintSummary = useSelector((state) => state.mintSummary);
  const { loading, summary, error } = mintSummary;
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(summaryMint());
  }, [dispatch]);

  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Users
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Mint Requests
                </span>
              </div>
              <div className="summary-body">
                {summary.mints[0] ? summary.mints[0].numMints : 0}
              </div>
            </li>
          </ul>          
        </>
      )}
    </div>
  );
}
