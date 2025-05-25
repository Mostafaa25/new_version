import { generateUserPlan } from './planService.js';
import { createUserPlanService } from './planService.js';
import { getUserPlanService } from './planService.js';


export const generatePlan = async (req, res) => {
  const userId = req.user._id;
  const userData = req.body;

  try {
    const result = await generateUserPlan(userId, userData);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(result);
    }
  } catch (error) {
    console.error("Error handling /generate-plan:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


export const createUserPlanController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { dietPlan, workoutPlan } = req.body;

    if (!dietPlan || typeof dietPlan !== 'object' || !dietPlan.planName) {
      return res.status(400).json({ error: 'Invalid or missing dietPlan' });
    }

    if (!workoutPlan || typeof workoutPlan !== 'object' || !workoutPlan.planName) {
      return res.status(400).json({ error: 'Invalid or missing workoutPlan' });
    }

    const newPlan = await createUserPlanService(userId, dietPlan, workoutPlan);

    res.status(201).json({ message: 'User plan created successfully', plan: newPlan });
  } catch (error) {
    console.error('Create user plan error:', error.message);
    res.status(500).json({ error: 'Server error creating user plan' });
  }
};


export const getUserPlanController = async (req, res) => {
  const userId = req.user._id;

  try {
    const plan = await getUserPlanService(userId);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'No plan found for this user.',
      });
    }

    return res.status(200).json({
      success: true,
      plan,
    });
  } catch (error) {
    console.error('Error retrieving user plan:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};