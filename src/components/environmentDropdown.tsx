import { FormControl, MenuItem, Select } from "@mui/material";
import { useState, useEffect, SetStateAction } from "react";
import { api } from "../api/AppApi";
import {useNavigate, useParams} from "react-router-dom";
import { ProjectEnvironmentDto } from "../api/project/project-environment/response/ProjectEnvironmentDto";
import {ProjectMemberDto} from "../api/project/project-member/response/ProjectMemberDto";
import {getUserId} from "../storage/AuthStorage";

interface Props {
    environmentId: string;
    projectId: string;
    oldType: string;
}

const EnvironmentDropdown = ({ environmentId, projectId, oldType }: Props) => {
    const [environment, setEnvironment] = useState<string>('');
    const [environments, setEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [member, setMember] = useState<ProjectMemberDto>();
    const navigate = useNavigate();
    const {type} = useParams<string>();
    if(type) oldType = type

    useEffect(() => {
        const fetchEnvironments = async () => {
            try {
                const response = await api.projectEnvironment.findAll(projectId!);
                setEnvironments(response);
                const responseMember = await api.projectMember.getByIds(getUserId()!, projectId!);
                setMember(responseMember);
                const memberEnvs = responseMember?.environmentIds;
                const commonEnvs = response.filter(env => memberEnvs.includes(env.id));
                setEnvironments(commonEnvs);

                if (!environmentId) {
                    navigate(`/project/${projectId}/${commonEnvs[0].id}/resources/${oldType}`);
                    setEnvironment(commonEnvs[0].id);

                }
            } catch (err) {
                console.log("fetchEnvironments error: ",err);
            }
        };

        if (projectId) {
            fetchEnvironments();
        }
    }, [projectId, environmentId, type]);

    useEffect(() => {
        if (environmentId) {
            api.projectEnvironment.findById(environmentId).then(r => setEnvironment(r.id));
        }
    }, [environmentId]);

    const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setEnvironment(event.target.value);
        navigate(`/project/${projectId}/${event.target.value}/resources/${oldType}`);
    };

    return (
        <FormControl>
            <Select
                value={environment}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Select Environment' }}
            >
                {environments.map((env) => (
                    <MenuItem key={env.id} value={env.id}>
                        {env.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export { EnvironmentDropdown };
