import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ThemeId } from '../types';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  availableThemes: { id: ThemeId; name: string; description: string; colors: string[] }[];
}

const AVAILABLE_THEMES: { id: ThemeId; name: string; description: string; colors: string[] }[] = [
  {
    id: 'neon',
    name: 'Neon Terminal',
    description: 'Deep void backdrop with electric cyan, cyber purple and glowing matrix accents.',
    colors: ['#080C16', '#101827', '#00E5FF', '#8B5CF6', '#39FF14'],
  },
  {
    id: 'classic',
    name: 'Classic Desktop',
    description: 'Authentic 90s teal desktop, silver beveled frames, and high-contrast navy headers.',
    colors: ['#008080', '#C0C0C0', '#000080', '#D4D0C8', '#000000'],
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfollow-theme') as ThemeId;
      if (saved && (saved === 'neon' || saved === 'classic')) {
        return saved;
      }
    }
    return 'neon';
  });

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('portfollow-theme', newTheme);
    } catch {
      // Ignore localStorage security/quota errors
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      if (theme === 'neon') metaTheme.setAttribute('content', '#080C16');
      else if (theme === 'classic') metaTheme.setAttribute('content', '#008080');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: AVAILABLE_THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
