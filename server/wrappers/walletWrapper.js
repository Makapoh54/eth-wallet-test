import web3 from '../utils/web3';

const logger = require('../utils/logger')('walletWrapper');

export async function createWallet() {
  const walletAddress = await web3.eth.personal.newAccount('');
  await web3.eth.personal.unlockAccount(walletAddress, '', 0);
  logger.log('debug', 'createWallet walletAddress: %s', walletAddress);
  return walletAddress;
}

export async function transferEth({ fromAddress, toAddress, ethAmount }) {
  const receipt = await web3.eth.sendTransaction({
    from: fromAddress,
    to: toAddress,
    value: web3.utils.toWei(ethAmount, 'ether'),
  });

  logger.log('debug', 'transferEth: %s', receipt);
  return receipt;
}

export async function getEthBalanceOf({ accountAddress }) {
  const balance = web3.utils.fromWei(await web3.eth.getBalance(accountAddress), 'ether');
  logger.log('debug', 'balance: %s', balance);
  return balance;
}

export async function getAllWallets() {
  const accounts = await web3.eth.getAccounts();
  logger.log('debug', 'getAllWallets accounts: %s', accounts);
  return accounts;
}
