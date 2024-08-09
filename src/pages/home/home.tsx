import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import ChangeTheme from "../../components/Settings/ThemeButton";
import DeleteDialog from "../../components/dialogs/DeleteDialog";
import {api} from "../../api/AppApi";

function HomePage() {
    return (
        <CustomLayout>
            <h1>TEST</h1>
            <h2>TEST</h2>
            <h3>lorem ipsum</h3>
            <ChangeTheme />
        </CustomLayout>
    );
}

export default HomePage;