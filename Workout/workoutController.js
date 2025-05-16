import * as workoutService from './workoutService.js';
import {addNewExercise} from "./workoutService.js" 
import {getExerciseSets} from "./workoutService.js"
export const createWorkoutDay = async (req, res) => {
  try {
    const workout = await workoutService.createWorkoutDay(req.body);
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getWorkoutDays = async (req, res) => {
  try {
    const workouts = await workoutService.getUserWorkouts(req.params.userId);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createExercise = async (req, res) => {
  try {
    const { name, youtubeLink } = req.body;
    const exercise = await addNewExercise(name, youtubeLink);
    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getExerciseHistory = async (req, res) => {
  const { exerciseId } = req.params; 
  const userId = req.user._id

  try {
    const allSets = await getExerciseSets(exerciseId, userId);
    res.status(200).json(allSets);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
