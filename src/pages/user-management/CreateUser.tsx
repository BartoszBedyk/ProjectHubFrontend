import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout/Layout";
import CreateUserFormComponent from "../../forms/user-management/CreateUserFormComponent";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getUserId} from "../../storage/AuthStorage";
import {api} from "../../api/AppApi";
import {Container, Typography} from "@mui/material";
import {TIMEOUTS} from "../../utils/timeouts";

const CreateUser = () => {
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
            <CreateUserFormComponent/>
        </CustomLayout>
    );
};

export default CreateUser;