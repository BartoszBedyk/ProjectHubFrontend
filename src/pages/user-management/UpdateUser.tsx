import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout/Layout";
import UpdateUserFormComponent from "../../forms/user-management/UpdateUserFormComponent";
import {useNavigate, useParams} from "react-router-dom";
import {Role} from "../../api/project/project-member/response/Role";
import {Container, Typography} from "@mui/material";
import {getUserId} from "../../storage/AuthStorage";
import {api} from "../../api/AppApi";
import {useTranslation} from "react-i18next";
import {TIMEOUTS} from "../../utils/timeouts";

const UpdateUser = () => {

    const { userId } = useParams<{ userId: string }>();
    const [accessDenied, setAccessDenied] = useState<boolean>(false);
    const {t} = useTranslation("userManagement");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUserId = getUserId();
                if (currentUserId) {
                    const user = await api.userManagement.get(currentUserId);

                    if (user.createdById !== "SYSTEM") {
                        setAccessDenied(true);
                        return;
                    }
                } else {
                    setAccessDenied(true);
                }
            } catch (error) {
                console.error('Error fetching current user:', error);
                setAccessDenied(true);
            }
        };

        fetchCurrentUser();
    }, []);

    if (accessDenied) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <Container>
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    {t('accessDenied')}
                </Typography>
            </Container>
        );
    }
    return (
        <CustomLayout>
            <UpdateUserFormComponent userId={userId!}/>
        </CustomLayout>
    );
};

export default UpdateUser;