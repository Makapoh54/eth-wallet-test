import contracts from './contracts';

const logger = require('../utils/logger')('tokenWrapper');

export async function createToken(ownerAddress) {
  logger.log('debug', 'createToken ownerAddress: %s', ownerAddress);
  const contract = await contracts.newContract(contracts.getContract('Token'), ownerAddress);
  logger.log('debug', 'createToken address: %s', contract.options.address);
  return contract.options.address;
}

export async function transferToken({ contractAddress, fromAddress, toAddress, tokenAmount }) {
  logger.log(
    'debug',
    'transferToken contractAddress: %s, fromAcc: %s, toAcc: %s, tokenAmount: %s',
    contractAddress,
    fromAccount,
    toAccount,
    tokenAmount,
  );
  const tokenContract = await contracts.getContractAt('Token', contractAddress);

  const receipt = await tokenContract.methods.transfer().send({
    from: fromAddress,
    gas: 3000000,
  });
  logger.log('debug', 'transferToken: %s', receipt);
  return receipt;
}

export async function getTokenBalanceOf({ tokenAddress, accountAddress }) {
  logger.log(
    'debug',
    'getBalanceOf tokenAddress: %s, account: %s',
    tokenAddress,
    accountAddress,
  );
  const tokenContract = await contracts.getContractAt('Token', tokenAddress);
  const balance = await tokenContract.methods.balanceOf(accountAddress).call();
  logger.log('debug', 'balance: %j', balance);
  return balance;
}
