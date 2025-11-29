import { useState, useEffect } from 'react';

interface ProgressiveImageProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  placeholderSrc: string;
  src: string;
}

export const ProgressiveImage = ({ placeholderSrc, src, className, ...props }: ProgressiveImageProps) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImgSrc(src);
  }, [src]);

  const customClass = placeholderSrc && imgSrc === placeholderSrc ? 'scale-101 blur-sm' : 'scale-100 blur-none';

  return (
    <div className={`bg-no-repeat bg-cover ${className}`}>
      <img
        {...{ src: imgSrc, ...props }}
        alt={props.alt || ''}
        className={`duration-700 ease-in-out ${className} ${customClass}`}
        loading='lazy'
      />
    </div>
  );
};
