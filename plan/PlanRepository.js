import User from "../auth/userAuth/model/userModel.js";
import Plan from "../plan/UserPlanModel.js";

/**
 * Find a user by their ID
 */
export const findUserById = async (userId) => {
  return await User.findById(userId);
};

/**
 * Update basic user profile fields
 */
export const updateUserData = async (user, userData) => {
  user.age = userData.age || user.age;
  user.weight = userData.weight || user.weight;
  user.height = userData.height || user.height;
  user.goal = userData.goal || user.goal;
  user.workout_days = userData.workout_days || user.workout_days;

  return await user.save();
};

/**
 * Create a new plan
 */
export const createPlan = async (data) => {
  return await Plan.create(data);
};


/**
 * Update existing plan or insert if not found
 */
export const updatePlan = async (userId, data) => {
  return await Plan.findOneAndUpdate({ userId }, data, {
    new: true,
    upsert: true,
  });
};

export const saveUserPlan = async (userPlanData) => {
  const newPlan = new Plan(userPlanData);
  return await newPlan.save();
};


export const getPlanByUserId = async (userId) => {
  return await Plan.find({ userId });
};
