import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import {Box, Paper, Typography} from "@mui/material";
import ChangeTheme from "../../components/Settings/ThemeButton";
import {useTranslation} from "react-i18next";
import LanguageButton from "../../components/Settings/LanguageButton";

const Settings = () => {
    const {t} = useTranslation("userProfile");

    return (
        <CustomLayout>
            <Paper sx={{ width: 'auto', m: 3, mb: 2, pb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection:'column'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                        <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                        <Typography variant="h5" component="div">
                            {t('settings')}
                        </Typography>
                    </Box>
                    <Box sx={{ height: 48 }} />
                    <Box sx={{ display: 'flex', flexDirection:'row' }}>
                        <Typography variant='h6' component='div' sx={{ml: 3, mt: -1}}>
                            {t('theme')}:
                        </Typography>
                        <Box sx={{ ml: 3, mt: -1 }}>
                            <ChangeTheme />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection:'row', mt: 2 }}>
                        <Typography variant='h6' component='div' sx={{ml: 3, mt: -1}}>
                            {t('language')}:
                        </Typography>
                        <Box sx={{ ml: 3 }}>
                            <LanguageButton />
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </CustomLayout>
    );
};

export default Settings;