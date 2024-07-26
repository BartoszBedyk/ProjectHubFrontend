import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import CheckIcon from '@mui/icons-material/Check';
import DialogContent from "@mui/material/DialogContent";
import {Icon} from "@mui/material";


interface UpdateDialogProps {
    openProps: boolean;
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({ openProps }) => {
    const [isOpen, setIsOpen] = useState(openProps);
    const handleClose = () => {
        setIsOpen(false);
    }
    useEffect(() => {
        if (openProps) {
            setIsOpen(true);
            const timer = setTimeout(() => {
                setIsOpen(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [openProps]);

    return (
        <Dialog open={isOpen}>
            <DialogTitle>Update completed</DialogTitle>
            <DialogContent
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={handleClose}>
                <Icon
                >
                    <CheckIcon />
                </Icon>
            </DialogContent>
        </Dialog>
    );
};