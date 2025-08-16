
import React, { createContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import { colorMode as appColors } from '../theme/index';

type ThemeContextType = {
  theme: typeof appColors.light;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: appColors.light,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState(
    colorScheme === 'dark' ? appColors.dark : appColors.light
  );

  const toggleTheme = () => {
    setTheme(prev => (prev === appColors.light ? appColors.dark : appColors.light));
  };

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? appColors.dark : appColors.light);
    });
    return () => listener.remove();
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
