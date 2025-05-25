import express from 'express';
import { generatePlan } from './planController.js';
import {authMiddleware} from '../utils/authMiddleware.js'
import {createUserPlanController , getUserPlanController} from './planController.js'
const router = express.Router();

router.post('/generate-plan',authMiddleware ,generatePlan);
router.post('/createUserPlan', authMiddleware, createUserPlanController);
router.get('/user-plan', authMiddleware, getUserPlanController);



export default router;
