import contracts from './contracts';

const logger = require('../utils/logger')('tokenWrapper');

export async function createToken(ownerAddress) {
  logger.log('debug', 'createToken ownerAddress: %s', ownerAddress);
  const contract = await contracts.newContract(contracts.getContract('Token'), ownerAddress);
  logger.log('info', 'createToken New token address: %s', contract.options.address);
  return contract.options.address;
}

export async function transferToken({ contractAddress, fromAddress, toAddress, tokenAmount }) {
  const tokenContract = await contracts.getContractAt('Token', contractAddress);
  const receipt = await tokenContract.methods.transfer(toAddress, tokenAmount).send({
    from: fromAddress,
    gas: 3000000,
  });
  logger.log('debug', 'transferToken: %s', receipt);
  return receipt;
}

export async function getTokenBalanceOf({ contractAddress, accountAddress }) {
  const tokenContract = await contracts.getContractAt('Token', contractAddress);
  const balance = await tokenContract.methods.balanceOf(accountAddress).call();
  logger.log('debug', 'getTokenBalanceOf balance: %j', balance);
  return balance;
}
