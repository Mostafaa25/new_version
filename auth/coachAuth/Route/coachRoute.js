import express from 'express';
import * as coachController from '../Controller/coachController.js';
import { authMiddleware, adminMiddleware } from '../../../utils/authMiddleware.js';
const router = express.Router();
router.post("/login" , coachController.coachlogin)
router.post("/register" , coachController.coachregister)

router.post("/logout", authMiddleware, coachController.coachLogout)

router.get('/coachprofile', authMiddleware, coachController.getcoachProfile); // ✅ Place this early
router.get('/search', coachController.searchCoaches); // Add search route
router.get('/CoachProfile/:coachId', coachController.getCoachProfile);
router.get('/GetAll/Coaches', coachController.getAllCoaches);

// Then the dynamic routes
router.get('/:id', coachController.getCoach);
router.get('/:id/contact', authMiddleware ,coachController.getContact);
router.put('/updateCoach', authMiddleware, coachController.updateSelfProfile);
router.delete('deleteCoach/:id', adminMiddleware ,coachController.deleteCoach);
router.patch('/:id/verify', authMiddleware, adminMiddleware, coachController.verifyCoach);



export default router;