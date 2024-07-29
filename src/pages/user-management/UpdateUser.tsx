import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import UpdateUserFormComponent from "../../forms/user-management/UpdateUserFormComponent";
import {useParams} from "react-router-dom";

const UpdateUser = () => {

    const { userId } = useParams<{ userId: string }>();

    return (
        <CustomLayout>
            <UpdateUserFormComponent userId={userId!}/>
        </CustomLayout>
    );
};

export default UpdateUser;