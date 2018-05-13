import Web3 from 'web3';
import { APP_CONF, DEFAULT_ACC } from '../constants';

const option = `ws://${APP_CONF.WEB3_ADDRESS}`;
const web3 = new Web3(new Web3.providers.WebsocketProvider(option));

web3.eth.defaultAccount = DEFAULT_ACC;

export default web3;
