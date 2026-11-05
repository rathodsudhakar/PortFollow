
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { ThemeId } from '../types';

interface ThemeContextType {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
  availableThemes: {
    id: ThemeId;
    name: string;
    description: string;
    colors: string[];
  }[];
}

const AVAILABLE_THEMES: ThemeContextType['availableThemes'] = [
  {
    id: 'neon',
    name: 'Neon Terminal',
    description:
      'Deep void backdrop with electric cyan, cyber purple and glowing matrix accents.',
    colors: ['#080C16', '#101827', '#00E5FF', '#8B5CF6', '#39FF14'],
  },
  {
    id: 'pastel',
    name: 'Soft Pastel',
    description:
      'A soft lavender and pink theme with a light, calming desktop.',
    colors: ['#F8F5FF', '#FFFFFF', '#8B5CF6', '#EC4899', '#1F2937'],
  },
  {
    id: 'classic',
    name: 'Classic Desktop',
    description:
      'Authentic 90s teal desktop, silver beveled frames, and high-contrast navy headers.',
    colors: ['#008080', '#C0C0C0', '#000080', '#D4D0C8', '#000000'],
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isThemeId = (value: string | null): value is ThemeId =>
  value === 'neon' || value === 'pastel' || value === 'classic';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfollow-theme');
        if (isThemeId(saved)) {
          return saved;
        }
      } catch {
        // Ignore localStorage access errors.
      }
    }

    return 'neon';
  });

  const setTheme = (newTheme: ThemeId) => {
    setThemeState(newTheme);

    try {
      localStorage.setItem('portfollow-theme', newTheme);
    } catch {
      // Ignore localStorage security or quota errors.
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    const metaTheme = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );

    if (metaTheme) {
      const themeColors: Record<ThemeId, string> = {
        neon: '#080C16',
        pastel: '#F8F5FF',
        classic: '#008080',
      };

      metaTheme.setAttribute('content', themeColors[theme]);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes: AVAILABLE_THEMES,
      }}
    >
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
