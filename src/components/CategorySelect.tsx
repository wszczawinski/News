import { FilterX } from 'lucide-react';
import { useNavigate, useRouterState } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const POST_CATEGORIES = [
  {
    value: 'all',
    label: 'Wszystkie aktualności',
  },
  {
    value: 'powiat',
    label: 'Wieści z Powiatu',
  },
  {
    value: 'gmina',
    label: 'Samorząd - Gmina',
  },
  {
    value: 'lubawa',
    label: 'Samorząd - Lubawa',
  },
  {
    value: 'plytoteka',
    label: 'Płytoteka',
  },
  {
    value: 'kolarstwo',
    label: 'Kolarstwo',
  },
  {
    value: 'motor',
    label: 'Motor Lubawa',
  },
  {
    value: 'glos_s_jana',
    label: 'Głos św. Jana',
  },
  {
    value: 'halowka_g',
    label: 'Halówka Gminna',
  },
  {
    value: 'halowka_m',
    label: 'Halówka Miejska',
  },
  {
    value: 'wzgorza',
    label: 'Z siódmego wzgórza',
  },
  {
    value: 'constract',
    label: 'KS Constract',
  },
];

export const CategorySelect = () => {
  const navigate = useNavigate();
  const { search } = useRouterState({ select: s => s.location });
  const category = search?.category || 'all';

  return (
    <div className='flex flex-row-reverse sm:flex-row gap-2 w-full sm:w-auto'>
      {category !== 'all' && (
        <Button
          className='animate-fade-in'
          size={'sm'}
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
      <Select
        defaultValue={category || 'all'}
        onValueChange={value =>
          value === 'all'
            ? navigate({
                to: '/',
              })
            : navigate({
                to: '/news',
                search: { category: value, page: 1 },
              })
        }
      >
        <SelectTrigger className='flex-1 focus:ring-0 focus:ring-offset-0 w-full sm:w-[220px]'>
          <SelectValue placeholder='Wybierz kategorie' />
        </SelectTrigger>
        <SelectContent>
          {POST_CATEGORIES?.map(category => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
