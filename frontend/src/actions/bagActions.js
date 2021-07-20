import {
  BAG_SAVE_FILE1,
  BAG_SAVE_FILE2,
  BAG_SAVE_FILE3
} from '../constants/bagConstants';

export const saveFile1 = (data) => (dispatch) => {
  dispatch({ type: BAG_SAVE_FILE1, payload: data });
  localStorage.setItem('file1', JSON.stringify(data));
};

export const saveFile2 = (data) => (dispatch) => {
  dispatch({ type: BAG_SAVE_FILE2, payload: data });
  localStorage.setItem('file2', JSON.stringify(data));
};

export const saveFile3 = (data) => (dispatch) => {
  dispatch({ type: BAG_SAVE_FILE3, payload: data });
  localStorage.setItem('file3', JSON.stringify(data));
};