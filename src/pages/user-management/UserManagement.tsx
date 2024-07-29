import React from 'react';
import UsersTable from "../../components/TableImpl/UsersTable";
import CustomLayout from "../../components/Layout/Layout";
import {Box, Button} from "@mui/material";
import {useNavigate} from "react-router-dom";

const UserManagement = () => {

    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/user/create");
    }

    return (
        <CustomLayout>
            <UsersTable searchValue='' />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={handleOnClick} type="submit" variant="contained" color="primary" sx={{ mr: 3 }}>
                    Create User
                </Button>
            </Box>
        </CustomLayout>
    );
};

export default UserManagement;