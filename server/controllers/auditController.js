import * as walletWrapper from '../wrappers/walletWrapper';
import * as tokenWrapper from '../wrappers/tokenWrapper';
import * as TokenContractsModel from '../models/TokenContractsModel';

const logger = require('../utils/logger')('auditController');

export default async function getAccountsEthTokenBalance(req, res) {
  logger.log('debug', 'getAccountsEthTokenBalance %j', req.body);
  const accountAddresses = await walletWrapper.getAllWallets();
  const contractAddress = await TokenContractsModel.getLastTokenContract();
  const accountAudit = await Promise.all(
    accountAddresses.map(async accountAddress => {
      const ethBalance = await walletWrapper.getEthBalanceOf({ accountAddress });
      const tokenBalance = contractAddress
        ? await tokenWrapper.getTokenBalanceOf({
            contractAddress,
            accountAddress,
          })
        : '';
      return { accountAddress, ethBalance, tokenBalance };
    }),
  );
  logger.log('debug', 'getAccountsEthTokenBalance accountAudit %j', accountAudit);
  res.status(200).send({ data: { accountAudit }, error: null });
}
