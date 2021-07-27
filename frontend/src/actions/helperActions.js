import Axios from 'axios';
import {
    VIEW_FILE_FAIL,
    VIEW_FILE_REQUEST,
    VIEW_FILE_SUCCESS,
    IPFS_REQUEST,
    IPFS_REQUEST_SUCCESS,
    IPFS_REQUEST_FAIL
} from '../constants/helperConstants';

export const viewFile = (fileName) => async (dispatch, getState) => {
  dispatch({ type: VIEW_FILE_REQUEST, payload: fileName });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    var userId = userInfo._id;
    Axios({
      method: 'get',
      url: `/api/download/${userId}/${fileName}`,
      responseType: 'blob',
      headers: {Authorization: `Bearer ${userInfo.token}`},
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
        alert(error);
    })
    dispatch({ type: VIEW_FILE_SUCCESS, payload: {} });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: VIEW_FILE_FAIL, payload: message });
  }
};

//export const getIPFS = async(mintId, getState) => {
export const getIPFS1 = async(userInfo, mintId) => {
  // dispatch({ type: IPFS_REQUEST, payload: mintId });
  // const {
  //   userSignin: { userInfo },
  // } = getState();
  // return (
  //   await Axios
  //   .get(
  //     `/api/mints/${mintId}/ipfs`, 
  //     {},
  //     {
  //       headers: { Authorization: `Bearer ${userInfo.token}` 
  //     },
  //   })
  //   .then(function (response) {
  //     return {
  //       success: true,
  //       data: response.data.result        
  //     };
  //   })
  //   .catch(function (error) {
  //     // console.log(error);
  //     const message =
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.message;
  //     return {
  //       success: false,
  //       data: message,
  //     }
  //   })
  // )

  try {
    const { data } = await Axios.get(
      `/api/mints/${mintId}/ipfs`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    // dispatch({ type: IPFS_REQUEST_SUCCESS, payload: data });
    return { success: true, data: data};
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // dispatch({ type: IPFS_REQUEST_FAIL, payload: message });
    return { success: false, data: message };
  }
};

export const getIPFS = async(userInfo, mintId) => {
  try {
    const { data } = await Axios.get(
      `/api/mints/${mintId}/ipfs`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    // dispatch({ type: IPFS_REQUEST_SUCCESS, payload: data });
    return { success: true, data: data};
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // dispatch({ type: IPFS_REQUEST_FAIL, payload: message });
    return { success: false, data: message };
  }
};