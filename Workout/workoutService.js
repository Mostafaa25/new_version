import WorkoutDay from '../Workout/WorkoutDayModel.js';
import Exercise from '../Workout/ExerciseModel.js';
import {createExercise} from "./workoutRepository.js"
import {findWorkoutDaysByExercise} from "./workoutRepository.js"

export const createWorkoutDay = async (data, userid) => {
  const userId = userid;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of the day

  data.user = userId;

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
      // Exercise exists, just add the new sets
      existingExercise.sets.push(...incomingExercise.sets);
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

  // جلب جميع أيام التمرين
  const workouts = await findWorkoutDaysByExercise(userId, exerciseId);
  
  // تجميع كل التمارين حسب التاريخ
  const workoutHistory = workouts.map(workout => {
    const exerciseData = workout.exercises.find(ex => 
      ex.exercise._id.toString() === exerciseId
    );

    if (exerciseData) {
      return {
        workoutId: workout._id,
        date: workout.date,
        exerciseName: exerciseData.exercise.name,
        youtubeLink: exerciseData.exercise.youtubeLink,
        sets: exerciseData.sets.map(set => ({
          setNumber: set.setNumber,
          weight: set.weight,
          reps: set.reps,
          setId: set._id
        }))
      };
    }
    return null;
  }).filter(workout => workout !== null);

  return {
    exerciseHistory: workoutHistory,
    totalWorkouts: workoutHistory.length,
    totalSets: workoutHistory.reduce((sum, workout) => sum + workout.sets.length, 0)
  };
};

export const getUserWorkouts = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required');
  }
  return await WorkoutDay.find({ user: userId })
    .populate('exercises.exercise')
    .sort({ date: -1 });
};

export const getAllExercises = async () => {
  return await Exercise.getAllExercises();
};