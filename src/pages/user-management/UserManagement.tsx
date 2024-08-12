import React, {useEffect, useState} from 'react';
import UsersTable from "../../components/TableImpl/UsersTable";
import CustomLayout from "../../components/Layout/Layout";
import {Box, Button} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import CustomSnackbar from "../../components/Alerts/CustomSnackbar";

const UserManagement = () => {

    const navigate = useNavigate();
    const {t} = useTranslation("userManagement");
    const location = useLocation();
    const [snackbarData, setSnackbarData] = useState<{open: boolean, message: string, severity: 'success' | 'error'}>({
        open: false,
        message: '',
        severity: 'success'
    })

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

    return (
        <CustomLayout>
            <UsersTable searchValue='' onAction={handleSnackbar}/>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={handleOnClick} type="submit" variant="contained" color="primary" sx={{ mr: 3 }}>
                    {t('createUser')}
                </Button>
            </Box>
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