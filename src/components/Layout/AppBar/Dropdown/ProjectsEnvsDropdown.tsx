import React, {useState} from 'react';
import {FormControl, SelectChangeEvent} from "@mui/material";
import {CustomSelect} from "./CustomSelect";
import {CustomMenuItem} from "./CustomMenuItem";

const ProjectsEnvsDropdown = () => {
    const [selectedProject, setSelectedProject] = useState<string>("");

    function handleChange(event: SelectChangeEvent<unknown>) {
        setSelectedProject(event.target.value as string);
    }

    return (
        <FormControl
            sx={{
                width: 196,
            }}
        >
            <CustomSelect
                onChange={handleChange}
                displayEmpty
                value={selectedProject}
                renderValue={(selected) => {
                    if (!selected) {
                        return <span>Select a project</span>;
                    }
                    return selected as string;
                }}
            >
                <CustomMenuItem value="Project 1">Project 1</CustomMenuItem>
                <CustomMenuItem value="Project 2">Project 2</CustomMenuItem>
                <CustomMenuItem value="Project 3">Project 3</CustomMenuItem>
            </CustomSelect>
        </FormControl>
    );
};

export default ProjectsEnvsDropdown;