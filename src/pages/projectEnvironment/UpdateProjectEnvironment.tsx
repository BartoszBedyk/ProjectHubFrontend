import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import CustomLayout from "../../components/Layout/Layout";
import UpdateProjectEnvironmentFormComponent
    from "../../forms/projectEnvironment/UpdateProjectEnvironmentFormComponent";
import {useTranslation} from "react-i18next";
import {Role} from "../../api/project/project-member/response/Role";
import {ProjectDTO} from "../../api/project/response/ProjectDTO";
import {api} from "../../api/AppApi";
import {getUserRole} from "../../components/authComponent";
import {Box, CircularProgress, Container, Typography} from "@mui/material";

const UpdateProjectEnvironment: React.FC = () => {
    const { environmentId } = useParams<{ environmentId: string }>();
    const { t } = useTranslation('projects');
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnvironmentDetails = async () => {
            try {
                const environmentResponse = await api.projectEnvironment.findById(environmentId!);

                const projectResponse = await api.project.get(environmentResponse.projectId);
                setProject(projectResponse);

                const role = await getUserRole(environmentResponse.projectId);
                setCurrentUserRole(role);
            } catch (error) {
                console.error('Error fetching project environment:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnvironmentDetails();
    }, [environmentId]);

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
        return (
            <CustomLayout>
                <Container>
                    <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                        {t('notFound')}
                    </Typography>
                </Container>
            </CustomLayout>
        );
    }

    if (project.deletedOn != null && !isAdmin) {
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

    if (currentUserRole === null || currentUserRole === Role.MAINTAINER || currentUserRole === Role.VISITOR) {
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
            <UpdateProjectEnvironmentFormComponent environmentId={environmentId!} />
        </CustomLayout>
    );
}

export default UpdateProjectEnvironment;