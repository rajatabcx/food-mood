import React, { Dispatch, SetStateAction, useState } from 'react';
import { Check } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { RecipeConfig } from '@/lib/type';
import { caveat } from '@/lib/font';
import { dayQualities } from '@/lib/const';
import { Button } from '@/components/ui/button';

export function DayQuality({
  query,
  setQuery,
}: {
  query: RecipeConfig;
  setQuery: Dispatch<SetStateAction<RecipeConfig>>;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span className={cn(caveat.className, 'text-[#FF4D00] cursor-pointer')}>
          {query.dayQuality}
        </span>
      </PopoverTrigger>
      <PopoverContent className='max-h-[200px] overflow-y-auto'>
        {dayQualities.map((item) => (
          <Button
            key={item}
            className='w-full justify-between ring-0 focus:ring-0 outline-none border-none focus:outline-none focus:border-none'
            variant='ghost'
            onClick={() => {
              setQuery((prev) => ({ ...prev, dayQuality: item }));
              setOpen(false);
            }}
          >
            {item}
            {query.dayQuality === item ? <Check className='w-4 h-4' /> : null}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
