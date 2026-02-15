import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    light: string;
    dark: string;
    white: string;
    black: string;
    gray: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
  shadows: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const defaultTheme: Theme = {
  name: 'default',
  colors: {
    primary: 'oklch(60.5% 0.217 257.2)',
    secondary: 'oklch(55.8% 0.016 244.9)',
    success: 'oklch(64.0% 0.175 146.7)',
    warning: 'oklch(84.4% 0.172 84.9)',
    danger: 'oklch(59.2% 0.202 21.2)',
    info: 'oklch(65.5% 0.110 212.2)',
    light: 'oklch(98.2% 0.002 247.8)',
    dark: 'oklch(34.5% 0.013 248.2)',
    white: 'oklch(100.0% 0.000 0)',
    black: 'oklch(0.0% 0.000 0)',
    gray: {
      50: 'oklch(98.4% 0.003 247.9)',
      100: 'oklch(96.8% 0.007 247.9)',
      200: 'oklch(92.9% 0.013 255.5)',
      300: 'oklch(86.9% 0.020 252.9)',
      400: 'oklch(71.1% 0.035 256.8)',
      500: 'oklch(55.4% 0.041 257.4)',
      600: 'oklch(44.6% 0.037 257.3)',
      700: 'oklch(37.2% 0.039 257.3)',
      800: 'oklch(27.9% 0.037 260.0)',
      900: 'oklch(20.8% 0.040 265.8)',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  typography: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
};

export const darkTheme: Theme = {
  ...defaultTheme,
  name: 'dark',
  colors: {
    ...defaultTheme.colors,
    primary: 'oklch(62.3% 0.188 259.8)',
    secondary: 'oklch(55.4% 0.041 257.4)',
    success: 'oklch(69.6% 0.149 162.5)',
    warning: 'oklch(76.9% 0.165 70.1)',
    danger: 'oklch(63.7% 0.208 25.3)',
    info: 'oklch(71.5% 0.126 215.2)',
    light: 'oklch(27.9% 0.037 260.0)',
    dark: 'oklch(98.4% 0.003 247.9)',
    white: 'oklch(20.8% 0.040 265.8)',
    black: 'oklch(98.4% 0.003 247.9)',
    gray: {
      50: 'oklch(20.8% 0.040 265.8)',
      100: 'oklch(27.9% 0.037 260.0)',
      200: 'oklch(37.2% 0.039 257.3)',
      300: 'oklch(44.6% 0.037 257.3)',
      400: 'oklch(55.4% 0.041 257.4)',
      500: 'oklch(71.1% 0.035 256.8)',
      600: 'oklch(86.9% 0.020 252.9)',
      700: 'oklch(92.9% 0.013 255.5)',
      800: 'oklch(96.8% 0.007 247.9)',
      900: 'oklch(98.4% 0.003 247.9)',
    },
  },
};

export interface ThemeContextType {
  theme: Theme;
  themes: Record<string, Theme>;
  setTheme: (theme: Theme) => void;
  setThemeByName: (name: string) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  themes?: Record<string, Theme>;
}

export function ThemeProvider({
  children,
  defaultTheme: initialTheme = 'default',
  themes: customThemes = {},
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (
      savedTheme &&
      (customThemes[savedTheme] ||
        savedTheme === 'default' ||
        savedTheme === 'dark')
    ) {
      return savedTheme === 'dark'
        ? darkTheme
        : customThemes[savedTheme] || defaultTheme;
    }
    return initialTheme === 'dark'
      ? darkTheme
      : customThemes[initialTheme] || defaultTheme;
  });

  const themes = {
    default: defaultTheme,
    dark: darkTheme,
    ...customThemes,
  };

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem('theme', theme.name);
  };

  const setThemeByName = (name: string) => {
    const theme = themes[name as keyof typeof themes];
    if (theme) {
      setTheme(theme);
    }
  };

  const isDark = currentTheme.name === 'dark';

  const toggleDark = () => {
    setThemeByName(isDark ? 'default' : 'dark');
  };

  // CSS 변수 적용
  useEffect(() => {
    const root = document.documentElement;
    const theme = currentTheme;

    // 색상 변수 설정
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--color-${key}`, value);
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--color-${key}-${subKey}`, subValue);
        });
      }
    });

    // 간격 변수 설정
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // 테두리 반경 변수 설정
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--border-radius-${key}`, value);
    });

    // 타이포그래피 변수 설정
    root.style.setProperty('--font-family', theme.typography.fontFamily);

    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      root.style.setProperty(`--font-weight-${key}`, value.toString());
    });

    // 그림자 변수 설정
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // 테마 클래스 설정
    root.setAttribute('data-theme', theme.name);
    root.classList.toggle('dark', isDark);
  }, [currentTheme, isDark]);

  const contextValue: ThemeContextType = {
    theme: currentTheme,
    themes,
    setTheme,
    setThemeByName,
    isDark,
    toggleDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// 테마 훅들
export function useThemeColors() {
  const { theme } = useTheme();
  return theme.colors;
}

export function useThemeSpacing() {
  const { theme } = useTheme();
  return theme.spacing;
}

export function useThemeTypography() {
  const { theme } = useTheme();
  return theme.typography;
}
