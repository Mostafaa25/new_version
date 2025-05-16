import express from 'express';
import { createWorkoutDay, getWorkoutDays } from './workoutController.js';
import Exercise from "../Workout/ExerciseModel.js"
import {createExercise} from "../Workout/workoutController.js"
import {getExerciseHistory} from "./workoutController.js"
import {authMiddleware , adminMiddleware} from '../utils/authMiddleware.js'

const router = express.Router();

router.post('/', createWorkoutDay);
router.get('/:userId', getWorkoutDays);

router.get('/exercise/:exerciseId', authMiddleware,getExerciseHistory);

// Create new exercise (e.g., Squats with a YouTube link)
router.post('/AddNewExercise', authMiddleware,adminMiddleware,createExercise);

router.post('/day', authMiddleware,createWorkoutDay);

// Temporary route to seed 20 exercises
router.post('/seed-exercises', async (req, res) => {
  try {
    await Exercise.insertMany([
      { name: "Squat", youtubeLink: "https://youtube.com/shorts/S9iWwaqbD3Q?si=Cmx7-Z85tuNl63vW" },
      { name: "Deadlift", youtubeLink: "https://youtu.be/AweC3UaM14o?si=fHNo4IWOrWuhw7zj" },
      { name: "Bench Press", youtubeLink: "https://youtube.com/shorts/uzAknL5gKaw?si=0c6yvKnrspMkDsDC" },
      { name: "Pull-Up", youtubeLink: "https://youtube.com/shorts/ZPG8OsHKXLw?si=i5C6Smsgdjk5tzoc" },
      { name: "Overhead Press", youtubeLink: "https://youtube.com/shorts/k6tzKisR3NY?si=dPPcOizIReBTt_yt" },
      { name: "Barbell Row", youtubeLink: "https://youtube.com/shorts/Nqh7q3zDCoQ?si=BjbWVpScyb3VZesg" },
      { name: "Dumbbell Curl", youtubeLink: "https://youtube.com/shorts/_aoad2yuP5w?si=9B90oHiGarsmtSW6" },
      { name: "Tricep Dips", youtubeLink: "https://youtube.com/shorts/8Wqw9vjfvzY?si=HPbsTpPjl2zLjTjq" },
      { name: "Plank", youtubeLink: "https://youtube.com/shorts/v25dawSzRTM?si=s11Wh8inWzpQT-V7" },
      { name: "Lunges", youtubeLink: "https://youtu.be/Pbmj6xPo-Hw?si=3CFt3EfF0ukNFMYQ" },
      { name: "Lat Pulldown", youtubeLink: "https://youtube.com/shorts/bNmvKpJSWKM?si=BdX2M9pGOc1DKIyV" },
      { name: "Leg Press", youtubeLink: "https://youtube.com/shorts/EotSw18oR9w?si=TKthouMW4y0cl5pl" },
      { name: "Chest Fly", youtubeLink: "https://youtu.be/eGjt4lk6g34?si=ea6YMdfoX3_2Pk87" },
      { name: "Cable Tricep Pushdown", youtubeLink: "https://youtube.com/shorts/1FjkhpZsaxc?si=UwxLCBXC99HkrVeK" },
      { name: "Hammer Curl", youtubeLink: "https://youtube.com/shorts/vm0zV_WQerE?si=ro2dNDGuxohnB7Ot" },
      { name: "Hip Thrust", youtubeLink: "https://youtu.be/5S8SApGU_Lk?si=ill58qqb7wQWhg_c" },
      { name: "Seated Row", youtubeLink: "https://youtube.com/shorts/z7C7PxVDAD0?si=_64fIEeZWQRA-5gx" },
      { name: "Side Lateral Raise", youtubeLink: "https://youtube.com/shorts/dybxZJaWxCY?si=GkJIGmcq8ME9XVfX" },
      { name: "Russian Twist", youtubeLink: "https://youtube.com/shorts/2KKNrUUwOw8?si=dqD7GXNKwGmnj0iE" },
      { name: "Mountain Climbers", youtubeLink: "https://youtube.com/shorts/3ans8fNL1Z8?si=3dN8rzCExUkXzCTO" }
    ]);
    res.status(201).json({ message: "Exercises seeded successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
