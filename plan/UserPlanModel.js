import mongoose from   'mongoose';
const mealItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
});

const mealSchema = new mongoose.Schema({
  description: String,
  items: [mealItemSchema],
  total: {
    calories: Number,
    carbs: Number,
    protein: Number,
    fat: Number
  }
});

const dietPlanSchema = new mongoose.Schema({
  planName: String,
  meals: {
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    snacks: mealSchema
  },
  dailyTotals: {
    calories: Number,
    carbs: Number,
    protein: Number,
    fat: Number
  },
  notes: String
});

const exerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: String,
  notes: String
});

const workoutDaySchema = new mongoose.Schema({
  day: String,
  muscleGroups: String,
  exercises: [exerciseSchema]
});

const workoutPlanSchema = new mongoose.Schema({
  planName: String,
  description: String,
  weeklySchedule: [workoutDaySchema]
});

const userPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  dietPlan: dietPlanSchema,
  workoutPlan: workoutPlanSchema
}, {
  timestamps: true
});

export default mongoose.model('UserPlan', userPlanSchema);

