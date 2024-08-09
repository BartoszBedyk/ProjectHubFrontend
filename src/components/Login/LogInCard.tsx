import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel, IconButton, InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import LockSensilabsColor from '../../assets/Login/SensilabsLock.png';
import { api } from "../../api/AppApi";
import { LoginForm } from "../../api/login-pass-auth/form/LoginForm";
import { getToken, setToken } from "../../storage/AuthStorage";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import { stylesLogin } from "./styles/LoginStyles";
import {UpdateDialog} from "../dialogs/UpdateDialog";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const LogInCard = () => {
    const { t } = useTranslation("login");
    const linkToHomePage = "/";
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isBlocked, setIsBlocked] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setLoading(true);
    };

    useEffect(() => {
        if (loading) {
            const expirationDateStr = secureLocalStorage.getItem("expirationDate");
            if (expirationDateStr) {
                const expirationDateNumber = Number(expirationDateStr);
                if (!isNaN(expirationDateNumber)) {
                    const brake = expirationDateNumber + 604800000;
                    const now = new Date().getTime();

                    if (brake < now) {
                        setErrorMessage(t("loggingTokenError"));
                        api.loginPassAuth.logout();
                        secureLocalStorage.removeItem("token");
                        secureLocalStorage.removeItem("expirationDate");
                        navigate("/auth/login");
                        setLoading(false);
                        return;
                    }
                }
            }

            const tokenFromStorage = secureLocalStorage.getItem("token");
            if (tokenFromStorage) {
                setToken(tokenFromStorage as string);
                navigate(linkToHomePage);
                setLoading(false);
                return;
            }


            const form: LoginForm = { email: username, password: password };
            api.loginPassAuth.login(form)
                .then(data => {
                    setToken(data.token);
                    secureLocalStorage.setItem("token", data.token);
                    secureLocalStorage.setItem("allowedCredentials", saveCredentials.toString());
                    secureLocalStorage.setItem("expirationDate", new Date().toString());
                    setErrorMessage("");
                    navigate(linkToHomePage);
                })
                .catch((error) => {
                    console.log("Error: ",  error.response.data.message);
                    setErrorMessage(t("loggingError"));
                    if(error.response.data.message==='User is blocked') {
                        setIsBlocked(true)
                        setErrorMessage(t('bannedUser'))
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [loading]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Card variant={"outlined"} sx={{ "--Card-radius": "0px" }}>
            <CardContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 25px" }}>
                <Box
                    component="img"
                    sx={stylesLogin.lockIconProps}
                    src={LockSensilabsColor}
                />
                <UpdateDialog openProps={isBlocked} title={t('bannedUserTitle')} message={t('bannedUserMessage')}/>
                <Typography variant="h4" component="p">{t("login")}</Typography>
                <span style={stylesLogin.errorProps}>{errorMessage}</span>
                <form onSubmit={handleSubmit} autoComplete="on">
                    <FormControl style={stylesLogin.formContainer}>
                        <TextField
                            id="username"
                            label={t("loginName")}
                            variant="outlined"
                            value={username}
                            autoComplete="on"
                            onChange={(e) => setUsername(e.target.value)}
                            sx={stylesLogin.textFields}
                        />

                        <TextField
                            id="password"
                            label={t("password")}
                            variant="outlined"
                            value={password}
                            autoComplete="on"
                            onChange={(e) => setPassword(e.target.value)}
                            sx={stylesLogin.textFields}
                            type={showPassword ? 'text' : 'password'}
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

                        <FormControlLabel
                            id="credentialsAllowance"
                            control={<Checkbox checked={saveCredentials}
                                               onChange={(e) => setSaveCredentials(e.target.checked)} />}
                            label={t("loginCred")}
                            sx={stylesLogin.formContainer}
                        />

                        <Button
                            variant="contained"
                            size="medium"
                            sx={stylesLogin.buttonProps}
                            type="submit"
                        >
                            {t("login")}
                        </Button>
                    </FormControl>
                </form>

                <Typography variant="body2" component="p">{t("loginLink1")} <b>{t("loginLink1b")}</b></Typography>
                <Typography variant="body2" component="p">{t("loginLink2")} <b>{t("loginLink2b")}</b></Typography>
            </CardContent>
        </Card>
    );
};
