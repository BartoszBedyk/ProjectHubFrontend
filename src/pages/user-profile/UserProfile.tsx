import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout/Layout";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputAdornment,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {api} from "../../api/AppApi";
import {UserDto} from "../../api/user-management/response/UserDto";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {getUserId} from "../../storage/AuthStorage";
import {TIMEOUTS} from "../../utils/timeouts";


const UserProfile = () => {
    const {userId} = useParams<{userId: string}>();
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserDto | null>(null);
    const [creator, setCreator] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [accessDenied, setAccessDenied] = useState<boolean>(false);
    const navigate = useNavigate();
    const {t} = useTranslation("userProfile");

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userResponse = await api.userManagement.get(userId!);
                setUser(userResponse);

                if (userResponse.createdById !== 'SYSTEM') {
                    const creatorResponse = await api.userManagement.get(userResponse.createdById);
                    setCreator(creatorResponse.firstName + " " + creatorResponse.lastName);
                } else {
                    setCreator("SYSTEM");

                }

                const currentUserId = getUserId();
                if (currentUserId) {
                    const user = await api.userManagement.get(currentUserId);

                    if (user.createdById !== "SYSTEM" && currentUserId !== userId) {
                        setAccessDenied(true);
                        return;
                    }
                } else {
                    setAccessDenied(true);
                }
            } catch (e) {
                console.error('Error fetching user details', e);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOldPassword('');
        setNewPassword('');
        setError('');
    };

    const handleChangePassword = async () => {
        if (newPassword.length < 8) {
            setError(t('passwordTooShort'));
            return;
        }

        try {
            await api.changePassword.changePassword({
                email: user!.email,
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            setSnackbarOpen(true);
            handleClose();
        } catch {
            setError(t('badOldPassword'));
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return (
            <CustomLayout>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </CustomLayout>
        );
    }

    if (accessDenied) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <Container>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    {t('accessDenied')}
                </Typography>
            </Container>
        );
    }

    if (!user) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('notFound')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    return (
        <CustomLayout>
            <Paper sx={{ width: 'auto', m: 3, mb: 2, pb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection:'column'}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                        <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                        <Typography variant="h5" component="div">
                            {t('userProfile')}
                        </Typography>
                    </Box>
                    <Box sx={{ height: 48 }} />
                    <Typography variant='h6' component='div' sx={{ml: 3}}>
                        {t('name')}: <strong>{user.firstName} {user.lastName}</strong>
                    </Typography>
                    <Typography variant='h6' component='div' sx={{ml: 3, mt: 2}}>
                        {t('email')}: <strong>{user.email}</strong>
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', ml: 3, mt: 2}}>
                        <Button onClick={handleClickOpen} type="submit" variant="contained" color="primary" sx={{ mr: 3 }}>
                            {t('changePassword')}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, mr: 3, ml: 3}}>
                        <Typography variant="body2" color="textSecondary">
                            {`${t('creationDate')}: ${new Date(user.createdOn).toLocaleDateString()}`}
                        </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {`${t('createdBy')}: ${creator}`}
                            </Typography>
                    </Box>
                </Box>
            </Paper>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('changePassword')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('enterOldNewPassword')}
                    </DialogContentText>
                    {error && (
                        <Typography color="error" sx={{ mb: 1, mt: 1 }}>
                            {t(error)}
                        </Typography>
                    )}
                    <TextField
                        autoFocus
                        margin="dense"
                        id="oldPassword"
                        label={t('oldPassword')}
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={oldPassword}
                        error={!!error}
                        onChange={(e) => setOldPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newPassword"
                        label={t('newPassword')}
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={newPassword}
                        error={!!error}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('cancel')}
                    </Button>
                    <Button onClick={handleChangePassword} color="primary">
                        {t('changePassword')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{width: '100%'}}>
                    {t('passwordChangeSuccess')}
                </Alert>
            </Snackbar>
        </CustomLayout>
    );
};

export default UserProfile;