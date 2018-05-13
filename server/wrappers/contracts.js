import web3 from '../utils/web3';
import { BUILDS_FOLDER } from '../constants';

const logger = require('../utils/logger')('contracts');

const Contracts = {
  getBuild(name) {
    delete require.cache[require.resolve(`${BUILDS_FOLDER}${name}.json`)];
    // eslint-disable-next-line import/no-dynamic-require, global-require
    this[name] = require(`${BUILDS_FOLDER}${name}.json`);
    return this[name];
  },
  
  getContract(name) {
    if (!this[name]) {
      this.getBuild(name);
    }
    return new web3.eth.Contract(this[name].abi);
  },

  getContractAt(name, address) {
    if (!this[name]) {
      this.getBuild(name);
    }
    return new web3.eth.Contract(this[name].abi, address);
  },

  async newContract(contractObject, from, ...contractArguments) {
    console.log(contractObject)
    const newContract = await contractObject
      .deploy({
        arguments: contractArguments,
      })
      .send({
        from,
        gas: 4700000,
      })
      .on('transactionHash', txHash => logger.log('debug', `newPublicContract: txHash:${txHash}`));
    logger.log('debug', `newPublicContract: ${newContract.options.address}`);
    return newContract;
  },
};

export default Contracts;
