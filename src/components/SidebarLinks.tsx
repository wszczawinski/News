import dziekanat from '@/images/links/dziekanat.jpg';
import sanktuarium from '@/images/links/sanktuarium.jpg';
import gmina from '@/images/links/gmina.jpg';

export const SidebarLinks = () => {
  const links = [
    { link: 'http://lipy.e-lubawa.pl/', src: sanktuarium, alt: 'Sanktuarium' },
    { link: 'http://gminalubawa.pl/', src: gmina, alt: 'Gmina' },
    { link: 'http://www.dekanat.gminalubawa.pl/', src: dziekanat, alt: 'Dziekanat' },
  ];

  return (
    <div className='w-full flex flex-col gap-1'>
      <p className='sm:font-medium text-sky-600 text-left sm:text-right'>Polecamy</p>

      {links.map((item, index) => (
        <a key={index} href={item.link} target='_blank' rel='noreferrer' className='relative overflow-hidden h-14 w-full group'>
          <img
            src={item.src}
            alt={item.alt}
            className='absolute inset-0 w-full h-[200%] object-cover transition-transform duration-300 group-hover:-translate-y-1/2'
          />
        </a>
      ))}
    </div>
  );
};
