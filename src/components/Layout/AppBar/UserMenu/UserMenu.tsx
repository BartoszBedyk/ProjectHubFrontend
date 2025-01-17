import React, {useEffect, useState} from 'react';
import {Avatar, Box, IconButton, ListItemButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import userImg from "../../../../assets/user-profile-image-test.png";
import useNavLinksUserMenu from "./navLinksUserMenu";
import {getUserId} from "../../../../storage/AuthStorage";
import {api} from "../../../../api/AppApi";
import {useNavigate} from "react-router-dom";
import logout from "../../../Login/LogoutButton";
import {useTranslation} from "react-i18next";

const UserMenu = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({ firstName: '', lastName: '' });
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { t } = useTranslation('drawer');

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
                <IconButton onClick={handleOpenUserMenu}
                            sx={{
                                p: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                '&:focus': {
                                    outline: 'none',
                                    boxShadow: 'none',
                                    backgroundColor: 'transparent',
                                }
                            }}
                >
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
                                if (item.name === t('profile')) {
                                    navigate(`/user/${userId}`);
                                } else if (item.name === t('logout')){
                                    logout();
                                } else {
                                    navigate(item.link!);
                                }
                            }}
                            sx={{
                                cursor: "pointer",
                                '&:focus': {
                                    outline: '2px solid transparent',
                                    boxShadow: 'none'
                                }
                            }}
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
