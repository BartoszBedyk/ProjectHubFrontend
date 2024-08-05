
import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme } from './theme';

interface LightThemeProviderProps {
    children: React.ReactNode;
}

const LoginThemeProvider: React.FC<LightThemeProviderProps> = ({ children }) => {
    return (
        <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default LoginThemeProvider;
