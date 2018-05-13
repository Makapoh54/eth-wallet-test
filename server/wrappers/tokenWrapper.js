import contracts from './contracts';

const logger = require('../utils/logger')('tokenWrapper');

export async function createToken(ownerAddress) {
  logger.log('debug', 'createToken ownerAddress: %s', ownerAddress);
  const contract = await contracts.newContract(contracts.getContract('Token'), ownerAddress);
  logger.log('debug', 'createToken address: %s', contract.options.address);
  return contract.options.address;
}

export async function transferToken({ tokenContractAddress, fromAddress, toAddress, tokenAmount }) {
  logger.log(
    'debug',
    'transferToken tokenContractAddress: %s, fromAddress: %s, toAddress: %s, tokenAmount: %s',
    tokenContractAddress,
    fromAddress,
    toAddress,
    tokenAmount,
  );
  const tokenContract = await contracts.getContractAt('Token', tokenContractAddress);

  const receipt = await tokenContract.methods.transfer().send({
    from: fromAddress,
    gas: 3000000,
  });
  logger.log('debug', 'transferToken: %s', receipt);
  return receipt;
}

export async function getTokenBalanceOf({ tokenContractAddress, accountAddress }) {
  logger.log(
    'debug',
    'getBalanceOf tokenContractAddress: %s, accountAddress: %s',
    tokenContractAddress,
    accountAddress,
  );
  const tokenContract = await contracts.getContractAt('Token', tokenContractAddress);
  const balance = await tokenContract.methods.balanceOf(accountAddress).call();
  logger.log('debug', 'balance: %j', balance);
  return balance;
}
