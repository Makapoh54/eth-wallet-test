const ethTransferSchema = {
  accountAddress: {
    in: ['params'],
    notEmpty: true,
    errorMessage: 'accountAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  toAddress: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'toAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  ethAmount: {
    in: ['body'],
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'ethAmount is invalid',
  },
};

const tokenTransferSchema = {
  contractAddress: {
    in: ['params'],
    notEmpty: true,
    errorMessage: 'contractAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  accountAddress: {
    in: ['params'],
    notEmpty: true,
    errorMessage: 'accountAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  toAddress: {
    in: ['body'],
    notEmpty: true,
    errorMessage: 'toAddress is invalid',
    matches: {
      options: /^0x[a-fA-F0-9]{40}$/g,
    },
  },
  tokenAmount: {
    in: ['body'],
    notEmpty: true,
    isNumeric: true,
    errorMessage: 'ethAmount is invalid',
  },
};

export { tokenTransferSchema, ethTransferSchema };
