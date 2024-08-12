import React, { useEffect, useState } from 'react';
import UsersTable from "../../components/TableImpl/UsersTable";
import CustomLayout from "../../components/Layout/Layout";
import { Box, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUserId } from "../../storage/AuthStorage";
import { api } from "../../api/AppApi";
import {TIMEOUTS} from "../../utils/timeouts";

const UserManagement = () => {
    const navigate = useNavigate();
    const { t } = useTranslation("userManagement");
    const [accessDenied, setAccessDenied] = useState<boolean>(false);

    useEffect(() => {
        const checkAccess = async () => {
            const currentUserId = getUserId();
            if (currentUserId) {
                try {
                    const user = await api.userManagement.get(currentUserId);
                    if (user.createdById !== "SYSTEM") {
                        setAccessDenied(true);
                        return;
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    setAccessDenied(true);
                    return;
                }
            } else {
                setAccessDenied(true);
            }
        };

        checkAccess();
    }, [navigate]);

    if (accessDenied) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    {t('accessDenied')}
                </Typography>
            </CustomLayout>
        );
    }

    const handleOnClick = () => {
        navigate("/user/create");
    };

    return (
        <CustomLayout>
            <UsersTable searchValue='' />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={handleOnClick} type="submit" variant="contained" color="primary" sx={{ mr: 3 }}>
                    {t('createUser')}
                </Button>
            </Box>
        </CustomLayout>
    );
};

export default UserManagement;