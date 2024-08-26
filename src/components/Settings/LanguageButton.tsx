import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Avatar, Button, Icon, Typography} from "@mui/material";
import {useTheme} from "../../ThemeContext";
import plFlag from "../../assets/pl-flag.png";
import enFlag from "../../assets/en-flag.png";
import i18n from "i18next";

const IconContainer = styled(Icon)`
   // position: relative;
    width: 76px;
    height: 36px;
`;

const IconStyled = styled.div<{ $fadeOut: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.9s ease, transform 0.9s ease;
    //transform-origin: center;
    opacity: ${({ $fadeOut }) => ($fadeOut ? '0' : '1')};
    transform: ${({ $fadeOut }) => ($fadeOut ? 'rotate(360deg)' : 'none')};
`;

const LanguageButton: React.FC = () => {
    const { toggleTheme } = useTheme();
    const storageCheck = localStorage.getItem("language") || 'pl';
    const [language, setLanguage] = useState(storageCheck);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    const handleLanguageChange = () => {
        const newLanguage = language === "pl" ? "en" : "pl";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <Button onClick={handleLanguageChange}  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconContainer>
                <IconStyled $fadeOut={language === 'pl'}>
                    {/*<img src={plFlag} alt="pl_flag" />*/}
                    <Typography>English</Typography>
                </IconStyled>
                <IconStyled $fadeOut={language === 'en'}>
                    {/*<img src={enFlag} alt="pl_flag"/>*/}
                    <Typography>Polski</Typography>
                </IconStyled>
            </IconContainer>
        </Button>
    );
};

export default LanguageButton;