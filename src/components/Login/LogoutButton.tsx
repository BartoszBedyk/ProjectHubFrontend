import {api} from "../../api/AppApi";
import {Navigate, redirect} from "react-router-dom";
import React from "react";

const logout = async () => {

      await api.loginPassAuth.logout().then(r => r)
        .catch(e => console.log(e, "Idk ale działa"));
    localStorage.clear();
    window.location.reload();

    return (<Navigate to="/auth/login" />);
}

export default logout;