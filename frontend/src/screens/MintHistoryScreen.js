import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMintMine } from '../actions/mintActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function MintHistoryScreen(props) {
  const mintMineList = useSelector((state) => state.mintMineList);
  const { loading, error, mints } = mintMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listMintMine());
  }, [dispatch]);
  return (
    <div>
      <h1>Mint History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              {/* <th>TOTAL</th>        ?????? */}
              {/* <th>PAID</th> */}
              <th>MINTED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {mints.map((mint) => (
              <tr key={mint._id}>
                <td>{mint._id}</td>
                <td>{mint.createdAt.substring(0, 10)}</td>
                {/* <td>{mint.totalPrice.toFixed(2)}</td> */}
                {/* <td>{mint.isPaid ? mint.paidAt.substring(0, 10) : 'No'}</td> */}
                <td>
                  {mint.isMinted
                    ? mint.mintedAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/mint/${mint._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
