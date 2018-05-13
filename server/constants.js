import * as path from 'path';

export const CONTRACTS_FOLDER = path.join(__dirname, './contracts/');
export const BUILDS_FOLDER = path.join(__dirname, './build/');

export const APP_CONF = {
  HOST_WIN32: 'localhost',
  HOST_DARWIN: 'localhost',
  HOST_LINUX: '0.0.0.0',
  PORT: 3000,
  SESSION_SECRET: 'ashdfjhasdlkjfhalksdjhflak',
  MONGODB_URI_BASE: 'mongodb://35.204.88.148:27017/eth-wallet-test',
  WEB3_ADDRESS: '35.204.88.148:8545',
};

export const DEFAULT_ACC = '0x3f04b29dc09026b6bc5ec11887e23ead5a8acb1b';