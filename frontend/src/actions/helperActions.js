import Axios from 'axios';
import {
    VIEW_FILE_FAIL,
    VIEW_FILE_REQUEST,
    VIEW_FILE_SUCCESS,
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
export const getIPFS = async(userInfo, mintId) => {
  try {
    await Axios({
      method: 'get',
      url: `/api/mints/${mintId}/ipfs`,
      responseType: 'application/json',
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    .then((res) => {
      return { success: true, data: res.data };
    })
    .catch((error) => {
      return { success: false, data: error.message };
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { success: false, data: message };
  }
};