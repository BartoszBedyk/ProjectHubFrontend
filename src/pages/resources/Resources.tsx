import React, {useEffect, useState} from 'react';
import CustomLayout from "../../components/Layout/Layout";
import AllResourcesTable from "../../components/TableImpl/AllResourcesTable";
import {useTranslation} from "react-i18next";
import {ResourceType} from "../../api/resources/response/ResourceDto";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, CircularProgress, Container, Icon, Typography} from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {Role} from "../../api/project/project-member/response/Role";
import AuthComponent from "../../components/authComponent";
import NoAccessHandler from "../../components/NoAccesHandler";

function Resources() {
    const {t} = useTranslation("resources");
    let {projectId, type} = useParams<{ projectId: string; type: string }>();
    const navigate = useNavigate();

    const [role, setRole] = useState<Role | null>(null)

    AuthComponent(projectId!).then(r => setRole(r))


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

    const handleCreate = () => {
        navigate(`/project/${projectId}/resources/create`);
    };


    if(role === null) {
        return (<NoAccessHandler data={role}/>)
    }

    return (
        <div><CustomLayout>
            <Box sx={{display: 'flex', justifyContent: 'flex-end', marginBottom: 2, margin: 3}}>
                {role != Role.VISITOR && role != null && (
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
            <AllResourcesTable searchValue={projectId!} resourceType={type as ResourceType}></AllResourcesTable>
        </CustomLayout>

        </div>

    );
}

export default Resources;