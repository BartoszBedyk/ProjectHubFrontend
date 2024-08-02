import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import ChangeTheme from "../../components/ThemeButton";

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