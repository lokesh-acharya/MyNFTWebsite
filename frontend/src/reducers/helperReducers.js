import {
    VIEW_FILE_FAIL  ,
    VIEW_FILE_REQUEST,
    VIEW_FILE_SUCCESS
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