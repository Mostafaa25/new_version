import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  youtubeLink: { type: String, required: true } 
});

export default mongoose.model('Exercise', exerciseSchema);
