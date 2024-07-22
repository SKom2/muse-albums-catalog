import { createContext, ReactNode, useContext, useEffect } from 'react';
import useThemeStore, { ThemeState } from '@/services/zustand/theme/theme.store.ts';

const ThemeContext = createContext<ThemeState | undefined>(undefined);

export const ThemeContextProvider = ({ children } : { children: ReactNode}) => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};