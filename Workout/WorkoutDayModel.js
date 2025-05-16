// WorkoutDayModel.js
import mongoose from 'mongoose';

const SetSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  weight: { type: Number, required: true },
  reps: { type: Number, required: true }
});

const ExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: [SetSchema]
});

const WorkoutDaySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  exercises: [ExerciseSchema]
});

export default mongoose.model('WorkoutDay', WorkoutDaySchema);
