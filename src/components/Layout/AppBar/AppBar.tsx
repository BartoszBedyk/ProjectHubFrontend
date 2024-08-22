import {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar/AppBar";
import {Box, styled, Toolbar, useTheme} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import {drawerWidth} from "../Drawer/drawerUtils";
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
    backdropFilter: 'blur(5px)',
    boxShadow: 'none',
    borderRadius: '5px',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth + 20,
        marginRight: 20,
        width: `calc(100% - ${drawerWidth + 40}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    ...(!open && {
        marginLeft: 104,
        width: `calc(100% - 104px)`,
    }),
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'inherit',
        filter: 'blur(15px)',
        zIndex: -1,
    }
}));

const ResponsiveAppBar = () => {
    const theme = useTheme();
    const { open } = useDrawer();

    return (
        <AppBar
            position="fixed"
            color="transparent"
            open={open}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }} />
                <UserMenu />
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;
