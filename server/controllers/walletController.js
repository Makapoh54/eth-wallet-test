import * as walletWrapper from '../wrappers/walletWrapper';
import web3 from '../utils/web3';
import { DEFAULT_ACC } from '../constants';

const logger = require('../utils/logger')('walletController');

export async function createSaveWallet(req, res) {
  logger.log('debug', 'createSaveWallet - start: %j', req.body);
  const walletAddress = await walletWrapper.createWallet();
  await web3.eth.personal.unlockAccount(walletAddress, '', 0);
  await walletWrapper.transferEth({
    fromAddress: DEFAULT_ACC,
    toAddress: walletAddress,
    ethAmount: '0.01',
  });
  logger.log('debug', 'createSaveWallet - end: %s', walletAddress);
  res.status(200).send({ data: { walletAddress }, error: null });
}

export async function transferEth(req, res) {
  logger.log('debug', 'transferEth - start: %s', req.params, req.body);
  const { address } = req.params;
  await walletWrapper.transferEth({ fromAddress: address, ...req.body });
  res.status(200).send({ data: null, error: null });
}

export async function getEthBalanceOf(req, res) {
  logger.log('debug', 'getEthBalanceOf - start: %s', req.params);
  const { address } = req.params;
  const balance = await walletWrapper.getEthBalanceOf({ walletAddress: address });
  logger.log('debug', 'getEthBalanceOf - end: %s', balance);
  res.status(200).send({ data: { balance }, error: null });
}

export async function getAllWallets(req, res) {
  logger.log('debug', 'getAllWallets - start: %s', req.body);
  const accounts = await web3.eth.getAccounts();
  logger.log('debug', 'getAllWallets - end: %s', accounts);
  res.status(200).send({ data: { accounts }, error: null });
}
