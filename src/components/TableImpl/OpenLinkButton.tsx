import React from "react";
import {Button, Icon} from "@mui/material";
import {TravelExploreOutlined} from "@mui/icons-material";
import {useTranslation} from "react-i18next";


interface OpenLinkButtonProps {
    children : string;
}

const OpenLinkButton = ({ children }: OpenLinkButtonProps) => {
    const {t} = useTranslation("buttons");
    return(
        <React.Fragment>
            <Button

                variant="contained"
                size="medium"
                href={children}
                target="_blank"
                title={t("openLink")}
                >
                <Icon
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <TravelExploreOutlined></TravelExploreOutlined>
                </Icon>
            </Button>
        </React.Fragment>

    )
}

export default OpenLinkButton;