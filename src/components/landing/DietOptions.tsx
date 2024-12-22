import React, { Dispatch, SetStateAction } from 'react';
import { Check, SlidersHorizontal } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { dietOptions } from '@/lib/const';
import { RecipeConfig } from '@/lib/type';

export function DietOptions({
  query,
  setQuery,
}: {
  query: RecipeConfig;
  setQuery: Dispatch<SetStateAction<RecipeConfig>>;
}) {
  return (
    <div className='flex justify-start gap-6 items-center'>
      <Popover>
        <PopoverTrigger asChild>
          <button className='border border-[#FF4D00] text-[#FF4D00] hover:bg-[#FF4D00]/10 flex justify-center items-center bg-white rounded-md px-4 py-2'>
            <SlidersHorizontal className='h-5 w-5' />
          </button>
        </PopoverTrigger>
        <PopoverContent>
          {dietOptions.map((item) => (
            <Button
              key={item}
              className='w-full justify-between'
              variant='ghost'
              onClick={() => {
                setQuery((prev) => {
                  const currentDiet = prev.diet || [];
                  const isSelected = currentDiet.includes(item);

                  if (isSelected) {
                    return {
                      ...prev,
                      diet: currentDiet.filter((diet) => diet !== item),
                    };
                  } else {
                    let newDiet = [...currentDiet];
                    if (item === 'Vegan') {
                      newDiet = newDiet.filter((diet) => diet !== 'Vegetarian');
                    } else if (item === 'Vegetarian') {
                      newDiet = newDiet.filter((diet) => diet !== 'Vegan');
                    }
                    return {
                      ...prev,
                      diet: [...newDiet, item],
                    };
                  }
                });
              }}
            >
              {item}
              {query.diet.includes(item) ? <Check className='w-4 h-4' /> : null}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
      <div className='flex items-center gap-2'>
        {query.diet.map((diet) => (
          <span
            key={diet}
            className='bg-[#FF4D00] text-white font-medium rounded-md px-3 py-2'
          >
            {diet}
          </span>
        ))}
      </div>
    </div>
  );
}
