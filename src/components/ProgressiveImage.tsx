import React, { useState, useCallback, type CSSProperties } from 'react';

interface ProgressiveImageProps {
  src: string;
  link?: string;
  placeholderSrc: string;
  width: number;
  height: number;
  alt?: string;
  className?: string;
}

const OptionalLink = ({ link, children }: { link?: string; children: React.ReactNode }) =>
  link ? (
    <a href={link} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  ) : (
    <>{children}</>
  );

export const ProgressiveImage = ({ src, link, placeholderSrc, width, height, alt = '', className = '' }: ProgressiveImageProps) => {
  const [loaded, setLoaded] = useState(false);

  const imgRef = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) {
      setLoaded(true);
      img.style.opacity = '1';
    }
  }, []);

  const containerStyle: CSSProperties = {
    ['--ar' as string]: width / height,
    maxWidth: `${width}px`,
    backgroundImage: `url(${placeholderSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: loaded ? undefined : 'blur(1px)',
    transition: 'filter 0.5s ease',
  };

  return (
    <div className={`w-full aspect-[var(--ar)] overflow-hidden relative ${className}`} style={containerStyle}>
      <OptionalLink link={link}>
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className='w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500'
          onLoad={e => {
            setLoaded(true);
            e.currentTarget.style.opacity = '1';
          }}
        />
      </OptionalLink>
    </div>
  );
};
