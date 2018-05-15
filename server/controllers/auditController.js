import * as walletWrapper from '../wrappers/walletWrapper';
import * as tokenWrapper from '../wrappers/tokenWrapper';
import * as TokenContractsModel from '../models/TokenContractsModel';

const logger = require('../utils/logger')('walletController');

export default async function getAccountsEthTokenBalance(req, res) {
  logger.log('debug', 'createSaveWallet - start: %j', req.body);
  const accountAddresses = await walletWrapper.getAllWallets();
  const tokenContract = await TokenContractsModel.getLastTokenContract();
  console.log(accountAddresses, tokenContract);
  const accountInfo = await Promise.all(
    accountAddresses.map(async accountAddress => {
      const ethBalance = await walletWrapper.getEthBalanceOf({ accountAddress });
      const tokenBalance = await tokenWrapper.getTokenBalanceOf({
        contractAddress: tokenContract,
        accountAddress,
      });
      return { accountAddress, ethBalance, tokenBalance };
    }),
  );
  logger.log('debug', 'createSaveWallet - end: %s', accountInfo);
  res.status(200).send({ data: accountInfo, error: null });
}
