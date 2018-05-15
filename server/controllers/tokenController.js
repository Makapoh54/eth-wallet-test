import { validationResult } from 'express-validator/check';
import * as tokenWrapper from '../wrappers/tokenWrapper';
import * as TokenContractsModel from '../models/TokenContractsModel';

const logger = require('../utils/logger')('tokenController');

export async function createSaveToken(req, res) {
  logger.log('debug', 'createSaveToken: %j', req.body);
  const tokenAddress = await tokenWrapper.createToken(req.body.ownerAddress);
  await TokenContractsModel.addTokenContractToSet(tokenAddress);
  logger.log('info', 'createSaveToken New token created: %j', tokenAddress);
  res.status(200).send({ data: { tokenAddress }, error: null });
}

export async function transferToken(req, res) {
  logger.log('debug', 'transferToken %j, %j', req.body, req.params);
  validationResult(req).throw();
  const { contractAddress, accountAddress } = req.params;
  await tokenWrapper.transferToken({ contractAddress, fromAddress: accountAddress, ...req.body });
  logger.log('info', 'transferToken Token transferred');
  res.status(200).send({ data: null, error: null });
}

export async function getTokenBalanceOf(req, res) {
  logger.log('debug', 'getTokenBalanceOf %j', req.params);
  const { contractAddress, accountAddress } = req.params;
  const balance = await tokenWrapper.getTokenBalanceOf({
    contractAddress,
    accountAddress,
  });
  logger.log('info', 'getTokenBalanceOf balance: ', balance);
  res.status(200).send({ data: { balance }, error: null });
}

export async function getAllTokens(req, res) {
  const tokens = await TokenContractsModel.getAllTokenContracts();
  logger.log('info', 'getAllTokens %s', tokens);
  res.status(200).send({ data: { tokens }, error: null });
}

export async function getLastToken(req, res) {
  const tokenAddress = await TokenContractsModel.getLastTokenContract();
  logger.log('info', 'getLastToken %j', tokenAddress);
  res.status(200).send({ data: { tokenAddress }, error: null });
}
