import express from 'express';
import * as coachController from '../Controller/coachController.js';
import { authMiddleware, adminMiddleware } from '../../../utils/authMiddleware.js';
const router = express.Router();

router.post('/register', coachController.coachregister);
router.post('/login', coachController.coachlogin);
router.get('/search', coachController.searchCoaches);

router.get('/:id', coachController.getCoach);
router.get('/:id/contact', authMiddleware ,coachController.getContact);
router.put('/updateCoach', authMiddleware, coachController.updateSelfProfile);
router.delete('deleteCoach/:id', adminMiddleware ,coachController.deleteCoach);
router.patch('/:id/verify', authMiddleware, adminMiddleware, coachController.verifyCoach);
router.get('/CoachProfile/:coachId', coachController.getCoachProfile);



export default router;