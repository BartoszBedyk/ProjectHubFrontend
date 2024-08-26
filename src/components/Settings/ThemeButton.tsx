import React, { useState } from 'react';
import { Button, Icon } from '@mui/material';
import { useTheme } from '../../ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import styled from 'styled-components';

const IconContainer = styled(Icon)`
    //position: relative;
    width: 36px;
    height: 36px;
`;

const IconStyled = styled.div<{ $fadeOut: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.9s ease, transform 0.9s ease;
    transform-origin: center;
    opacity: ${({ $fadeOut }) => ($fadeOut ? '0' : '1')};
    transform: ${({ $fadeOut }) => ($fadeOut ? 'rotate(360deg)' : 'none')};
`;

const ChangeTheme: React.FC = () => {
    const { toggleTheme } = useTheme();
    const storageCheck = localStorage.getItem("theme");
    const [change, setChange] = useState(storageCheck !== "light");

    const handleToggleTheme = () => {
        setChange(prev => !prev);
        toggleTheme();
    };

    return (
        <Button onClick={handleToggleTheme}  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconContainer>
                <IconStyled $fadeOut={change}>
                    <DarkModeIcon sx={{ color: 'grey' }} />
                </IconStyled>
                <IconStyled $fadeOut={!change}>
                    <LightModeIcon sx={{ color: 'yellow' }} />
                </IconStyled>
            </IconContainer>
        </Button>
    );
};

export default ChangeTheme;
