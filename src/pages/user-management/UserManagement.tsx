import React, {useEffect, useState} from 'react';
import UsersTable from "../../components/TableImpl/UsersTable";
import CustomLayout from "../../components/Layout/Layout";
import {Box, Button, Typography} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CustomSnackbar from "../../components/Alerts/CustomSnackbar";
import { getUserId } from "../../storage/AuthStorage";
import { api } from "../../api/AppApi";
import {TIMEOUTS} from "../../utils/timeouts";

const UserManagement = () => {

    const navigate = useNavigate();
    const {t} = useTranslation("userManagement");
    const location = useLocation();
    const [snackbarData, setSnackbarData] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    });
    const [accessDenied, setAccessDenied] = useState<boolean>(false);


    useEffect(() => {
        if (location.state?.showSnackbarCreate) {
            setSnackbarData({open: true, message: t('userCreatedSuccess'), severity: 'success'});
        }
        if (location.state?.showSnackbarEdit) {
            setSnackbarData({open: true, message: t('userEditedSuccess'), severity: 'success'});
        }
    }, [location.state, t]);

    const handleSnackbarClose = () => {
        setSnackbarData(prev => ({...prev, open: false}));
    };

    const handleSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbarData({open: true, message, severity});
    };

    const handleOnClick = () => {
        navigate("/user/create");
    };

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

    return (
        <CustomLayout>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, mt: 3  }}>
                <Button onClick={handleOnClick} type="submit" variant="contained" color="primary" sx={{ mr: 3 }}>
                    {t('createUser')}
                </Button>
            </Box>
            <UsersTable searchValue='' onAction={handleSnackbar}/>

            <CustomSnackbar
                open={snackbarData.open}
                onClose={handleSnackbarClose}
                message={snackbarData.message}
                severity={snackbarData.severity}
            />
        </CustomLayout>
    );
};

export default UserManagement;