
import WorkoutDay from '../Workout/WorkoutDayModel.js';
import {createExercise} from "./workoutRepository.js"
import {findWorkoutDaysByExercise} from "./workoutRepository.js"

export const createWorkoutDay = async (data) => {
  const userId = data.user;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of the day

  // 1. Find existing workout for today
  let workoutDay = await WorkoutDay.findOne({
    user: userId,
    date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
  });

  if (!workoutDay) {
    // 2. If not found, create new
    return await WorkoutDay.create(data);
  }

  // 3. If found, update it
  for (const incomingExercise of data.exercises) {
    const existingExercise = workoutDay.exercises.find(ex =>
      ex.exercise.toString() === incomingExercise.exercise
    );

    if (existingExercise) {
      // Exercise exists, add new sets
      for (const incomingSet of incomingExercise.sets) {
        const isDuplicate = existingExercise.sets.some(set =>
          set.setNumber === incomingSet.setNumber
        );
        if (!isDuplicate) {
          existingExercise.sets.push(incomingSet);
        }
      }
    } else {
      // Add new exercise to workout
      workoutDay.exercises.push(incomingExercise);
    }
  }

  await workoutDay.save();
  return workoutDay;
};

export const addNewExercise = async (name, youtubeLink) => {
  if (!name || !youtubeLink) {
    throw new Error('Both name and youtubeLink are required.');
  }

  const exercise = await createExercise({ name, youtubeLink });
  return exercise;
};

export const getExerciseSets = async (exerciseId, userId) => {
  if (!exerciseId || !userId) {
    throw new Error('Exercise ID and User ID are required.');
  }

  const workouts = await findWorkoutDaysByExercise(userId, exerciseId);

  const allSets = [];

  workouts.forEach(day => {
    const exerciseEntry = day.exercises.find(
      ex => ex.exercise._id.toString() === exerciseId
    );
    if (exerciseEntry) {
      exerciseEntry.sets.forEach(set => {
        allSets.push({
          date: day.date,
          setNumber: set.setNumber,
          weight: set.weight,
          reps: set.reps
        });
      });
    }
  });

  // Sort by date then set number
  allSets.sort((a, b) => new Date(a.date) - new Date(b.date) || a.setNumber - b.setNumber);

  return allSets;
};