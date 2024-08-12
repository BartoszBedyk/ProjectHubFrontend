import {Box, Divider, IconButton, useTheme} from "@mui/material";
import logo from "../../../assets/Drawer/logo.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import {useDrawer} from "./DrawerContext";
import {Drawer, DrawerHeader} from "./drawerUtils";
import Items from "./Items";

const CustomDrawer = () => {

    const theme = useTheme();
    const { open, handleDrawerClose } = useDrawer();

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
                {open && (
                    <Box
                        component="img"
                        sx={{
                            height: 22,
                            width: 190,
                            marginRight: 1,
                            marginLeft: 2.5,
                        }}
                        alt="Logo"
                        src={logo}
                    />
                )}
                {open && (
                    <IconButton onClick={handleDrawerClose} sx={{color: '#e8edf7'}}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                )}
            </DrawerHeader>
            {open ? (
                <Box sx={{height: 15, width: 15, alignSelf: 'center'}}></Box>
            ) : (
                <Divider sx={{ height: 15, width:  42, alignSelf: 'center' }} />
            )}
           <Items open={open} />
        </Drawer>
    );
}

export default CustomDrawer;