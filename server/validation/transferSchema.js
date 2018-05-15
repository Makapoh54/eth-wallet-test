import web3 from '../utils/web3';

const addressCheck = {
  options: value => web3.utils.isAddress(value),
};

const ethTransferSchema = {
  accountAddress: {
    in: ['params'],
    errorMessage: 'accountAddress is invalid',
    custom: addressCheck,
  },
  toAddress: {
    in: ['body'],
    errorMessage: 'toAddress is invalid',
    custom: addressCheck,
  },
  ethAmount: {
    in: ['body'],
    isNumeric: true,
    errorMessage: 'ethAmount is invalid',
  },
};

const tokenTransferSchema = {
  contractAddress: {
    in: ['params'],
    errorMessage: 'contractAddress is invalid',
    custom: addressCheck,
  },
  accountAddress: {
    in: ['params'],
    errorMessage: 'accountAddress is invalid',
    custom: addressCheck,
  },
  toAddress: {
    in: ['body'],
    errorMessage: 'toAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  tokenAmount: {
    in: ['body'],
    isNumeric: true,
    errorMessage: 'ethAmount is invalid',
  },
};

export { tokenTransferSchema, ethTransferSchema };
