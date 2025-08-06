import * as React from 'react';

type PluginLogoProps = {
  alt: string;
  className?: string;
  src: string;
  height?: string | number;
};

export function PluginLogo({ alt, className, src, height }: PluginLogoProps): React.ReactElement {
<<<<<<< HEAD
  // @ts-ignore - react doesn't know about loading attr.
=======
>>>>>>> v12.1.0
  return <img src={src} className={className} alt={alt} loading="lazy" height={height} />;
}
