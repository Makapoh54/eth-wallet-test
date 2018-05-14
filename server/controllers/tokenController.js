import * as tokenWrapper from '../wrappers/tokenWrapper';
import * as TokenContractsModel from '../models/TokenContractsModel';

const logger = require('../utils/logger')('tokenController');

export async function createSaveToken(req, res) {
  logger.log('debug', 'createSaveToken - start: %j', req.body);
  const owner = req.body.ownerAddress;
  const tokenAddress = await tokenWrapper.createToken(owner);
  await TokenContractsModel.addTokenContractToSet({ owner, tokenAddress });
  logger.log('debug', 'createSaveToken - end: %j', tokenAddress);
  res.status(200).send({ data: { tokenAddress }, error: null });
}

export async function transferToken(req, res) {
  logger.log('debug', 'transferToken - start: %j, %j', req.body, req.params);
  const { address } = req.params;
  await tokenWrapper.transferToken({ tokenContractAddress: address, ...req.body });
  logger.log('debug', 'transferToken - end');
  res.status(200).send({ data: null, error: null });
}

export async function getTokenBalanceOf(req, res) {
  logger.log('debug', 'getTokenBalanceOf - start: %j %j', req.body, req.params);
  const { address } = req.params;
  const balance = await tokenWrapper.getTokenBalanceOf({
    tokenContractAddress: address,
    ...req.body,
  });
  logger.log('debug', 'getTokenBalanceOf - end: %j', balance);
  res.status(200).send({ data: { balance }, error: null });
}
