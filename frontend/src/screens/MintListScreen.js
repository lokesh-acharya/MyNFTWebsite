import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMint, listMints } from '../actions/mintActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { MINT_DELETE_RESET } from '../constants/mintConstants';

export default function MintListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0;
  const mintList = useSelector((state) => state.mintList);
  const { loading, error, mints } = mintList;
  const mintDelete = useSelector((state) => state.mintDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = mintDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: MINT_DELETE_RESET });
    dispatch(listMints({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (mint) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteMint(mint._id));
    }
  };
  return (
    <div>
      <h1>Mints</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>MINTED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {mints.map((mint) => (
              <tr key={mint._id}>
                <td>{mint._id}</td>
                <td>{mint.user.name}</td>
                <td>{mint.createdAt.substring(0, 10)}</td>
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
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(mint)}
                  >
                    Delete
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
