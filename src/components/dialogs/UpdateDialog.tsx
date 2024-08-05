import Dialog from "@mui/material/Dialog";
import React, {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";


interface UpdateDialogProps {
    openProps: boolean;
    title: string;
    message: string;
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({ openProps,title, message }) => {
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
            <DialogTitle>{title}</DialogTitle>
            <DialogContent
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={handleClose}>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};