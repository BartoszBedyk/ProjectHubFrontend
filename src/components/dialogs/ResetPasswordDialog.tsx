import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";
import ResetPassword from "../../pages/login/resetPassword";
import {ResetPasswordForms} from "../Login/ResetPasswordForms";

type ResetPasswordDialogProps = {
    open: boolean;
}

const ResetPasswordDialog = ({ open }: ResetPasswordDialogProps) => {
    const [openDialog, setOpenDialog] = useState(open);
    useEffect(() => {
        setOpenDialog(open);
    }, [open]);

    const closeResetDialog = () => {
        setOpenDialog(false);
    };



    return (
        <Dialog open={openDialog} onClose={closeResetDialog} sx={{margin:"0", padding:"0"}}>
            <ResetPasswordForms></ResetPasswordForms>
        </Dialog>
    );
};

export default ResetPasswordDialog;
