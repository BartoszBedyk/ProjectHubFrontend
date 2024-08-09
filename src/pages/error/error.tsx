import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import {Container, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const Error = () => {
    const {t} = useTranslation("overall");

    return (
        <CustomLayout>
            <Container>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    {t('members.error')}
                </Typography>
            </Container>
        </CustomLayout>
    );
};

export default Error;