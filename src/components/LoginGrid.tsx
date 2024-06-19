import React, {ReactNode} from "react";
import {Grid} from "@mui/material";
import styled from "@emotion/styled";
import AnimatedSensilabsLogo from "./AnimatedSensilabsLogo";


export const LoginGrid: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {

    return (
        <div className="login-background">

            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                position="fixed"
                style={{ minHeight: '100vh', backgroundColor: '#f4f7fa' }}
            >
                <AnimatedSensilabsLogo positionX={54.3} positionY={10} size={1.5}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={38} positionY={65} size={2}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={54} positionY={40} size={2.5}></AnimatedSensilabsLogo>



                <AnimatedSensilabsLogo positionX={950} positionY={600} size={2}></AnimatedSensilabsLogo>



                <Grid xs={4}></Grid>

                <Grid xs={4}>{children}</Grid>
                <Grid xs={4}></Grid>

            </Grid>

        </div>
    );
};
