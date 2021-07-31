# MyNFT Project  
Project involves implementation of a website to mint NFT tokens over ethereum testnet using smart contract deployed over Heroku server.  
Using MERN stack to develop the platform and using AWS-s3 as secondary storage to store files.  

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
├── dist
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
├── frontend
│   ├── contracts
│   │   └── MyNFT.sol
│   ├── hardhat.config.js
│   ├── jsconfig.json
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
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
├── secret.txt
└── uploads
    └── null.txt
