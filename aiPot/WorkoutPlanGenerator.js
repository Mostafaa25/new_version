import Together from "together-ai";

const together = new Together({ 
  apiKey: '91bebf5745ef05b2c1f63eb9661384fc03ff8bbe3c36a9fb084815d001fd3c99' 
});

const KNOWN_EXERCISES = [
  "Squat",
  "Deadlift",
  "Bench Press",
  "Pull-Up",
  "Overhead Press",
  "Barbell Row",
  "Dumbbell Curl",
  "Tricep Dips",
  "Plank",
  "Lunges",
  "Lat Pulldown",
  "Leg Press",
  "Chest Fly",
  "Cable Tricep Pushdown",
  "Hammer Curl",
  "Hip Thrust",
  "Seated Row",
  "Side Lateral Raise",
  "Russian Twist",
  "Mountain Climbers"
];


async function MakeWorkoutPlan(userData) {
  const splitType = determineSplitType(userData.workout_days);

  const prompt = `
  Create a detailed workout plan for a ${splitType} split, ${userData.workout_days} days per week.
  The user's goals are: ${userData.goal || 'general fitness'}.
  
  Requirements:
  1. Only use these exercises: ${KNOWN_EXERCISES.join(', ')}.
  2. Return ONLY valid JSON (no additional text) matching this schema:
     {
       "planName": "string",
       "description": "string",
       "weeklySchedule": [
         {
           "day": "string (e.g., Monday)",
           "muscleGroups": "string",
           "exercises": [
             {
               "name": "string",
               "sets": 3-4,
               "reps": "string",
               "notes": "string"
             }
           ]
         }
       ]
     }
  3. DO NOT include markdown formatting or additional explanations.
  `;

  try {
    const response = await together.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from API");

    // Clean and parse the JSON
    const cleanedContent = content.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanedContent);

  } catch (error) {
    console.error("Workout plan error:", error);
    return { 
      error: "Failed to generate workout plan",
      details: error.message 
    };
  }
}

function determineSplitType(workout_days) {
  const splits = {
    2: 'Upper/Lower',
    3: 'Push/Pull/Legs',
    4: 'Bro Split',
    5: 'Pro Split'
  };
  return splits[workout_days] || 'Custom Split';
}

export { MakeWorkoutPlan };