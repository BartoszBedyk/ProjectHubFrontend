import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import CreateUserFormComponent from "../../forms/user-management/CreateUserFormComponent";

const CreateUser = () => {
    return (
        <CustomLayout>
            <CreateUserFormComponent/>
        </CustomLayout>
    );
};

export default CreateUser;