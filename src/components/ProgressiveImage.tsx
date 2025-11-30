import { useState } from 'react';

interface ProgressiveImageProps {
  src: string;
  placeholderSrc: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}

export const ProgressiveImage = ({ src, placeholderSrc, width, height, alt = '', className = '' }: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const containerStyle: React.CSSProperties = {
    ['--ar' as string]: width / height,
    maxWidth: `${width}px`,
    backgroundImage: `url(${placeholderSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: loaded ? 'blur(0px)' : 'blur(2px)',
    transition: 'filter 0.5s ease',
  };

  return (
    <div className={`w-full aspect-[var(--ar)] overflow-hidden relative ${className}`} style={containerStyle}>
      <img
        src={src}
        alt={alt}
        className='w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500'
        onLoad={e => {
          setLoaded(true);
          e.currentTarget.style.opacity = '1';
        }}
      />
    </div>
  );
};
