import { Box, Divider, IconButton, useTheme } from "@mui/material";
import logo from "../../../assets/Drawer/logo.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import { useDrawer } from "./DrawerContext";
import { Drawer, DrawerHeader } from "./drawerUtils";
import Items from "./Items";
import MenuIcon from "@mui/icons-material/Menu";

const CustomDrawer = () => {
    const theme = useTheme();
    const { open, handleDrawerClose, handleDrawerOpen } = useDrawer();

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                }}
            >
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
                <IconButton
                    onClick={open ? handleDrawerClose : handleDrawerOpen}
                    sx={{
                        color: '#e8edf7',
                    }}
                >
                    {open ? (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />) : <MenuIcon />}
                </IconButton>
            </DrawerHeader>
            {open ? (
                <Box sx={{ height: 15, width: 15, alignSelf: 'center' }}></Box>
            ) : (
                <Divider sx={{ height: 15, width: 40, alignSelf: 'center' }} />
            )}
            <Items open={open} />
        </Drawer>
    );
}

export default CustomDrawer;
