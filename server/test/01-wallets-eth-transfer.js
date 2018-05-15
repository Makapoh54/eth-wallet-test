/* eslint-disable func-names, prefer-arrow-callback */
import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);
const { assert, expect } = chai;

let server;
let newWalletAddress;
let walletsAddresses;

describe('create-channel', function() {
  this.timeout(50000);

  before(async function() {
    server = require('../server');
  });

  after(async function() {
    server.close();
  });

  describe('Test wallets group api', () => {
    it('POST /api/wallets Create new wallet', async function() {
      const res = await chai.request(server).post('/api/v1/wallets');
      assert.equal(res.status, 200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('walletAddress');
      newWalletAddress = res.body.data.walletAddress;
    });

    it('GET /api/wallets get wallets list', async function() {
      const res = await chai.request(server).get('/api/v1/wallets');
      assert.equal(res.status, 200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('accountAddresses');
      expect(res.body.data.accountAddresses).to.be.an('array');
      expect(res.body.data.accountAddresses.includes(newWalletAddress)).to.be.true;
      walletsAddresses = res.body.data.accountAddresses;
    });

    it('POST /api/wallets/transfers create new transfer', async function() {
      const requestBody = { toAddress: walletsAddresses[0], ethAmount: '0.0001' };
      const res = await chai
        .request(server)
        .post(`/api/v1/wallets/${newWalletAddress}/transfers`)
        .send(requestBody);
      assert.equal(res.status, 200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('data');
    });
  });
});
