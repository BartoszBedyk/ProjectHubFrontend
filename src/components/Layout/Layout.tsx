import React, {ReactNode} from 'react';
import {Box, CssBaseline} from "@mui/material";
import CustomDrawer from "./Drawer/Drawer";
import ResponsiveAppBar from "./AppBar/AppBar";
import {DrawerProvider} from "./Drawer/DrawerContext";

interface LayoutProps {
    children: ReactNode;
}

const CustomLayout = ({ children }: LayoutProps) => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <DrawerProvider>
                <ResponsiveAppBar />
                <CustomDrawer />
                <Box component="main"
                     sx={{
                         flexGrow: 1,
                         p: 3,
                         marginLeft: 3,
                         marginTop: '32px'
                     }}
                >
                    {children}
                </Box>
            </DrawerProvider>
        </Box>
    );
};

export default CustomLayout;