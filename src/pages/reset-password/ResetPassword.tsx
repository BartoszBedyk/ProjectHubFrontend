import React from 'react';
import {LoginGrid} from "../../components/Login/LoginGrid";
import {LogInCard} from "../../components/Login/LogInCard";
import LoginThemeProvider from "../../LoginTheme";
import {ResetPasswordFormComponent} from "../../components/Login/ResetPasswordFormComponent";

function ResetPassword() {
    return (
       <ResetPasswordFormComponent></ResetPasswordFormComponent>
    );
}

export default ResetPassword;