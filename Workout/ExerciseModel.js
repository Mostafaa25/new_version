import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  youtubeLink: { type: String, required: true } 
});

exerciseSchema.statics.getAllExercises = async function() {
  try {
    const exercises = await this.find({});
    return exercises;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('Exercise', exerciseSchema);
