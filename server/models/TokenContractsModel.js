import mongoose from 'mongoose';

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
  await TokensModel.findOneAndUpdate({},
    {
      $push: {
        tokens: address,
      },
    },
    saveOptions,
  );
}

export async function getLastTokenContract() {
  console.log(TokensModel.findOne({}, 'tokens -_id'))
  return TokensModel.findOne({}, 'tokens -_id');
}

export async function getAllTokenContracts() {
  return TokensModel.findOne({}, 'tokens -_id') || {tokens: []};
}
