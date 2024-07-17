import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {Box, IconButton, styled, Toolbar} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {drawerWidth} from "../Drawer/drawerUtils";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "./UserMenu/UserMenu";
import React from "react";
import {useDrawer} from "../Drawer/DrawerContext";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    })
}));

const ResponsiveAppBar = () => {

    const { open, handleDrawerOpen } = useDrawer();

    return (
        <AppBar
            position="fixed"
            color="transparent"
            elevation={0}
            open={open}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                        color: '#e8edf7',
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    {/*<ProjectsEnvsDropdown />*/}
                </Box>
                <UserMenu />
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;