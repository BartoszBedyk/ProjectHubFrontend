import React from "react";
import {Button, Icon} from "@mui/material";
import {ChromeReaderModeOutlined} from "@mui/icons-material";


interface OpenLinkButtonProps {
    children : string;
}

const OpenLinkButton = ({ children }: OpenLinkButtonProps) => {
    return(
        //TODO
        //otwieranie okienka z teksterm lub otwieranie
        <React.Fragment>
            <Button

                variant="contained"
                size="medium"
                href={children}
                target="_blank"
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