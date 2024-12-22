'use client';

import { useState } from 'react';
import {
  Clock,
  Earth,
  HandPlatter,
  Minus,
  Plus,
  UserRound,
} from 'lucide-react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DietOptions } from '@/components/landing/DietOptions';
import { RecipeConfig } from '@/lib/type';
import { AddIngredients } from '@/components/landing/AddIngredients';
import { MealType } from '@/components/landing/MealType';
import { caveat, protestRevolution } from '@/lib/font';
import { CuisinePicker } from '@/components/landing/CuisinePicker';
import { DayQuality } from '@/components/landing/DayQuality';
import { Emotion } from '@/components/landing/Emotion';
import { EnergyLevel } from '@/components/landing/EnergyLevel';
import { DesiredFeeling } from '@/components/landing/DesiredFeeling';
import { recipeSchema } from '@/lib/validationSchema';
import { generateRecipe } from './action/generateRecipe';

export const maxDuration = 60;

export default function Home() {
  const [recipe, setRecipe] = useState<{
    recipe: z.infer<typeof recipeSchema>;
    image: string;
  } | null>(null);
  const [query, setQuery] = useState<RecipeConfig>({
    mealType: 'Dessert',
    people: 3,
    cuisine: 'Philippines',
    diet: [],
    ingredients: [],
    dayQuality: 'Amazing',
    emotion: 'Happy',
    energyLevel: 'Full of energy',
    desiredFeeling: 'Relaxed',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleCook = async () => {
    setIsLoading(true);
    const recipe = await generateRecipe(query);
    setRecipe(recipe);
    setIsLoading(false);
  };

  return (
    <div className='relative h-[100vh] w-[100vw] overflow-x-hidden bg-[#FFF6EE]'>
      {/* Main Content */}
      {isLoading ? (
        <main className='flex flex-col items-center justify-center px-4 py-10'>
          <h1>Loading...</h1>
        </main>
      ) : recipe ? (
        <main className='flex flex-col items-center justify-center px-4 py-10'>
          <div className='max-w-xl text-center'>
            <h1
              className={cn(
                protestRevolution.className,
                'mb-4 text-2xl font-bold text-[#FF4D00]'
              )}
            >
              Food Mood
            </h1>

            <h1 className={cn('text-4xl font-bold text-[#FF4D00]')}>
              {recipe.recipe.name}
            </h1>
            <p className={cn('text-muted-foreground mb-4 mt-2')}>
              {recipe.recipe.description}
            </p>

            <div className='rounded-lg mb-4 overflow-hidden'>
              <img
                src={`data:image/png;base64,${recipe.image}`}
                className='w-full object-cover max-h-[300px]'
              />
            </div>

            <div className='flex items-center justify-center gap-6 mb-4'>
              <p className='flex items-center gap-2 text-muted-foreground'>
                <Earth className='w-6 h-6' />
                {query.cuisine}
              </p>
              <p className='flex items-center gap-2 text-muted-foreground'>
                <Clock className='w-6 h-6' />
                {recipe.recipe.timeInMinutes} minutes
              </p>
              <p className='flex items-center gap-2 text-muted-foreground'>
                <UserRound className='w-6 h-6' />
                {query.people} People
              </p>
            </div>

            <div className='border border-[#FF4D00] rounded-lg p-4'>
              <h2
                className={cn(caveat.className, 'text-[#FF4D00] text-4xl mb-3')}
              >
                Ingredients
              </h2>
              <ul className='list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-2 text-left'>
                {recipe.recipe.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 151 10'
                className='my-10 w-40 mx-auto'
              >
                <path
                  stroke='#FF6B00'
                  strokeLinecap='round'
                  strokeWidth='2'
                  d='M1 5q6.209-8 12.417 0t12.416 0q6.21-8 12.417 0 6.209 8 12.417 0t12.416 0q6.21 8 12.417 0 6.208-8 12.417 0t12.416 0q6.209-8 12.417 0t12.417 0q6.208-8 12.416 0T150 5'
                ></path>
              </svg>
            </div>

            <div className='mb-10'>
              <h1
                className={cn(caveat.className, 'text-[#FF4D00] text-4xl mb-3')}
              >
                Instructions
              </h1>
              <ol className='list-decimal list-inside grid grid-cols-1 gap-2 text-left '>
                {recipe.recipe.instructions.map((instruction) => (
                  <li key={instruction}>{instruction}</li>
                ))}
              </ol>
            </div>
            <div className='border border-[#FF4D00] rounded-lg p-4'>
              <h1
                className={cn(caveat.className, 'text-[#FF4D00] text-4xl mb-3')}
              >
                Tips
              </h1>
              <ul className='list-disc list-inside grid grid-cols-1 gap-2 text-left '>
                {recipe.recipe.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      ) : (
        <main className='flex flex-col items-center justify-center px-4 py-10'>
          <h1
            className={cn(
              protestRevolution.className,
              'mb-12 text-9xl font-bold text-[#FF4D00]'
            )}
          >
            Food Mood
          </h1>

          <div className='mb-8 text-center'>
            <h2 className='text-xl font-medium'>
              GENERATE A RECIPE WITH AI ACCORDING TO YOUR PREFERENCES AND MOOD
            </h2>
          </div>

          {/* Query Builder */}
          <div className='max-w-3xl text-4xl'>
            <span className='text-black'>It’s been a </span>
            <DayQuality query={query} setQuery={setQuery} />
            <span className='text-black'> day,</span>
            <span className='text-black'> I’m feeling </span>
            <Emotion query={query} setQuery={setQuery} />
            <span className='text-black'>, and I’m </span>
            <EnergyLevel query={query} setQuery={setQuery} />
            <span className='text-black'>, </span>
            <span className='text-black'>
              I’m craving something that makes me feel{' '}
            </span>
            <DesiredFeeling query={query} setQuery={setQuery} />
            <span>.</span>
            <span className='text-black'> I want a </span>
            <MealType query={query} setQuery={setQuery} />
            <span className='text-black'> for </span>
            <div className='relative inline-flex items-center gap-2 group px-2'>
              <Button
                variant='secondary'
                size='icon'
                className='bg-[#FFE8E0] hover:bg-[#FFD1C0] opacity-0 disabled:opacity-0 group-hover:opacity-100 absolute left-[-36px] z-10 transition-all duration-300'
                onClick={() => setQuery({ ...query, people: query.people - 1 })}
                disabled={query.people === 1}
              >
                <Minus className='h-5 w-5 text-[#FF4D00]' />
              </Button>
              <span className={cn(caveat.className, 'text-[#FF4D00]')}>
                {query.people} people
              </span>
              <Button
                variant='secondary'
                size='icon'
                className='bg-[#FFE8E0] hover:bg-[#FFD1C0] opacity-0 disabled:opacity-0 group-hover:opacity-100 absolute right-[-36px] z-10 transition-all duration-300'
                onClick={() => setQuery({ ...query, people: query.people + 1 })}
              >
                <Plus className='h-5 w-5 text-[#FF4D00]' />
              </Button>
            </div>
            <span className='text-black'> from </span>
            <CuisinePicker query={query} setQuery={setQuery} />
            <span className='text-black'>.</span>
          </div>

          {/* Action Buttons */}
          <div className='mt-8 gap-4 max-w-3xl w-full space-y-4'>
            <DietOptions query={query} setQuery={setQuery} />
            <AddIngredients query={query} setQuery={setQuery} />
          </div>

          {/* Cook Button */}
          <Button
            onClick={handleCook}
            className='mt-20 rounded-full bg-[#FF4D00] px-8 py-6 text-xl font-bold text-white hover:bg-[#FF4D00]/90'
          >
            LET&apos;S COOK <HandPlatter className=' h-6 w-6' />
          </Button>
        </main>
      )}
    </div>
  );
}
