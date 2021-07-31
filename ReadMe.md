# MyNFT Project  
Project involves implementation of a website to mint NFT tokens over ethereum testnet using smart contract deployed over Heroku server.  
Using MERN stack to develop the platform and using AWS-s3 as secondary storage to store files.  
## Program involves following functionalities:    
- User registration and login 
- Admin login to view and edit users profiles and functionality to mint NFT using metamask wallet.  
- ChatBox for customer support i.e. user can send message admin and expext response in case admin is online while admin can see all online users and chat with them.   
  
## Installation for running locally  
Requires [Node.js](https://nodejs.org/) v10+ to run.  
```sh
Replace script in package.json with :-  
"scripts": {  
    "build": "cd frontend && npm install && npm run build",  
    "start": "nodemon --watch backend --exec node --experimental-modules backend/server.js"  
  }  
And add:-  
"type": "module"  
```  
## 1. Clone Repository  
```sh  
$ git clone <repo-name>    
$ cd MyNFTWebsite  
```  
  
## 2. Setup MongoDB      
A. Local MongoDB    
Install it from "https://www.mongodb.com/try/download/community"    
Create .env file in root folder    
B. Set MONGODB_URL=mongodb://localhost/mynftwebsite    
Atlas Cloud MongoDB  
Create database at https://cloud.mongodb.com  
Create .env file in root folder  
Set MONGODB_URL=mongodb+srv://your-db-connection  

## 3. Run Backend  
```sh
$ npm install
$ npm start
```
## 4. Run frontend  
```sh
# open new terminal  
$ cd frontend  
$ npm install  
$ npm start  
```  

Following is the overall structure of program:-  
├── backend  
│   ├── config.js  
│   ├── data.js  
│   ├── models  
│   │   ├── mintModel.js  
│   │   └── userModel.js  
│   ├── routers  
│   │   ├── downloadRouter.js  
│   │   ├── mintRouter.js  
│   │   ├── uploadRouter.js  
│   │   └── userRouter.js  
│   ├── server.js  
│   └── utils.js  
├── dist -**
├── frontend  
│   ├── contracts  
│   │   └── MyNFT.sol  
│   ├── hardhat.config.js  
│   ├── jsconfig.json  
│   ├── package.json  
│   ├── package-lock.json  
│   ├── public -**
│   ├── README.md  
│   ├── scripts  
│   │   └── deploy.js  
│   ├── src  
│   │   ├── actions  
│   │   │   ├── bagActions.js  
│   │   │   ├── helperActions.js  
│   │   │   ├── mintActions.js  
│   │   │   └── userActions.js  
│   │   ├── App.js  
│   │   ├── components  
│   │   │   ├── AdminRoute.js  
│   │   │   ├── ChatBox.js  
│   │   │   ├── LoadingBox.js  
│   │   │   ├── MessageBox.js  
│   │   │   ├── MintRequestSteps.js  
│   │   │   └── PrivateRoute.js  
│   │   ├── constants  
│   │   │   ├── bagConstants.js  
│   │   │   ├── helperConstants.js  
│   │   │   ├── mintConstants.js  
│   │   │   └── userConstants.js  
│   │   ├── contract-abi.json  
│   │   ├── index.css  
│   │   ├── index.js  
│   │   ├── reducers  
│   │   │   ├── bagReducers.js  
│   │   │   ├── helperReducers.js  
│   │   │   ├── mintReducers.js  
│   │   │   └── userReducers.js  
│   │   ├── screens  
│   │   │   ├── DashboardScreen.js  
│   │   │   ├── FileOneScreen.js  
│   │   │   ├── FileThreeScreen.js  
│   │   │   ├── FileTwoScreen.js  
│   │   │   ├── HomeScreen.js  
│   │   │   ├── MintHistoryScreen.js  
│   │   │   ├── MintListScreen.js  
│   │   │   ├── MintScreen.js  
│   │   │   ├── NFTScreen.js  
│   │   │   ├── PlaceMintScreen.js  
│   │   │   ├── ProfileScreen.js  
│   │   │   ├── RegisterScreen.js  
│   │   │   ├── SigninScreen.js  
│   │   │   ├── SupportScreen.js  
│   │   │   ├── UserEditScreen.js  
│   │   │   └── UserListScreen.js  
│   │   ├── serviceWorker.js  
│   │   ├── store.js  
│   │   └── util  
│   │       ├── awsToIPFS.js  
│   │       ├── interact.js  
│   │       └── pinata.js  
│   ├── test  
│   │   └── sample-test.js  
│   └── yarn.lock  
├── package.json  
├── package-lock.json  
├── Procfile  
├── ReadMe.md  
└── uploads  
    └── null.txt  
