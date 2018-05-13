import * as walletWrapper from '../wrappers/walletWrapper';
import web3 from '../utils/web3';
import { DEFAULT_ACC } from '../constants';

const logger = require('../utils/logger')('walletController');

export async function createSaveWallet(req, res) {
  logger.log('debug', 'createSaveWallet - start: %j', req.body);
  const walletAddress = await walletWrapper.createWallet();
  await walletWrapper.transferEth({ from: DEFAULT_ACC, to: walletAddress, ethAmount: 0.01 });
  logger.log('debug', 'createSaveWallet - end: %j', walletAddress);
  res.status(200).send({ data: { walletAddress }, error: null });
}

export async function transferEth(req, res) {
  logger.log('debug', 'transferEth - start: %j', req.body);
  await walletWrapper.transferEth(req.body);
  res.status(200).send({ data: null, error: null });
}

export async function getEthBalanceOf(req, res) {
  logger.log('debug', 'getEthBalanceOf - start: %s', req.body);
  const balance = await walletWrapper.getEthBalanceOf(req.body);
  logger.log('debug', 'getEthBalanceOf - end: %j', balance);
  res.status(200).send({ data: { balance }, error: null });
}

export async function getAllWallets(req, res) {
  logger.log('debug', 'getAllWallets - start: %s', req.body);
  const accounts = await web3.eth.accounts;
  logger.log('debug', 'getAllWallets - end: %j', accounts);
  res.status(200).send({ data: { accounts }, error: null });
}
