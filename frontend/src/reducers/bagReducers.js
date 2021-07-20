import {
    BAG_SAVE_FILE1,
    BAG_SAVE_FILE2,
    BAG_SAVE_FILE3    
} from '../constants/bagConstants';
  
export const bagReducer = (state = {}, action) => {
  switch (action.type) {
    case BAG_SAVE_FILE1:
      return { ...state, file1: action.payload };
    case BAG_SAVE_FILE2:
      return { ...state, file2: action.payload };
    case BAG_SAVE_FILE3:
      return { ...state, file3: action.payload };    
    default:
      return state;
  }
};