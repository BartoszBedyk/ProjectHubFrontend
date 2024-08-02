import React, {useState} from 'react';
import {Button, Icon} from '@mui/material';
import { useTheme } from '../ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;


const IconContainer = styled(Icon)`
    position: relative;
    width: 24px; 
    height: 24px;
`;

const IconStyled = styled.div<{ fadeOut: boolean }>`
    position: absolute;
    top: 0;

    transition: opacity 0.9s ease, transform 0.9s ease;
    transform-origin: center;
    opacity: ${({ fadeOut }) => (fadeOut ? '0' : '1')};
    transform: ${({ fadeOut }) => (fadeOut ? 'rotate(360deg)' : 'none')};
`;

const ChangeTheme: React.FC = () => {
    const { toggleTheme } = useTheme();
    const [change, setChange] = useState(false);

    const handleToggleTheme = () => {
        toggleTheme();
        setChange(prev => !prev);
    };

    return (
        <Button onClick={handleToggleTheme} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon>
                <IconStyled fadeOut={change}>
                    <DarkModeIcon sx={{color: 'grey'}}/>
                </IconStyled>
                <IconStyled fadeOut={!change}>
                    <LightModeIcon sx={{color: 'yellow'}}/>
                </IconStyled>
            </Icon>
        </Button>
    );
};

export default ChangeTheme;
