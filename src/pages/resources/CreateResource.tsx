import {useNavigate, useParams} from "react-router-dom";
import CustomLayout from "../../components/Layout/Layout";
import React, {useEffect, useState} from "react";
import {CreateResourceFormComponent} from "../../forms/resources/CreateResourceFormComponent";
import {Role} from "../../api/project/project-member/response/Role";
import {ProjectDTO} from "../../api/project/response/ProjectDTO";
import {api} from "../../api/AppApi";
import {getUserRole} from "../../components/authComponent";
import {Box, CircularProgress, Container, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {TIMEOUTS} from "../../utils/timeouts";

export function CreateResource() {
    let {projectId} = useParams();
    let {environmentId} = useParams();
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation('resources');
    const navigate = useNavigate();



    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const projectResponse = await api.project.get(projectId!);
                setProject(projectResponse);

                const role = await getUserRole(projectId!);
                setCurrentUserRole(role);
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [projectId]);

    const isAdmin = currentUserRole === Role.ADMIN;

    if (loading) {
        return (
            <CustomLayout>
                <Container>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </Box>
                </Container>
            </CustomLayout>
        );
    }

    if (!project) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('notFound2')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    if (project.deletedOn != null && !isAdmin) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('deleted')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    if (currentUserRole === null || currentUserRole === Role.VISITOR) {
        setTimeout(() => { navigate("/"); }, TIMEOUTS.REDIRECT_DELAY);
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('noAccess')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    return (
        <CustomLayout>
            <CreateResourceFormComponent projectId={projectId!}
                                         environmentId={environmentId!}></CreateResourceFormComponent>
        </CustomLayout>
    );
}