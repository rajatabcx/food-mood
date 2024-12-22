'use server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

import { RecipeConfig } from '@/lib/type';
import { recipeSchema } from '@/lib/validationSchema';

export const generateRecipe = async (query: RecipeConfig) => {
  const { object } = await generateObject({
    model: openai('gpt-4o'),
    prompt: `You are an expert chef specializing in creating personalized recipes based on user preferences.
     Use the provided information, including meal type, cuisine, dietary restrictions, available ingredients, and the user’s mood, 
     to craft a unique recipe. The recipe should be clear, easy to follow, 
     and cater to the user's emotional and energy state. Make sure the recipe reflects the cuisine type and adheres to dietary restrictions.
         Based on the following inputs, generate a unique recipe:

        - Meal Type: ${query.mealType}
        - Servings: ${query.people} people
        - Cuisine: ${query.cuisine}
        - Dietary Preferences: ${query.diet ?? 'No restrictions'}
        - Available Ingredients: ${
          query.ingredients.length > 0
            ? query.ingredients.join(', ')
            : 'No Preference, use anything you like'
        }
        - Mood and Context:
            - User had a ${query.dayQuality} day.
            - User is feeling ${query.emotion}.
            - User has a ${query.energyLevel} energy level.
            - User wants the recipe to make them feel ${query.desiredFeeling}.
            Provide a recipe with these details
     `,

    schema: recipeSchema,
  });

  return object;
};
