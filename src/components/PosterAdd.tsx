export const PosterAdd = ({ imageUrl, name, link }: { imageUrl: string; name: string; link?: string }) => {
  return (
    <article className={`w-full`}>
      <p className='sm:font-medium text-sky-600 pb-1 text-center sm:text-right'>{'Reklama'}</p>
      {link ? (
        <a href={link} target='_blank'>
          <img alt={name} className='rounded-md' src={imageUrl} />
        </a>
      ) : (
        <img alt={name} className='rounded-md' src={imageUrl} />
      )}
    </article>
  );
};
