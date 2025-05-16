import express from 'express';
import { generatePlan } from './planController.js';
import {authMiddleware} from '../utils/authMiddleware.js'
import {createUserPlanController} from './planController.js'
const router = express.Router();

router.post('/generate-plan',authMiddleware ,generatePlan);
router.post('/createUserPlan', authMiddleware, createUserPlanController);


export default router;
