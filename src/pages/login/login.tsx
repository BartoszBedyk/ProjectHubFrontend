import React from 'react';
import {LoginGrid} from "../../components/Login/LoginGrid";
import {LogInCard} from "../../components/Login/LogInCard";
import LoginThemeProvider from "../../LoginTheme";

function Login() {
    return (
        <LoginThemeProvider>
            <LoginGrid>
                <LogInCard></LogInCard>
            </LoginGrid>
        </LoginThemeProvider>
    );
}

export default Login;