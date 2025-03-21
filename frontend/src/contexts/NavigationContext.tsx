import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

interface NavigationContextType {
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  headerSolid: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider = ({ children }: NavigationProviderProps): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [headerSolid, setHeaderSolid] = useState<boolean>(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prevOpen) => !prevOpen);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = (): void => {
      try {
        // When the vertical scroll position is greater than 50px, set header to solid
        const isSolid = window.scrollY > 50;
        setHeaderSolid(isSolid);
      } catch (error) {
        console.error('Error in scroll event handler of NavigationContext:', error);
      }
    };

    // Add scroll event listener with passive option for better performance.
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <NavigationContext.Provider
      value={{
        mobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        headerSolid,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};