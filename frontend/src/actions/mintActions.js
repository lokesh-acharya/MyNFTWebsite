import Axios from 'axios';
import {
  MINT_CREATE_FAIL,
  MINT_CREATE_REQUEST,
  MINT_CREATE_SUCCESS,
  
  MINT_DETAILS_FAIL,
  MINT_DETAILS_REQUEST,
  MINT_DETAILS_SUCCESS,

  MINT_MINE_LIST_REQUEST,
  MINT_MINE_LIST_FAIL,
  MINT_MINE_LIST_SUCCESS,
  MINT_LIST_REQUEST,
  MINT_LIST_SUCCESS,
  MINT_LIST_FAIL,
  
  MINT_DELETE_REQUEST,
  MINT_DELETE_SUCCESS,
  MINT_DELETE_FAIL,
  
  MINT_MINT_REQUEST,
  MINT_MINT_SUCCESS,
  MINT_MINT_FAIL,
  
  MINT_SUMMARY_REQUEST,
  MINT_SUMMARY_SUCCESS,
} from '../constants/mintConstants';

// const server_url = `http://localhost:5000`;

export const createMint = (mint) => async (dispatch, getState) => {
  dispatch({ type: MINT_CREATE_REQUEST, payload: mint });
  try {
    const {
      userSignin: { userInfo },
    } = getState();

    const { data } = await Axios.post(`/api/mints`, mint, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: MINT_CREATE_SUCCESS, payload: data.mint });    
  } catch (error) {
    dispatch({
      type: MINT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
  localStorage.removeItem('file1');
  localStorage.removeItem('file2');
  localStorage.removeItem('file3');
};

export const detailsMint = (mintId) => async (dispatch, getState) => {
  dispatch({ type: MINT_DETAILS_REQUEST, payload: mintId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/mints/${mintId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: MINT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MINT_DETAILS_FAIL, payload: message });
  }
};

export const listMintMine = () => async (dispatch, getState) => {
  dispatch({ type: MINT_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/mints/mine`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: MINT_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MINT_MINE_LIST_FAIL, payload: message });
  }
};

export const listMints = () => async (dispatch, getState) => {
  dispatch({ type: MINT_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/mints`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: MINT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MINT_LIST_FAIL, payload: message });
  }
};

export const deleteMint = (mintId) => async (dispatch, getState) => {
  dispatch({ type: MINT_DELETE_REQUEST, payload: mintId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/mints/${mintId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: MINT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MINT_DELETE_FAIL, payload: message });
  }
};

export const mintMint = (mintId) => async (dispatch, getState) => {
  dispatch({ type: MINT_MINT_REQUEST, payload: mintId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/mints/${mintId}/mint`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: MINT_MINT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MINT_MINT_FAIL, payload: message });
  }
};

export const summaryMint = () => async (dispatch, getState) => {
  dispatch({ type: MINT_SUMMARY_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/mints/summary`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: MINT_SUMMARY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MINT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
