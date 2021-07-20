import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import MintHistoryScreen from './screens/MintHistoryScreen';
import MintScreen from './screens/MintScreen';
import PlaceMintScreen from './screens/PlaceMintScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';
import MintListScreen from './screens/MintListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import FileOneScreen from './screens/FileOneScreen';
import FileTwoScreen from './screens/FileTwoScreen';
import FileThreeScreen from './screens/FileThreeScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';

function App() {  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  //window.isAuth =!! userInfo;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>            
            <Link className="brand" to="/">
              MyNFT
            </Link>
          </div>
          <div>           
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/minthistory">Mint History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}            
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/mintlist">Mints</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        {/* <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside> */}
        <main>
          {/* <Route path="/seller/:id" component={SellerScreen}></Route> */}
          {/* <Route path="/cart/:id?" component={CartScreen}></Route> */}
          {/* <Route path="/product/:id" component={ProductScreen} exact></Route> */}
          {/* <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route> */}
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          {/* <Route path="/shipping" component={ShippingAddressScreen}></Route> */}
          {/* <Route path="/payment" component={PaymentMethodScreen}></Route> */}
          <Route path="/mint/:id" component={MintScreen}></Route>
          <Route path="/minthistory" component={MintHistoryScreen}></Route>
          <Route path="/file1" component={FileOneScreen}></Route>
          <Route path="/file2" component={FileTwoScreen}></Route>
          <Route path="/file3" component={FileThreeScreen}></Route>
          <Route path="/placemint" component={PlaceMintScreen}></Route>
          {/* <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route> */}
          {/* <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route> */}
          {/* <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/mint/:mint/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route> */}
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          {/* <PrivateRoute path="/map" component={MapScreen}></PrivateRoute> */}
          {/* <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute> */}
          {/* <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute> */}
          <AdminRoute
            path="/mintlist"
            component={MintListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          {/* <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute> */}
          {/* <SellerRoute
            path="/mintlist/seller"
            component={MintListScreen}
          ></SellerRoute> */}

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
