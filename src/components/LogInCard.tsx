import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox, FormControl,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";

import LockSensilabsColor from '../assets/Login/SensilabsLock.png';
import {api} from "../api/AppApi";
import {LoginForm} from "../api/login-pass-auth/form/LoginForm";
import {setToken} from "../storage/AuthStorage";
import secureLocalStorage from "react-secure-storage";
import {stylesLogin} from "./styles/LoginStyles";

export default function LogInCard() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [saveCredentials, setSaveCredentials] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage , setErrorMessage] = useState('  ');


    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        setSubmitted(true);
    };

    useEffect(() => {
        if(!secureLocalStorage) return;

        const nameFromStorage = secureLocalStorage.getItem("username") as string
        const passFromStorage = secureLocalStorage.getItem("password") as string
        if(nameFromStorage) setUsername(nameFromStorage)
        if(passFromStorage) setPassword(passFromStorage)
    }, []);


     useEffect(() => {
        if (!submitted) return;
            {
                let form : LoginForm = {
                    email: username,
                    password: password,
                }
                setSaveCredentials(saveCredentials)
                api.loginPassAuth.login(form).then(data => {
                    setToken(data.token)
                    setErrorMessage("")
                }).catch(() =>{
                    setErrorMessage("Incorrect username or password");
                })
            }
            setSubmitted(false);

        }, [submitted]);

    useEffect(() => {
        if(!saveCredentials) return;
        {
            console.log("credentials are saved")
            secureLocalStorage.setItem("username", username);
            secureLocalStorage.setItem("password", password);
        }
        secureLocalStorage.setItem("allowedCredentials", saveCredentials);

    }, [submitted]);



    return (

            <Card variant={"outlined"} sx={{"--Card-radius": "0px"}}>
                <CardContent
                    sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 25px"}}>
                    <Box
                        component="img"
                        sx={stylesLogin.lockIconProps}
                        src={LockSensilabsColor}
                    />

                    <Typography variant="h4" component="p">Login</Typography>
                    <span style={stylesLogin.errorProps}>{errorMessage}</span>
                    <form onSubmit={handleSubmit} autoComplete="on">
                        <FormControl style={stylesLogin.formContainer}>
                            <TextField
                                id="username"
                                label="Login"
                                variant="outlined"
                                value={username}
                                autoComplete="on"
                                onChange={(e) => setUsername(e.target.value)}
                                sx={stylesLogin.textFields}
                            />

                            <TextField
                                id="password"
                                label="Password"
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
                                                   onChange={(e) => setSaveCredentials(e.target.checked)}/>}
                                label="Save credentials"
                                sx={stylesLogin.formContainer}
                            />

                            <Button
                                variant="contained"
                                size="medium"
                                sx={stylesLogin.buttonProps}
                                type="submit"
                            >
                                Login
                            </Button>
                        </FormControl>
                    </form>

                    <Typography variant="body2" component="p">Forgot password? <b>Reset</b></Typography>
                    <Typography variant="body2" component="p">Don’t have an account? <b>Signup</b></Typography>
                </CardContent>
            </Card>

    );
}
