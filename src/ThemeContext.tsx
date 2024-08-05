import React, { createContext, useMemo, useState, useContext, ReactNode } from 'react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import {darkTheme, lightTheme} from "./theme";


interface ThemeContextType {
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

interface ThemeProviderComponentProps {
    children: ReactNode;
}

const ThemeProviderComponent: React.FC<ThemeProviderComponentProps> = ({ children }) => {
    let savedMode = localStorage.getItem("theme")
    const [mode, setMode] = useState(savedMode);
    localStorage.setItem("theme", mode as string);

    const theme = useMemo<Theme>(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    const toggleTheme = () => {


        setMode((savedMode) => (savedMode === 'light' ? 'dark' : 'light'));

    };

    return (
        <ThemeContext.Provider value={{ toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProviderComponent;
