# eth-wallet-test
<p align="center">
  <img src="main_screen.png"/>
</p>

Task:

- Create simple smart-contract with couple of basic functions including Token purchasing/transfer
- Create simple web interface to interact with blockchain that should include next functionality
- Creating of the new wallet
- Ability to check ETH balance of accounts
- Ability to transfer ETH between accounts
- Ability to deploy contract that you've previously created
- Ability to send tokens from your smart-contract from one account to another
- Ability to check Token balance of accounts

Requirements are implemented using React (create-react-app) + Node.js Express stack;

Roadmap:

- [x] Simple React frontend
- [x] Node.js REST api
- [x] Web3.js connection with rinkeby ETH network
- [x] Token smart contract deployment
- [x] Transfer tokens and eth between parties
- [x] Sample test written in Mocha/Chai
- [x] Sample validation schemas (express-validator)
- [ ] Define proper error handling model (catching and rethrowing with proper codes, status etc.)
- [ ] Remove hardcode from API versioning system
- [ ] Get rid of babel-node
- [ ] Frontend is too simple :(

Api description:

- POST '/api/v1/wallets' - creates new eth wallet
- GET '/api/v1/wallets' - returns all eth wallets addresses
- POST '/api/v1/wallets/:accountAddress/transfers' Body {toAddress, ethAmount} - creates new eth transfer
- GET '/api/v1/wallets/:accountAddress/balance' - returns specific wallet balance
- POST '/api/v1/tokens' - create/deploy token contract
- GET '/api/v1/tokens' - returns all deployed token list
- GET '/api/v1/tokens/last' - returns last deployed (active) contract
- POST '/api/v1/tokens/:contractAddress/accounts/:accountAddress/transfers' Body {toAddress, tokenAmount} - creates new token transfer
- GET '/api/v1/tokens/:contractAddress/accounts/:accountAddress/balance' - returns specific account token balance
- GET '/api/v1/audit' - returns all wallets eth and active token balance
