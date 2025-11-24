import { FilterX } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categoryQueryOptions } from '@/services/queries';

export const CategorySelect = () => {
  const navigate = useNavigate();

  const { search } = useRouterState({ select: s => s.location });
  const category = search?.category || 'wszystkie';

  const { data: categories } = useSuspenseQuery(categoryQueryOptions());

  return (
    <div className='flex flex-row gap-2 w-full sm:w-auto sm:pr-1 sm:pt-1'>
      <Select
        defaultValue={category || 'wszystkie'}
        onValueChange={value =>
          value === 'wszystkie'
            ? navigate({
                to: '/',
              })
            : navigate({
                to: '/news',
                search: { page: 1, category: value },
              })
        }
      >
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
        <Button
          className='animate-fade-in'
          size={'default'}
          variant={'outline'}
          onClick={() =>
            navigate({
              to: '/',
            })
          }
        >
          <FilterX size={16} />
        </Button>
      )}
    </div>
  );
};
