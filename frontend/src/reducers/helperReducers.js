import {
    VIEW_FILE_FAIL  ,
    VIEW_FILE_REQUEST,
    VIEW_FILE_SUCCESS,
    IPFS_REQUEST,
    IPFS_REQUEST_FAIL,
    IPFS_REQUEST_SUCCESS
} from '../constants/helperConstants';

export const viewFileReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case VIEW_FILE_REQUEST:
      return { loading: true };
    case VIEW_FILE_SUCCESS:
      return { loading: false, success: true, file: action.payload };
    case VIEW_FILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ipfsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case IPFS_REQUEST:
      return { loading: true };
    case IPFS_REQUEST_SUCCESS:
      return { loading: false, success: true, result : action.payload };
    case IPFS_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};