import React, {useState} from 'react';
import MuiAppBar from '@mui/material/AppBar';
import {
    Box,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton, ListItemIcon, ListItemText,
    styled,
    Toolbar, Typography,
    useTheme
} from "@mui/material";
import {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import logo from "../../assets/logo.png";
import ProjectsDropdown from "./Dropdown/ProjectsDropdown";
import UserMenu from "./UserMenu/UserMenu";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {Drawer, DrawerHeader, drawerWidth} from "./Drawer/Drawer";

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

    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
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
                    {/*<Box
                        component="img"
                        sx={{
                            height: 48,
                            marginRight: 3,
                        }}
                        alt="Logo"
                        src={logo}
                    />*/}
                    <Box sx={{ flexGrow: 1 }}>
                        <ProjectsDropdown />
                    </Box>
                    <UserMenu />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {open && (
                    <Box
                        component="img"
                        sx={{
                            height: 25,
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
                    <Typography variant="h6" sx={{ p: 2.5, paddingBottom: 0, color: '#e8edf7', fontSize: 14}}>
                        Section 1
                    </Typography>
                ) : (
                  <Divider sx={{ height: 42, width:  42, alignSelf: 'center' }} />
                )}
                <List>
                    {["Menu option 1", "Menu option 2", "Menu option 3", "Menu option 4"].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: "block" }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    p: 2.5,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 48,
                                        mr: open ? 3 : "auto",
                                        justifyContent: "center",
                                        color: "#e8edf7",
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: "#e8edf7" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {open ? (
                    <Typography variant="h6" sx={{ p: 2.5, paddingBottom: 0, color: '#e8edf7', fontSize: 14}}>
                        Section 2
                    </Typography>
                ) : (
                    <Divider sx={{ height: 42, width:  42, alignSelf: 'center' }} />
                )}
                <List>
                    {['Menu option 1', 'Menu option 2', 'Menu option 3'].map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    p: 2.5,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 48,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: "#e8edf7",
                                    }}
                                >
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: "#e8edf7" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>

                    <List>
                        <ListItem disablePadding sx={{ display: "block" }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    p: 2.5,
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 48,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: "#e8edf7",
                                    }}
                                >
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
};

export default ResponsiveAppBar;