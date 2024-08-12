import React from 'react';
import {Alert, Snackbar} from "@mui/material";

interface CustomSnackbarProps {
    open: boolean;
    onClose: () => void;
    message: string;
    severity?: 'success' | 'error';
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ open, onClose, message, severity}) => {
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <Alert
                onClose={onClose}
                severity={severity}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;