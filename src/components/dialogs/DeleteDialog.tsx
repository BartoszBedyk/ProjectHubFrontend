import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

type DeleteDialogProps = {
    open: boolean;
    dialogTitle: string;
    dialogText: string;
    handleDelete: () => void;
}

const DeleteDialog = ({ open, dialogTitle, dialogText, handleDelete }: DeleteDialogProps) => {
    const [openDialog, setOpenDialog] = useState(open);
    const {t} = useTranslation("forms");
    useEffect(() => {
        setOpenDialog(open);
    }, [open]);

    const closeDeleteDialog = () => {
        setOpenDialog(false);
    };

    const handleDeleteClick = () => {
        handleDelete();
        closeDeleteDialog();
    };

    return (
        <Dialog open={openDialog} onClose={closeDeleteDialog}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDeleteDialog} color="primary">
                    {t('cancel')}
                </Button>
                <Button onClick={handleDeleteClick} color="error">
                    {t('delete')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;
