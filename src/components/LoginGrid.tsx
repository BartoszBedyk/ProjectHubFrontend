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
                position="inherit"
                style={{ minHeight: '100vh' }}
            >
                <AnimatedSensilabsLogo positionX={1200} positionY={100} size={1.2}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={1100} positionY={220} size={0.5}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={100} positionY={620} size={0.5}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={200} positionY={490} size={1}></AnimatedSensilabsLogo>

                <AnimatedSensilabsLogo positionX={920} positionY={640} size={0.1}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={820} positionY={640} size={0.09}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={700} positionY={640} size={0.09}></AnimatedSensilabsLogo>
                <AnimatedSensilabsLogo positionX={600} positionY={640} size={0.1}></AnimatedSensilabsLogo>


                <Grid xs={4}></Grid>

                <Grid xs={4}>{children}</Grid>
                <Grid xs={4}></Grid>

            </Grid>

        </div>
    );
};
