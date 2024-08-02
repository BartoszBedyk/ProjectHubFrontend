import { createTheme, ThemeOptions } from '@mui/material/styles';

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        primary: {
            main: mode === 'light' ? '#1976d2' : '#1d82e6',
        },
        secondary: {
            main: mode === 'light' ? '#dc004e' : '#03dac6',
        },
        background: {
            default: mode === 'light' ? '#f8f8f8' : '#2c2c2c',
            paper: mode === 'light' ? '#fff' : '#373737',
        },
        text: {
            primary: mode === 'light' ? '#000' : '#e0e0e0',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
        },

    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
    },
});

export const lightTheme = createTheme(getDesignTokens('light'));
export const darkTheme = createTheme(getDesignTokens('dark'));
