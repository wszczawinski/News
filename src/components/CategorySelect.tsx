import { FilterX } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categoryQueryOptions } from '@/services/queries';

export const CategorySelect = () => {
  const navigate = useNavigate();
  const { data: categories } = useSuspenseQuery(categoryQueryOptions());
  const { search } = useRouterState({ select: s => s.location });

  const category = search?.category || 'wszystkie';

  const handleValueChange = (value: string) => {
    if (value === 'wszystkie') {
      navigate({
        to: '/',
      });
    } else {
      navigate({
        to: '/news',
        search: { page: 1, category: value },
      });
    }
  };

  const handleClear = () => {
    navigate({
      to: '/',
    });
  };

  return (
    <div className='flex flex-row sm:flex-row-reverse gap-2 w-full sm:w-auto sm:pr-1 sm:pt-1'>
      <Select value={category} onValueChange={handleValueChange}>
        <SelectTrigger className='flex-1 focus:ring-0 focus:ring-offset-0 w-full sm:w-[220px]'>
          <SelectValue placeholder='Wybierz kategorie' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key={'wszystkie'} value={'wszystkie'}>
            Wszystkie aktualności
          </SelectItem>
          {categories?.map(category => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {category !== 'wszystkie' && (
        <Button onClick={handleClear} className='animate-fade-in bg-transparent' size={'default'} variant={'outline'}>
          <FilterX size={16} />
        </Button>
      )}
    </div>
  );
};
