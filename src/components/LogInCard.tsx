import React from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
    Typography
} from "@mui/material";
import LockSensilabsColor from '../assets/Login/SensilabsLogoThick2.png'
import {grey} from "@mui/material/colors";




export default function LogInCard() {


        const stylesLogIn = {
            formContainer: {
                fontsize: "20px",
                height: "auto",
                margin: "16px",
                padding: "5%"

            },
            textFields: {
                fontsize: "40px",
                height: "auto",
                width: "100%",
                margin: "16px",
                backgroundColor: grey[100],
            },
            imageProps: {
                size: "10px 10px",
                marginBottom: "10px"
            },
            buttonProps:{

            }

        }



    return (
        <div>
            <Card variant={"outlined"} sx={{ display: "flex", border: "none", boxShadow: "0 1px 20px 0 rgba(69, 90, 100, .08);", marginBottom:"10%"}}>
                <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "30px 25px" }}>


                            <Box
                                component="img"
                                sx={stylesLogIn.imageProps}
                                width="15%"
                                alt="Lock"
                                src={LockSensilabsColor}
                                />

                    <Typography variant="h4" component="p">Login</Typography>
                    <FormGroup sx={stylesLogIn.formContainer}>
                        <TextField id="login" label="Login" variant="outlined"  sx={stylesLogIn.textFields}/>
                        <TextField id="password" label="Password" variant="outlined" sx={stylesLogIn.textFields} type="password"/>
                        <FormControlLabel id="credentialsAllowance" control={<Checkbox/>} label="Save credentials" sx={stylesLogIn.formContainer}/>
                        <Button variant="contained" size="medium" sx={stylesLogIn.formContainer}>Login</Button>
                    </FormGroup>
                    <Typography variant="body2" component="p">Forgot password? <b>Reset</b></Typography>
                    <Typography variant="body2" component="p">Don’t have an account? <b>Signup</b></Typography>

                </CardContent>

            </Card>

        </div>
    )
}