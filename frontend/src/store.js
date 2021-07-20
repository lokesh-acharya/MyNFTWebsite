import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { bagReducer } from './reducers/bagReducers';
import Cookie from 'js-cookie';

import {
  mintCreateReducer,
  mintDeleteReducer,
  mintMintReducer,
  mintDetailsReducer,
  mintListReducer,
  mintMineListReducer,
  mintSummaryReducer,
} from './reducers/mintReducers';

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  viewFileReducer
} from './reducers/helperReducers';

const userInfo = Cookie.getJSON("userInfo") || null

const initialState = {
  // userSignin: {
  //   userInfo: localStorage.getItem('userInfo')
  //     ? JSON.parse(localStorage.getItem('userInfo'))
  //     : null,
  // },
  userSignin: { userInfo },
  bag: {
    file1: localStorage.getItem('file1')
      ? JSON.parse(localStorage.getItem('file1'))
      : {},
    file2: localStorage.getItem('file2')
      ? JSON.parse(localStorage.getItem('file2'))
      : {},
    file3: localStorage.getItem('file3')
      ? JSON.parse(localStorage.getItem('file3'))
      : {},
  },
};

const reducer = combineReducers({
  bag: bagReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  mintCreate: mintCreateReducer,
  mintDetails: mintDetailsReducer,
  mintMineList: mintMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  mintList: mintListReducer,
  mintDelete: mintDeleteReducer,
  mintMint1: mintMintReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  mintSummary: mintSummaryReducer,
  viewFile: viewFileReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;