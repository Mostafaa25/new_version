import Together from "together-ai";

const together = new Together({ 
  apiKey: '91bebf5745ef05b2c1f63eb9661384fc03ff8bbe3c36a9fb084815d001fd3c99' 
});

async function MakeDietPlan(userData) {
  const { age, weight, height, goal, workout_days } = userData;

  const prompt = `
  Create a detailed Egyptian diet plan in Arabic with:
  - Age: ${age} years
  - Weight: ${weight} kg
  - Height: ${height} cm
  - Goal: ${goal}
  - Workout days: ${workout_days}/week

  Requirements:
  1. Use common Egyptian foods (foul, taameya, etc.)
  2. Include exact quantities in grams for each item
  3. Include macros (carbs, protein, fat) for each meal
  4. Return ONLY valid JSON in this format:
     {
       "planName": "string",
       "meals": {
         "breakfast": {
           "description": "string",
           "items": [
             {
               "name": "string",
               "quantity": "number (grams)",
               "calories": "number",
               "carbs": "number (g)",
               "protein": "number (g)",
               "fat": "number (g)"
             }
           ],
           "total": {
             "calories": "number",
             "carbs": "number (g)",
             "protein": "number (g)",
             "fat": "number (g)"
           }
         },
         // repeat for lunch, dinner, snacks
       },
       "dailyTotals": {
         "calories": "number",
         "carbs": "number (g)",
         "protein": "number (g)",
         "fat": "number (g)"
       },
       "notes": "string"
     }
  5. Write in Egyptian Arabic dialect
  6. DO NOT include markdown formatting
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
    console.error("Diet plan error:", error);
    return { 
      error: "فشل إنشاء الخطة الغذائية",
      details: error.message 
    };
  }
}

export { MakeDietPlan };