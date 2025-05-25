import { MakeDietPlan } from '../aiPot/DietPlanGenerator.js';
import { MakeWorkoutPlan } from '../aiPot/WorkoutPlanGenerator.js';
import {
  findUserById,
  updateUserData,
  saveUserPlan,
} from './PlanRepository.js';

import { getPlanByUserId } from './PlanRepository.js';



export const generatePlans = async (userData) => {
  try {
    const [dietPlan, workoutPlan] = await Promise.all([
      MakeDietPlan(userData),
      MakeWorkoutPlan(userData),
    ]);

    if (dietPlan.error || workoutPlan.error) {
      throw new Error(dietPlan.error || workoutPlan.error);
    }

    return {
      success: true,
      dietPlan,
      workoutPlan,
    };
  } catch (error) {
    console.error("Generation error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const generateUserPlan = async (userId, userData) => {
  const user = await findUserById(userId);
  if (!user) throw new Error('User not found');

  // Update the user's physical data
  await updateUserData(user, userData);

  // Generate the actual plan
  const result = await generatePlans(userData);

  // Save to DB only if successful
  if (result.success) {
    await createUserPlanService(userId, result.dietPlan, result.workoutPlan);
  }

  return result;
};


export const createUserPlanService = async (userId, dietPlan, workoutPlan) => {
  const userPlanData = {
    userId,
    dietPlan,
    workoutPlan,
  };

  return await saveUserPlan(userPlanData);
};


export const getUserPlanService = async (userId) => {
  return await getPlanByUserId(userId);
};
