import express from 'express';
const router = express.Router();
import * as authController from '../controller/userAuthControlller.js';
import { authMiddleware } from '../../../utils/authMiddleware.js';


router.route('/Register')
            .post(authController.Register)

router.route('/login')
            .post(authController.login)

router.get('/UserProfile', authMiddleware ,authController.getUserProfile);


export default router