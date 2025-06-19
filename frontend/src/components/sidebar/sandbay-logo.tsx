'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface SandbayLogoProps {
  variant?: 'blue' | 'white' | 'auto';
  size?: number;
}

export function SandbayLogo({ variant = 'auto', size = 24 }: SandbayLogoProps
) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mount, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const getSvgPath = () => {
    switch (variant) {
      case 'blue':
        return '/sandbay-symbol-blue.svg';
      case 'white':
        return '/sandbay-symbol-white.svg';
      case 'auto':
      default:
        return mounted && theme === 'dark'
          ? '/sandbay-symbol-white.svg'
          : '/sandbay-symbol-blue.svg';
    }
  };

  return (
    <div className="flex h-6 w-6 items-center justify-center flex-shrink-0">
      <Image
        src={getSvgPath()}
        alt="Sandbay"
        width={size}
        height={size}
        // className={`${mounted && theme === 'dark' ? 'invert' : ''}`}
      />
    </div>
  );
}
