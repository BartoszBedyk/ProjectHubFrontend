import React from "react";
import {Button, Icon} from "@mui/material";
import {ChromeReaderModeOutlined} from "@mui/icons-material";
import {useTranslation} from "react-i18next";


interface OpenLinkButtonProps {
    children : string;
}

const OpenLinkButton = ({ children }: OpenLinkButtonProps) => {
    const {t} = useTranslation("resources");
    return(
        //TODO
        //otwieranie okienka z teksterm lub otwieranie
        <React.Fragment>
            <Button

                variant="contained"
                size="medium"
                href={children}
                target="_blank"
                title={t("readText")}
            >
                <Icon
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ChromeReaderModeOutlined></ChromeReaderModeOutlined>
                </Icon>
            </Button>
        </React.Fragment>

    )
}

export default OpenLinkButton;