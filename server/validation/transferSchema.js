const ethTransferSchema = {
  accountAddress: {
    in: ['params'],
    errorMessage: 'accountAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  toAddress: {
    in: ['body'],
    errorMessage: 'toAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
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
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  accountAddress: {
    in: ['params'],
    errorMessage: 'accountAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
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
