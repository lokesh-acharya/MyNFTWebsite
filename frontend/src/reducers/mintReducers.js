import {
  MINT_CREATE_FAIL,
  MINT_CREATE_REQUEST,
  MINT_CREATE_RESET,
  MINT_CREATE_SUCCESS,
  MINT_DETAILS_FAIL,
  MINT_DETAILS_REQUEST,
  MINT_DETAILS_SUCCESS,
  MINT_MINE_LIST_FAIL,
  MINT_MINE_LIST_REQUEST,
  MINT_MINE_LIST_SUCCESS,
    
  MINT_LIST_REQUEST,
  MINT_LIST_SUCCESS,
  MINT_LIST_FAIL,
  MINT_DELETE_REQUEST,
  MINT_DELETE_SUCCESS,
  MINT_DELETE_FAIL,
  MINT_DELETE_RESET,
  MINT_MINT_REQUEST,
  MINT_MINT_SUCCESS,
  MINT_MINT_FAIL,
  MINT_MINT_RESET,
  MINT_SUMMARY_REQUEST,
  MINT_SUMMARY_SUCCESS,
  MINT_SUMMARY_FAIL,
} from '../constants/mintConstants';

export const mintCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MINT_CREATE_REQUEST:
      return { loading: true };
    case MINT_CREATE_SUCCESS:
      return { loading: false, success: true, mint: action.payload };
    case MINT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MINT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const mintDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case MINT_DETAILS_REQUEST:
      return { loading: true };
    case MINT_DETAILS_SUCCESS:
      return { loading: false, mint: action.payload };
    case MINT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mintMineListReducer = (state = { mints: [] }, action) => {
  switch (action.type) {
    case MINT_MINE_LIST_REQUEST:
      return { loading: true };
    case MINT_MINE_LIST_SUCCESS:
      return { loading: false, mints: action.payload };
    case MINT_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mintListReducer = (state = { mints: [] }, action) => {
  switch (action.type) {
    case MINT_LIST_REQUEST:
      return { loading: true };
    case MINT_LIST_SUCCESS:
      return { loading: false, mints: action.payload };
    case MINT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const mintDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MINT_DELETE_REQUEST:
      return { loading: true };
    case MINT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MINT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case MINT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const mintMintReducer = (state = {}, action) => {
  switch (action.type) {
    case MINT_MINT_REQUEST:
      return { loading: true };
    case MINT_MINT_SUCCESS:
      return { loading: false, success: true };
    case MINT_MINT_FAIL:
      return { loading: false, error: action.payload };
    case MINT_MINT_RESET:
      return {};
    default:
      return state;
  }
};

export const mintSummaryReducer = (
  state = { loading: true, summary: {} },
  action
) => {
  switch (action.type) {
    case MINT_SUMMARY_REQUEST:
      return { loading: true };
    case MINT_SUMMARY_SUCCESS:
      return { loading: false, summary: action.payload };
    case MINT_SUMMARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
