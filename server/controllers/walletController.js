import * as walletWrapper from '../wrappers/walletWrapper';
import web3 from '../utils/web3';
import { DEFAULT_ACC } from '../constants';

const logger = require('../utils/logger')('walletController');

export async function createSaveWallet(req, res) {
  logger.log('debug', 'createSaveWallet - start: %j', req.body);
  const walletAddress = await walletWrapper.createWallet();
  await walletWrapper.transferEth({
    fromAddress: DEFAULT_ACC,
    toAddress: walletAddress,
    ethAmount: '0.05',
  });
  logger.log('debug', 'createSaveWallet - end: %s', walletAddress);
  res.status(200).send({ data: { walletAddress }, error: null });
}

export async function transferEth(req, res) {
  logger.log('debug', 'transferEth - start: %s', req.params, req.body);
  const { accountAddress } = req.params;
  await walletWrapper.transferEth({ fromAddress: accountAddress, ...req.body });
  res.status(200).send({ data: null, error: null });
}

export async function getEthBalanceOf(req, res) {
  logger.log('debug', 'getEthBalanceOf - start: %s', req.params);
  const { accountAddress } = req.params;
  const balance = await walletWrapper.getEthBalanceOf({ accountAddress });
  logger.log('debug', 'getEthBalanceOf - end: %s', balance);
  res.status(200).send({ data: { balance }, error: null });
}

export async function getAllWallets(req, res) {
  logger.log('debug', 'getAllWallets - start');
  const accountAddresses = await walletWrapper.getAllWallets();
  logger.log('debug', 'getAllWallets - end: %s', accountAddresses);
  res.status(200).send({ data: { accountAddresses }, error: null });
}
