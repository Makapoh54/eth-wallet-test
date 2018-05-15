import mongoose from 'mongoose';
import { isEmpty } from 'lodash';

const tokensSchema = new mongoose.Schema(
  {
    tokens: [{ type: String, required: true }],
  },
  { timestamps: true },
);

const TokensModel = mongoose.model('token', tokensSchema);

const saveOptions = { upsert: true, new: true, runValidators: true };

export const save = async model => new TokensModel(model).save();

export async function addTokenContractToSet(address) {
  await TokensModel.findOneAndUpdate(
    {},
    {
      $push: {
        tokens: address,
        $position: 0,
      },
    },
    saveOptions,
  );
}

export async function getLastTokenContract() {
  const tokensModel = await TokensModel.findOne({}, { tokens: { $slice: -1 } });
  return tokensModel && !isEmpty(tokensModel.tokens) ? tokensModel.tokens[0] : '';
}

export async function getAllTokenContracts() {
  const tokensModel = await TokensModel.findOne({}, 'tokens -_id');
  return tokensModel ? tokensModel.tokens : [];
}
