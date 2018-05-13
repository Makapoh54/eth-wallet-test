import fs from 'fs';
import solc from 'solc';
import { isEmpty } from 'lodash';
import artifactor from './artifactor';
import deleteFolderRecursive from './fsHandler';
import { CONTRACTS_FOLDER, BUILDS_FOLDER } from '../constants';

const logger = require('../utils/logger')('solcCompiler');

async function solcCompiler() {
  const input = {};
  const allPromises = [];
  deleteFolderRecursive(BUILDS_FOLDER);

  let files;
  try {
    files = fs.readdirSync(CONTRACTS_FOLDER);
  } catch (err) {
    logger.log('error', 'fs.readdirSync error: %s', err);
  }

  files.forEach(file => {
    if (file.endsWith('.sol')) {
      input[file] = fs.readFileSync(`${CONTRACTS_FOLDER}${file}`, 'utf8');
    }
  });
  logger.log(
    'info',
    !isEmpty(input) ? 'Solidity input successfully prepared' : 'Solidity input is Empty',
  );

  const output = solc.compile({ sources: input }, 1);
  if (output.errors) {
    logger.log('error', 'Output Errors: %s', output.errors);
    process.exit(1);
  }

  for (const key in output.contracts) {
    if (Object.prototype.hasOwnProperty.call(output.contracts, key)) {
      const contractName = key.substring(key.indexOf(':') + 1);
      const abi = JSON.parse(output.contracts[key].interface);
      const binary = output.contracts[key].bytecode;
      const events = output.contracts[key].allEvents;
      const contractData = {
        contract_name: contractName,
        abi,
        binary,
        events,
      };

      allPromises.push(
        artifactor
          .save(contractData, `${BUILDS_FOLDER}${contractName}`)
          .catch(error => logger.log('error', 'Contract artifacts saving failed: %s', error)),
      );
    }
  }
  await Promise.all(allPromises).catch(error =>
    logger.log('error', 'Contract artifacts saving failed: %s', error),
  );
  logger.log('info', 'Contracts successfuly compiled!');
}

export default (async () => await solcCompiler())().catch(error =>
  logger.log('error', 'Contracts compiling was not finished: %s', error),
);
