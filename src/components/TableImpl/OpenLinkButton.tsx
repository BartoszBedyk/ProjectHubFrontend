import React from "react";
import {Button, Icon} from "@mui/material";
import {TravelExploreOutlined} from "@mui/icons-material";


interface OpenLinkButtonProps {
    children : string;
}

const OpenLinkButton = ({ children }: OpenLinkButtonProps) => {
    return(
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
                    <TravelExploreOutlined></TravelExploreOutlined>
                </Icon>
            </Button>
        </React.Fragment>

    )
}

export default OpenLinkButton;