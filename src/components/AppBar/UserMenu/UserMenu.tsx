import React from 'react';
import {Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import userImg from "../../../assets/user-profile-image-test.png";

const settings = ["Settings", "Profile", "Smth", "Logout"];
const userName = "Kacper Koncki";

const UserMenu = () => {

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }
    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p:0 }}>
                    <Typography sx={{ pr: 1 }}><strong>{userName}</strong></Typography>
                    <Avatar alt="User image" src={userImg} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleOpenUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenu;