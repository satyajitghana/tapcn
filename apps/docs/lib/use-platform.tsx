'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

type Platform = 'web' | 'native';

const PlatformContext = createContext<{
  platform: Platform;
  setPlatform: (platform: Platform) => void;
}>({
  platform: 'web',
  setPlatform: () => {},
});

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatformState] = useState<Platform>('web');

  useEffect(() => {
    const saved = Cookies.get('tapcn.platform') as Platform;
    if (saved) setPlatformState(saved);
  }, []);

  const setPlatform = (newPlatform: Platform) => {
    setPlatformState(newPlatform);
    Cookies.set('tapcn.platform', newPlatform, { expires: 365 });
  };

  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
}

export const usePlatform = () => useContext(PlatformContext);
