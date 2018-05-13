import express from 'express';
import session from 'express-session';
import mongo from 'connect-mongo';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import asyncErrorHandler from './middlewares/asyncErrorHandler';
import { APP_CONF } from './constants';
import contracts from './wrappers/contracts';

import indexController from './controllers/indexController';
import * as tokenController from './controllers/tokenController';
import * as walletController from './controllers/walletController';

const logger = require('./utils/logger')('server');

const MONGODB_URI = `${APP_CONF.MONGODB_URI_BASE}`;
const MongoStore = mongo(session);
const app = express();
const server = http.Server(app);
const io = socket(server);
app.set('socketio', io);

// Please put this to the place where user have to update inventory
// const io = req.app.get('socketio');
// io.emit('update');

mongoose.Promise = global.Promise; // Use native promises - http://mongoosejs.com/docs/promises.html
mongoose.connect(MONGODB_URI);
mongoose.connection.on('error', () => {
  logger.log('error', 'MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
mongoose.connection.once('open', () => logger.log('info', 'MongoDB has beeen connected.'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: APP_CONF.SESSION_SECRET,
    store: new MongoStore({
      url: MONGODB_URI,
      autoReconnect: true,
    }),
  }),
);

// Publish the frontend static.
app.use(express.static(path.join(__dirname, '../', 'client', 'build'), { maxAge: 31557600000 }));

// Routes controllers
app.post('/api/v1/tokens', asyncErrorHandler(tokenController.createSaveToken));
app.post('/api/v1/tokens/transfers', asyncErrorHandler(tokenController.transferToken));
app.get('/api/v1/tokens/balance', asyncErrorHandler(tokenController.getTokenBalanceOf));

app.post('/api/v1/wallet', asyncErrorHandler(walletController.createSaveWallet));
app.post('/api/v1/wallet/transfers', asyncErrorHandler(walletController.transferEth));
app.get('/api/v1/wallet/balance', asyncErrorHandler(walletController.getEthBalanceOf));

// Publish the frontend index.
app.use('/*', indexController);

app.use(errorHandler());

const host = APP_CONF[`HOST_${process.platform.toUpperCase()}`];
const port = APP_CONF.PORT;
module.exports = server.listen(port, host, () => {
  logger.log('info', `App is running at http://${host}:${port} in ${app.get('env')} mode.`);
});
