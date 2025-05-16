import WorkoutDay from './WorkoutDayModel.js';
import Exercise from "./ExerciseModel.js" 
import  mongoose  from 'mongoose'
 const createWorkoutDay = (data) => WorkoutDay.create(data);
 const getWorkoutDaysByUser = (userId) => WorkoutDay.find({ user: userId });
 const createExercise = async (data) => {
  return await Exercise.create(data);
};

const findWorkoutDaysByExercise = async (userId, exerciseId) => {
  console.log('User ID:', userId);
console.log('Exercise ID:', exerciseId);

  return await WorkoutDay.find({
     user: new mongoose.Types.ObjectId(userId),
  'exercises.exercise': new mongoose.Types.ObjectId(exerciseId)
  }).populate('exercises.exercise');
};

export {createWorkoutDay , getWorkoutDaysByUser , createExercise , findWorkoutDaysByExercise}