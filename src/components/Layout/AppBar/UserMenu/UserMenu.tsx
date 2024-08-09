import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    IconButton,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Tooltip,
    Typography
} from "@mui/material";
import userImg from "../../../../assets/user-profile-image-test.png";
import useNavLinksUserMenu from "./navLinksUserMenu";
import { getUserId } from "../../../../storage/AuthStorage";
import { api } from "../../../../api/AppApi";
import { useNavigate } from "react-router-dom";
import logout from "../../../Login/LogoutButton";

const UserMenu = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ firstName: '', lastName: '' });
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const navLinksUserMenu = useNavLinksUserMenu();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const userId = getUserId();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.userManagement.get(userId!);
                setUser({
                    firstName: response.firstName,
                    lastName: response.lastName,
                });
            } catch (e) {
                console.error('Error fetching user details: ', e);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open options">
                <IconButton onClick={handleOpenUserMenu} sx={{ p:0 }}>
                    <Typography sx={{ pr: 1 }}><strong>{user.firstName} {user.lastName}</strong></Typography>
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
                {navLinksUserMenu.map((item) => (
                    <MenuItem key={item.name} onClick={handleCloseUserMenu} style={{margin:"0", padding:"0"}}>
                        <ListItemButton
                            onClick={(e) => {
                                e.stopPropagation();
                                if (item.name === 'Profile') {
                                    navigate(`/user/${userId}`);
                                } else if (item.name === 'Logout'){
                                    logout();
                                } else {
                                    navigate(item.link!);
                                }
                            }}
                            style={{ cursor: "pointer",  }}
                        >
                            {item.name}
                        </ListItemButton>


                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};

export default UserMenu;
