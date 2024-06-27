import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useTranslation } from 'react-i18next';

import LockSensilabsColor from '../assets/Login/SensilabsLock.png';
import { api } from "../api/AppApi";
import { LoginForm } from "../api/login-pass-auth/form/LoginForm";
import {getToken, setToken} from "../storage/AuthStorage";
import secureLocalStorage from "react-secure-storage";
import { stylesLogin } from "./styles/LoginStyles";
import {useNavigate} from "react-router-dom";

export const LogInCard = () => {
    const { t } = useTranslation("login");

    const linkToHomePage = "/"
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setSubmitted(true);
    };

    useEffect(() => {
        if (!secureLocalStorage) return;
        const tokenFromStorage = secureLocalStorage.getItem("token") as string;
        if (tokenFromStorage) {setToken(tokenFromStorage); navigate(linkToHomePage); }

    }, []);

    useEffect(() => {
        if (!submitted) return;

        let form: LoginForm = {
            email: username,
            password: password,
        };
        setSaveCredentials(saveCredentials);
        api.loginPassAuth.login(form).then(data => {
            setToken(data.token);
            setErrorMessage("");
            navigate(linkToHomePage);
        }).catch(() => {
            setErrorMessage(t("loggingError"));
        });
        setSubmitted(false);
    }, [submitted, username, password, saveCredentials, t]);

    useEffect(() => {
        if (!saveCredentials && !getToken()) return;
        secureLocalStorage.setItem("token", getToken() as string);
        secureLocalStorage.setItem("allowedCredentials", saveCredentials);
    }, [submitted, saveCredentials]);

    return (
        <Card variant={"outlined"} sx={{ "--Card-radius": "0px" }}>
            <CardContent
                sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 25px" }}>
                <Box
                    component="img"
                    sx={stylesLogin.lockIconProps}
                    src={LockSensilabsColor}
                />

                <Typography variant="h4" component="p">{t("login")} </Typography>
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
                            type="password"
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
