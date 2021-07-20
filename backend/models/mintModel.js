import mongoose from 'mongoose';

const mintSchema = new mongoose.Schema(
  {
    //user: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    file1: {
      name: { type: String, default: 'file1' },
      desc: { type: String, default: 'This is file 1' },
      file: { type: String, required: true }
    },
    file2: {
      name: { type: String, default: 'file2' },
      desc: { type: String, default: 'This is file 2' },
      file: { type: String, required: true }
    },
    file3: {
      name: { type: String, default: 'file3' },
      desc: { type: String, default: 'This is file 3' },
      file: { type: String, required: true }
    }, 
    isMinted: { type: Boolean},
    mintedAt: { type: Date}
  },
  {
    timestamps: true,
  }
);

const Mint = mongoose.model('Mint', mintSchema);
export default Mint;
