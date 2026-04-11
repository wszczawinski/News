import { type ReactNode } from 'react';

const OptionalLink = ({ link, children }: { link?: string; children: ReactNode }) =>
  link ? (
    <a href={link} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  ) : (
    <>{children}</>
  );

export const PosterAdd = ({ imageUrl, name, link }: { imageUrl: string; name: string; link?: string }) => {
  return (
    <article className={`w-full`}>
      <p className='sm:font-medium text-sky-600 pb-1 text-center sm:text-right'>{'Reklama'}</p>
      <OptionalLink link={link}>
        <img alt={name} className='rounded-md' src={imageUrl} />
      </OptionalLink>
    </article>
  );
};
