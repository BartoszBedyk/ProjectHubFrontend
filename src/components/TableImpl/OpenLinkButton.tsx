import React, {useState} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, Icon, DialogContentText, DialogActions, Link} from '@mui/material';
import TravelExploreOutlined from '@mui/icons-material/TravelExploreOutlined';
import {useTranslation} from 'react-i18next';
import {CopyAll} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

interface OpenLinkButtonProps {
    children: string;
}

const OpenLinkButton = ({children}: OpenLinkButtonProps) => {
    const {t} = useTranslation("buttons");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const handleClickOpen = (event: React.MouseEvent) => {
        event.stopPropagation();
        setOpen(true);
    };


    const closeDialog = () => {
        setOpen(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        closeDialog();
    };


    return (
        <React.Fragment>
            <Button
                size="medium"
                onClick={handleClickOpen}
                title={t("openLink")}
                style={{zIndex: "2"}}
            >
                <Icon
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '2'}}
                >
                    <TravelExploreOutlined/>
                </Icon>
            </Button>
            <Dialog open={open} onClose={closeDialog} style={{width: '100%'}}>
                <DialogTitle>{t('link')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <a href={children} target="_blank" rel="noopener noreferrer"
                           style={{ textDecoration: 'none', color: 'inherit' }}> {children}</a>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary" title={t('cancel')}>
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleCopy} title={t('copy')}>
                        {t('copy')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default OpenLinkButton;
