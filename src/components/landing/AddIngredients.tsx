import React, { Dispatch, SetStateAction } from 'react';
import { X, Check } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RecipeConfig } from '@/lib/type';
import { ingredients } from '@/lib/const';

export function AddIngredients({
  query,
  setQuery,
}: {
  query: RecipeConfig;
  setQuery: Dispatch<SetStateAction<RecipeConfig>>;
}) {
  return (
    <div className='flex items-center gap-2 flex-wrap'>
      <Select
        onValueChange={(val) => {
          setQuery((prev) => ({
            ...prev,
            ingredients: prev.ingredients.includes(val)
              ? prev.ingredients.filter((ing) => ing !== val)
              : [...prev.ingredients, val],
          }));
        }}
        value=''
      >
        <SelectTrigger className='w-[280px] border border-[#FF4D00] border-t-0 border-l-0 border-r-0 focus:outline-none focus:ring-0'>
          <SelectValue
            placeholder='Search Ingredients'
            className='text-[#FF4D00]'
          />
        </SelectTrigger>
        <SelectContent>
          {ingredients.map((i) => (
            <SelectItem key={i.id} value={i.name}>
              <div className='flex items-center justify-between gap-2'>
                {i.name}{' '}
                {query.ingredients.includes(i.name) ? (
                  <Check className='w-4 h-4' />
                ) : null}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className='flex items-center gap-2 flex-wrap'>
        {query.ingredients.map((ingredient) => (
          <div
            className='bg-[#FF4D00] text-white font-medium rounded-md px-3 py-2 flex items-center justify-between gap-2'
            key={ingredient}
          >
            {ingredient}
            <button
              className='rounded-full p-1 bg-[#FFE8E0] hover:bg-[#FFD1C0] text-[#FF4D00]'
              onClick={() => {
                setQuery((prev) => ({
                  ...prev,
                  ingredients: prev.ingredients.filter(
                    (ing) => ing !== ingredient
                  ),
                }));
              }}
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
