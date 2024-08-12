import React, {useEffect, useState} from 'react';
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Link, useParams} from "react-router-dom";
import useNavLinks, {NavLink} from "./navLinks";
import {api} from "../../../api/AppApi";

interface ItemsProps {
    open: boolean;
}

const Items: React.FC<ItemsProps> = ({open}) => {

    const [envId, setEnvId] = useState<string>()
    const navLinks = useNavLinks();
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
    const { projectId: paramProjectId, environmentId } = useParams<{ projectId?: string; environmentId?: string }>();
    const [projectId, setProjectId] = useState<string | undefined>(paramProjectId);

    useEffect(() => {
        const fetchProjectId = async () => {
            if (environmentId) {
                try {
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
        if(projectId){
            api.projectEnvironment.findAll(projectId!).then(result => {
                setEnvId(result[0].id)
            })
        }

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
            <ListItem key={item.sortName} disablePadding sx={{display: 'block', pl: isChild ? 2.5 : 0}}>
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
                        <item.icon style={{height: 24, width: 24}}/>

                    </ListItemIcon>
                    <ListItemText primary={item.name}
                                  sx={{opacity: open ? 1 : 0, color: isActive(item.sortName) ? '#2196f3' : '#e8edf7'}}/>
                    {open && item.children ? (openItems[item.sortName] ? <ExpandLess/> : <ExpandMore/>) : null}
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

    const filteredNavLinks = navLinks.filter((item) => {
        if (item.sortName === 'Main' || item.sortName === 'Resources') {
            return !!projectId;
        }
        if (item.sortName === "User management" || item.sortName === "Activities") {
            return !projectId;
        }
        return true;
    });

    return (
        <List>
            {filteredNavLinks.map((item) => renderListItem(item))}
        </List>
    );
};

export default Items;