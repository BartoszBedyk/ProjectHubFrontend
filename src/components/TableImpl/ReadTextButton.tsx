import React from "react";
import {Button, Icon} from "@mui/material";
import {ChromeReaderModeOutlined} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import {Navigate} from "react-router-dom";


interface OpenLinkButtonProps {
    children : string;
}

const OpenLinkButton = ({ children }: OpenLinkButtonProps) => {
    const {t} = useTranslation("buttons");

    function handleClick(){
        return <Navigate to={`/project/:projectId/resources/details/${children}`}></Navigate>
    }

    return(
        <React.Fragment>
            <Button onClick={handleClick}

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