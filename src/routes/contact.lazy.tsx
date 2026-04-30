import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Copy } from 'lucide-react';

export const Route = createLazyFileRoute('/contact')({
  component: RouteComponent,
});

const EMAIL = 'e-lubawa@e-lubawa.pl';

function RouteComponent() {
  return (
    <CardContent className='space-y-4 sm:bg-card sm:shadow-sm sm:rounded-sm sm:border sm:p-4 sm:min-h-64'>
      <CardTitle className='font-normal text-lg leading-5 text-sky-600 line-clamp-3 sm:line-clamp-2'>Kontakt</CardTitle>
      <CardDescription>
        <p className='text-md text-sky-600'>Administrator:</p>
        <div className='flex items-center gap-4'>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Button
            variant='outline'
            size='icon'
            title='Kopiuj adres e-mail'
            onClick={() => navigator.clipboard.writeText(EMAIL)}
            className='text-muted-foreground hover:text-sky-500 transition-colors cursor-pointer'
          >
            <Copy size={14} />
          </Button>
        </div>
      </CardDescription>
    </CardContent>
  );
}
