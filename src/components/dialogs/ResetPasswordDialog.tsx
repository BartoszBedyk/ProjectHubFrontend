import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ResetPasswordForms } from "../Login/ResetPasswordForms";

type ResetPasswordDialogProps = {
    open: boolean;
    onClose: () => void;
}

const ResetPasswordDialog = ({ open, onClose }: ResetPasswordDialogProps) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (open && !hasError) {
            timer = setTimeout(() => {
                onClose();
            }, 20000);
        }
        return () => clearTimeout(timer);
    }, [open, onClose, hasError]);

    const closeResetDialog = () => {
        if (!hasError) {
            onClose();
        }
    };

    const handleError = (error: boolean) => {
        setHasError(error);
    };

    return (
        <Dialog open={open} onClose={closeResetDialog} sx={{ margin: "0", padding: "0" }}>
            <ResetPasswordForms onError={handleError} />
        </Dialog>
    );
};

export default ResetPasswordDialog;