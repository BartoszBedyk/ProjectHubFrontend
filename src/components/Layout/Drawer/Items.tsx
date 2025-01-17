import React, { useEffect, useState } from 'react';
import { Collapse, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import useNavLinks, { NavLink } from "./navLinks";
import { api } from "../../../api/AppApi";
import { getUserId } from "../../../storage/AuthStorage";
import { ProjectEnvironmentDto } from "../../../api/project/project-environment/response/ProjectEnvironmentDto";
import { ProjectMemberDto } from "../../../api/project/project-member/response/ProjectMemberDto";
import CustomScrollbar from "./CustomScrollbar";

interface ItemsProps {
    open: boolean;
}

const Items: React.FC<ItemsProps> = ({ open }) => {

    const [envId, setEnvId] = useState<string>();
    const navLinks = useNavLinks();
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
    const { projectId: paramProjectId, environmentId } = useParams<{ projectId?: string; environmentId?: string }>();
    const [projectId, setProjectId] = useState<string | undefined>(paramProjectId);

    const [environments, setEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [member, setMember] = useState<ProjectMemberDto>();

    useEffect(() => {
        const fetchProjectId = async () => {
            if (environmentId) {
                try {
                    setEnvId(environmentId);
                    const environment = await api.projectEnvironment.findById(environmentId);
                    setProjectId(environment.projectId);
                } catch (error) {
                    console.error('Error fetching environment details:', error);
                }
            }
        };

        fetchProjectId();
    }, [environmentId]);

    useEffect(() => {
        if (!open) {
            setOpenItems({});
        }
    }, [open]);

    const handleClick = (name: string) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems,
            [name]: !prevOpenItems[name],
        }));
    };

    useEffect(() => {
        const fetchEnvironments = async () => {
            if (environmentId) {
                setEnvId(environmentId);
                return;
            }
            if (projectId && !environmentId) {
                const response = await api.projectEnvironment.findAll(projectId!);
                setEnvironments(response);
                const responseMember = await api.projectMember.getByIds(getUserId()!, projectId!);
                setMember(responseMember);
                const memberEnvs = responseMember?.environmentIds;
                const commonEnvs = response.filter(env => memberEnvs.includes(env.id));
                setEnvironments(commonEnvs);

                setEnvId(commonEnvs[0].id);
            }
        };
        fetchEnvironments();
    }, [projectId, envId]);

    const isActive = (name: string) => openItems[name];

    const renderListItem = (item: NavLink, isChild: boolean = false) => {
        switch (item.sortName) {
            case 'Main':
                if (projectId) {
                    item.link = `/project/${projectId}`;
                }
                break;
            case 'AllResources':
                if (projectId) {
                    item.link = `/project/${projectId}/${envId}/resources/any`;
                }
                break;
            case 'LinkResources':
                if (projectId) {
                    item.link = `/project/${projectId}/${envId}/resources/link`;
                }
                break;
            case 'DocumentationResources':
                if (projectId) {
                    item.link = `/project/${projectId}/${envId}/resources/text`;
                }
                break;
            case 'FilesResources':
                if (projectId) {
                    item.link = `/project/${projectId}/${envId}/resources/attachment`;
                }
                break;
            case 'SecretResources':
                if (projectId) {
                    item.link = `/project/${projectId}/${envId}/resources/secret`;
                }
                break;
            case 'MemberResources':
                if (projectId) {
                    item.link = `/project-member/${projectId}`;
                }
                break;
        }

        return (
            <ListItem key={item.sortName} disablePadding sx={{ display: 'block', pl: isChild ? 2.5 : 0 }}>
                <ListItemButton
                    component={Link} to={item.link!}
                    onClick={() => item.children ? handleClick(item.sortName) : null}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        p: 2.5,
                        display: "flex",
                        alignItems: "center",
                        color: isActive(item.sortName) ? '#2196f3' : '#e8edf7',
                    }}
                >
                    <ListItemIcon sx={{
                        minWidth: 48,
                        mr: open ? 3 : "auto",
                        justifyContent: 'center',
                        color: isActive(item.sortName) ? '#2196f3' : '#e8edf7',
                    }}
                    >
                        <item.icon style={{ height: 24, width: 24 }} />

                    </ListItemIcon>
                    <ListItemText primary={item.name}
                                  sx={{ opacity: open ? 1 : 0, color: isActive(item.sortName) ? '#2196f3' : '#e8edf7' }} />
                    {open && item.children ? (openItems[item.sortName] ? <ExpandLess /> : <ExpandMore />) : null}
                </ListItemButton>
                {item.children && (
                    <Collapse in={openItems[item.sortName] && open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children.map((child) => renderListItem(child, true))}
                        </List>
                    </Collapse>
                )}
            </ListItem>
        );
    };

    const staticNavLinks = navLinks.filter((item) => item.sortName !== 'Main' && item.sortName !== 'Resources' && item.sortName !== 'MemberResources');
    const dynamicNavLinks = navLinks.filter((item) => item.sortName === 'Main' || item.sortName === 'Resources' || item.sortName === 'MemberResources');

    return (
        <CustomScrollbar>
            <List>
                {staticNavLinks.map((item) => renderListItem(item))}
                {projectId && <Divider sx={{ my: 2, mx: 3 }} />}
                {projectId && dynamicNavLinks.map((item) => renderListItem(item))}
            </List>
        </CustomScrollbar>
    );
};

export default Items;
