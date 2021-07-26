import http from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import dotenv, { config } from 'dotenv';
import path from 'path';
//import bodyParser from 'body-parser';
import userRouter from './routers/userRouter.js';
import uploadRouter from './routers/uploadRouter.js';
import downloadRouter from './routers/downloadRouter.js';
import mintRouter from './routers/mintRouter.js';
import cors from 'cors';
import Config from './config.js';
import sslRedirect from 'heroku-ssl-redirect';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(sslRedirect());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(Config.MONGODB_URL || 'mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}, () => console.log('Database connected'))

app.use('/api/upload', uploadRouter);
app.use('/api/download', downloadRouter);
app.use('/api/users', userRouter);
app.use('/api/mints', mintRouter);

// app.get('/api/config/google', (req, res) => {
//   res.send(process.env.GOOGLE_API_KEY || '');
// });

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, './uploads')));
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );
app.use(express.static(path.join(__dirname, './frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './frontend/build/index.html'))
  //res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
);
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  //res.status(500).json(error);
  //res.status(500).send({ message: err.message });
  res.status(500).send(err);
});

//const port = process.env.PORT || 4000;

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
const users = [];

io.on('connection', (socket) => {
  console.log('connection', socket.id);
  socket.on('disconnect', () => {
    const user = users.find((x) => x.socketId === socket.id);
    if (user) {
      user.online = false;
      console.log('Offline', user.name);
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('updateUser', user);
      }
    }
  });
  socket.on('onLogin', (user) => {
    const updatedUser = {
      ...user,
      online: true,
      socketId: socket.id,
      messages: [],
    };
    const existUser = users.find((x) => x._id === updatedUser._id);
    if (existUser) {
      existUser.socketId = socket.id;
      existUser.online = true;
    } else {
      users.push(updatedUser);
    }
    console.log('Online', user.name);
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser);
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users);
    }
  });

  socket.on('onUserSelected', (user) => {
    const admin = users.find((x) => x.isAdmin && x.online);
    if (admin) {
      const existUser = users.find((x) => x._id === user._id);
      io.to(admin.socketId).emit('selectUser', existUser);
    }
  });

  socket.on('onMessage', (message) => {
    if (message.isAdmin) {
      const user = users.find((x) => x._id === message._id && x.online);
      if (user) {
        io.to(user.socketId).emit('message', message);
        user.messages.push(message);
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online);
      if (admin) {
        io.to(admin.socketId).emit('message', message);
        const user = users.find((x) => x._id === message._id && x.online);
        user.messages.push(message);
      } else {
        io.to(socket.id).emit('message', {
          name: 'Admin',
          body: 'Sorry. I am not online right now',
        });
      }
    }
  });
});

httpServer.listen(Config.PORT, () => {
  console.log(`Serve at http://localhost:${Config.PORT}`);
});

// app.listen(Config.PORT, () => {
//   console.log(`Serve at http://localhost:${Config.PORT}`);
// });