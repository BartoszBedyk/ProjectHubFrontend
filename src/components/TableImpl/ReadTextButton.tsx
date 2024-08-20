import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogTitle, DialogContent, Icon, DialogContentText, DialogActions, Link} from '@mui/material';
import TravelExploreOutlined from '@mui/icons-material/TravelExploreOutlined';
import {useTranslation} from 'react-i18next';
import {ChromeReaderModeOutlined, CopyAll} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {api} from "../../api/AppApi";
import {ResourceDto} from "../../api/resources/response/ResourceDto";

interface ButtonProps {
    children: string;
}

const OpenLinkButton = ({children}: ButtonProps) => {
    const {t} = useTranslation("buttons");
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState<ResourceDto>()

    const handleClickOpen = (event: React.MouseEvent) => {
        event.stopPropagation();
        setOpen(true);
    };


    const closeDialog = () => {
        setOpen(false);
    };
    useEffect(() => {
        api.resources.get(children).then(
            res => {
                setResponse(res)
            }
        ).catch(error => console.log(error))
    }, [children]);


    return (
        <React.Fragment>
            <Button
                size="medium"
                onClick={handleClickOpen}
                title={t("readText")}
                style={{zIndex: "2"}}
            >
                <Icon
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '2'}}
                >
                    <ChromeReaderModeOutlined/>
                </Icon>
            </Button>
            <Dialog open={open} onClose={closeDialog}>
                <DialogTitle>{t('text')}</DialogTitle>
                <DialogContent style={{width: 'auto', height: 'auto', padding: '5%'}}>
                    <DialogContentText><h4> {response?.name} </h4></DialogContentText>
                    <DialogContentText>{response?.value} </DialogContentText>
                    <DialogContentText>{t('creationDate')} {response?.createdOn}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary" title={t('cancel')}>
                        {t('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default OpenLinkButton;
