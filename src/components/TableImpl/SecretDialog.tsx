import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Icon} from "@mui/material";
import {Close, CopyAll, VisibilityOutlined} from "@mui/icons-material";
import {api} from "../../api/AppApi";
import {useTranslation} from "react-i18next";




interface SecretProps {
    children : string;
}


const SecretDialog: React.FC<SecretProps> = ({ children }) => {

    const {t} = useTranslation("buttons");


    const [open, setOpen] = React.useState(false);
    const [secret, setSecret] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(secret)
        handleClose();

    };

    api.resources.readSecret(children).then((response: string)=>
    {
        setSecret(response);
    });

    return (
        <React.Fragment>
            <Button
                     size="medium"
                     onClick={handleClickOpen}
                     title={t('readSecret')}
            >

                <Icon
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <VisibilityOutlined></VisibilityOutlined>
                </Icon>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="dialog-secret-title"
                aria-describedby="secret-dialog-description"
            >
                <DialogTitle id="dialog-secret-title">
                    {t('unmaskedSecret')}
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="secret-dialog-description">
                        {secret}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} title={t('closeTxt')}>
                        <Icon>
                            <Close></Close>
                        </Icon>
                    </Button>
                    <Button onClick={handleCopy} title={t('copyTxt')}>
                        <Icon>
                            <CopyAll></CopyAll>
                        </Icon>
                    </Button>

                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
}

export default SecretDialog;