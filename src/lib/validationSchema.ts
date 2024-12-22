import { z } from 'zod';

export const recipeSchema = z.object({
  name: z.string(),
  description: z.string(),
  ingredients: z.array(z.string()),
  timeInMinutes: z.number(),
  instructions: z.array(z.string()),
  tips: z.array(z.string()),
});
