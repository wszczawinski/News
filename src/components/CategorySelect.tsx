import { ListFilter, FilterX } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categoryQueryOptions } from '@/services/queries';
import { useScreenSize } from '@/hooks/useScreenSize';
import type { Category } from '@/types';

export const CategorySelect = () => {
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();
  const { data: categories } = useSuspenseQuery(categoryQueryOptions());
  const { search } = useRouterState({ select: s => s.location });

  const category = search?.category || 'all';

  const selectCategories: Category[] = [{ id: 0, name: 'Wszystkie aktualności', slug: 'all', position: 0 }, ...categories];

  const handleValueChange = (value: string) => {
    if (value === 'all') {
      navigate({ to: '/' });
    } else {
      navigate({ to: '/news', search: { page: 1, category: value } });
    }
  };

  const handleClear = () => {
    navigate({ to: '/' });
  };

  return (
    <div className='flex flex-row sm:flex-row-reverse gap-2 w-full sm:w-auto sm:pr-1 sm:pt-1'>
      <Select value={category} onValueChange={handleValueChange}>
        {isMobile ? (
          <SelectTrigger size='sm' hideChevron className='relative size-9 p-0 justify-center focus:ring-0 focus:ring-offset-0'>
            <ListFilter size={16} className='text-sky-600' />
            {category !== 'all' && <span className='absolute top-1 right-1 size-2 rounded-full bg-sky-600' />}
          </SelectTrigger>
        ) : (
          <SelectTrigger className='focus:ring-0 focus:ring-offset-0 w-[220px]'>
            <SelectValue placeholder='Wybierz kategorie' />
          </SelectTrigger>
        )}
        <SelectContent>
          {selectCategories?.map(category => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {!isMobile && category !== 'all' && (
        <Button onClick={handleClear} className='animate-fade-in bg-transparent' size={'default'} variant={'outline'}>
          <FilterX size={16} />
        </Button>
      )}
    </div>
  );
};
