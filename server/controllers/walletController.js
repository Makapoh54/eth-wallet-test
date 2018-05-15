import { validationResult } from 'express-validator/check';
import * as walletWrapper from '../wrappers/walletWrapper';
import { DEFAULT_ACC } from '../constants';

const logger = require('../utils/logger')('walletController');

export async function createSaveWallet(req, res) {
  logger.log('debug', 'createSaveWallet ', req.body);
  const walletAddress = await walletWrapper.createWallet();
  await walletWrapper.transferEth({
    fromAddress: DEFAULT_ACC,
    toAddress: walletAddress,
    ethAmount: '0.05',
  });
  logger.log('info', 'createSaveWallet New wallet address: %s', walletAddress);
  res.status(200).send({ data: { walletAddress }, error: null });
}

export async function transferEth(req, res) {
  logger.log('debug', 'transferEth %j %j', req.params, req.body);
  validationResult(req).throw();
  const { accountAddress } = req.params;
  await walletWrapper.transferEth({ fromAddress: accountAddress, ...req.body });
  logger.log('info', 'transferEth eth transferred');
  res.status(200).send({ data: null, error: null });
}

export async function getEthBalanceOf(req, res) {
  logger.log('debug', 'getEthBalanceOf %j', req.params);
  const { accountAddress } = req.params;
  const balance = await walletWrapper.getEthBalanceOf({ accountAddress });
  logger.log('debug', 'getEthBalanceOf balance: %s', balance);
  res.status(200).send({ data: { balance }, error: null });
}

export async function getAllWallets(req, res) {
  const accountAddresses = await walletWrapper.getAllWallets();
  logger.log('info', 'getAllWallets accountAddresses: %s', accountAddresses);
  res.status(200).send({ data: { accountAddresses }, error: null });
}
