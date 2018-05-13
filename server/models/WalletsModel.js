import mongoose from 'mongoose';

const walletsSchema = new mongoose.Schema(
  {
    wallets: [{ type: String, required: true }],
  },
  { timestamps: true },
);

const WalletsModel = mongoose.model('Wallet', walletsSchema);

const saveOptions = { upsert: true, new: true, runValidators: true };

export const save = async model => new WalletsModel(model).save();

export async function addWalletToSet(address) {
  await WalletsModel.findOneAndUpdate(
    {
      $push: {
        wallets: address,
      },
    },
    saveOptions,
  );
}

export async function getAllWallets() {
  return WalletsModel.findOne({}, 'wallets -_id');
}
