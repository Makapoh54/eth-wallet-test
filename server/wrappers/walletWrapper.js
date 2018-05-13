import web3 from '../utils/web3';

const logger = require('../utils/logger')('tokenWrapper');

export async function createWallet() {
  const walletAddress = await web3.eth.personal.newAccount('');
  logger.log('debug', 'createWallet address: %s', walletAddress);
  return walletAddress;
}

export async function transferEth({ fromAddress, toAddress, ethAmount }) {
  logger.log(
    'debug',
    'transferEth fromAddress: %s, toAddress: %s, ethAmount: %s',
    fromAddress,
    toAddress,
    ethAmount,
  );
  const receipt = await web3.eth.sendTransaction({
    from: fromAddress,
    to: toAddress,
    value: web3.toWei(ethAmount, 'ether'),
  });

  logger.log('debug', 'transferEth: %s', receipt);
  return receipt;
}

export async function getEthBalanceOf({ walletAddress }) {
  logger.log('debug', 'getEthBalanceOf walletAddress: %s', walletAddress);
  const balance = web3.fromWei(await web3.eth.getBalance(walletAddress), 'ether');
  logger.log('debug', 'balance: %j', balance);
  return balance;
}
