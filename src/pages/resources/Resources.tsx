import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout/Layout";
import AllResourcesTable from "../../components/TableImpl/AllResourcesTable";
import {useTranslation} from "react-i18next";
import {ResourceType} from "../../api/resources/response/ResourceDto";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CircularProgress, Container, Icon, Typography} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {Role} from "../../api/project/project-member/response/Role";
import {EnvironmentDropdown} from "../../components/environmentDropdown";
import {api} from "../../api/AppApi";
import {ProjectDTO} from "../../api/project/response/ProjectDTO";
import {getUserRole} from "../../components/authComponent";
import {TIMEOUTS} from "../../utils/timeouts";

function Resources() {
    const {t} = useTranslation("resources");
    let {projectId,environmentId, type } = useParams<{ projectId: string; environmentId:string; type: string }>();
    const navigate = useNavigate();
    const[stringType, setStringType] = useState<string>(type!);
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
    const [project, setProject] = useState<ProjectDTO | null>(null);
    const [loading, setLoading] = useState(true);

    switch (type) {
        case "link": {
            type = ResourceType.link;
            break;
        }
        case "secret": {
            type = ResourceType.secret;
            break;
        }
        case "text": {
            type = ResourceType.text;
            break;
        }
        case "attachment": {
            type = ResourceType.attachment;
            break;
        }
        default:
            type = "";
    }
    const [environment, setEnvironment] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                if (environmentId) {
                    const environmentResponse = await api.projectEnvironment.findById(environmentId!);
                    setEnvironment(environmentResponse.id);
                }
                const projectResponse = await api.project.get(projectId!);
                setProject(projectResponse);

                const role = await getUserRole(projectId!);
                setCurrentUserRole(role);
            } catch (error) {
                console.error('Error fetching project details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [environmentId, projectId]);


    const handleCreate = () => {
        navigate(`/project/${projectId}/${environmentId}/resources/create`);
    };
    const isAdmin = currentUserRole === Role.ADMIN;

    if (loading) {
        return (
            <CustomLayout>
                <Container>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                        <CircularProgress/>
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

    if (currentUserRole === null) {
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
            <EnvironmentDropdown environmentId={environment!} projectId={projectId!} oldType={stringType!}></EnvironmentDropdown>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: 2, margin: 3}}>
                {currentUserRole != Role.VISITOR && currentUserRole != null && (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCreate}
                            title={t('createProject')}
                        >
                            <Icon
                                style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                            >
                                <LibraryAddIcon></LibraryAddIcon>
                            </Icon>
                        </Button>
                    </>
                )}

            </Box>
            <AllResourcesTable searchValue={projectId!} resourceType={type as ResourceType} environmentId ={environmentId!}></AllResourcesTable>
        </CustomLayout>



    );
}

export default Resources;