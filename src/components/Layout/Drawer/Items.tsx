import React, {useEffect, useState} from 'react';
import navLinks, {NavLink} from "./navLinks";
import {Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {Link, useParams} from "react-router-dom";

interface ItemsProps {
    open: boolean;
}


const Items: React.FC<ItemsProps> = ({ open }) => {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});
    const { projectId } = useParams<{projectId: string}>();

    useEffect(() => {
        if(!open) {
            setOpenItems({})
        }
    }, [open]);

    const handleClick = (name: string) => {
        setOpenItems((prevOpenItems) => ({
            ...prevOpenItems,
            [name]: !prevOpenItems[name],
        }));
    };

    const isActive = (name: string) => openItems[name];

    const renderListItem = (item: NavLink, isChild: boolean = false) => {
        if (item.name === 'Main' && projectId) {
            item.link = `/project/${projectId}`;
        }


        return (
            <ListItem key={item.name} disablePadding sx={{display: 'block', pl: isChild ? 2.5 : 0}}>
                <ListItemButton
                    component={Link} to={item.link!}
                    onClick={() => item.children ? handleClick(item.name) : null}
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        p: 2.5,
                        display: "flex",
                        alignItems: "center",
                        color: isActive(item.name) ? '#2196f3' : '#e8edf7',
                    }}
                >
                    <ListItemIcon sx={{
                        minWidth: 48,
                        mr: open ? 3 : "auto",
                        justifyContent: 'center',
                        color: isActive(item.name) ? '#2196f3' : '#e8edf7',
                    }}
                    >
                        <img src={item.icon} alt={item.name} style={{height: 24, width: 24}}/>
                    </ListItemIcon>
                    <ListItemText primary={item.name}
                                  sx={{opacity: open ? 1 : 0, color: isActive(item.name) ? '#2196f3' : '#e8edf7'}}/>
                    {open && item.children ? (openItems[item.name] ? <ExpandLess/> : <ExpandMore/>) : null}
                </ListItemButton>
                {item.children && (
                    <Collapse in={openItems[item.name] && open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children.map((child) => renderListItem(child, true))}
                        </List>
                    </Collapse>
                )}
            </ListItem>
        );
    };

    const filteredNavLinks = navLinks.filter((item) => {
       if (item.name === 'Main' || item.name === 'Resources') {
           return !!projectId;
       }
        if (item.name === "User management" || item.name === "Activities") {
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