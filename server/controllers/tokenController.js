import * as tokenWrapper from '../wrappers/tokenWrapper';
import * as TokenContractsModel from '../models/TokenContractsModel';

const logger = require('../utils/logger')('tokenController');

export async function createSaveToken(req, res) {
  logger.log('debug', 'createSaveToken - start: %j', req.body);
  const tokenAddress = await tokenWrapper.createToken(req.body.ownerAddress);
  await TokenContractsModel.addTokenContractToSet(tokenAddress);
  logger.log('debug', 'createSaveToken - end: %j', tokenAddress);
  res.status(200).send({ data: { tokenAddress }, error: null });
}

export async function transferToken(req, res) {
  logger.log('debug', 'transferToken - start: %j, %j', req.body, req.params);
  const { contractAddress, accountAddress } = req.params;
  await tokenWrapper.transferToken({ contractAddress, fromAddress: accountAddress, ...req.body });
  logger.log('debug', 'transferToken - end');
  res.status(200).send({ data: null, error: null });
}

export async function getTokenBalanceOf(req, res) {
  logger.log('debug', 'getTokenBalanceOf - start: %j', req.params);
  const { contractAddress, accountAddress } = req.params;
  const balance = await tokenWrapper.getTokenBalanceOf({
    contractAddress,
    accountAddress,
  });
  logger.log('debug', 'getTokenBalanceOf - end: %j', balance);
  res.status(200).send({ data: { balance }, error: null });
}

export async function getAllTokens(req, res) {
  logger.log('debug', 'getAllTokens - start');
  const { tokens } = await TokenContractsModel.getAllTokenContracts();
  logger.log('debug', 'getAllTokens - end: %j', tokens);
  res.status(200).send({ data: { tokens }, error: null });
}
