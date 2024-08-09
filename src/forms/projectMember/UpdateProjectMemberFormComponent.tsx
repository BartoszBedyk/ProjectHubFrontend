import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Paper,
    IconButton,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { api } from "../../api/AppApi";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Role } from "../../api/project/project-member/response/Role";
import { UpdateProjectMemberForm } from "../../api/project/project-member/form/UpdateProjectMemberForm";
import { ProjectEnvironmentDto } from "../../api/project/project-environment/response/ProjectEnvironmentDto";
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";

const UpdateProjectMemberFormComponent: React.FC<{ projectId: string, userId: string }> = ({ projectId, userId }) => {
    const [form, setForm] = useState<UpdateProjectMemberForm>({
        userId: '',
        projectId: '',
        role: Role.VISITOR,
        environmentIds: []
    });

    const [existingEnvironments, setExistingEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [selectedEnvironments, setSelectedEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [projectMember, setProjectMember] = useState<ProjectMemberDto | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation('members');

    useEffect(() => {
        const fetchEnvironments = async () => {
            try {
                const response = await api.projectEnvironment.findAll(projectId);
                setExistingEnvironments(response);
            } catch (error) {
                console.error('Error fetching environments:', error);
            }
        };

        const fetchProjectMember = async () => {
            try {
                const response = await api.projectMember.getByIds(userId, projectId);
                setForm({
                    userId: response.userId,
                    projectId: response.projectId,
                    role: response.role,
                    environmentIds: response.environmentIds
                });
                setProjectMember(response);

                const selectedEnvs = await Promise.all(
                    response.environmentIds.map(async (envId) => {
                        try {
                            return await api.projectEnvironment.findById(envId);
                        } catch (error) {
                            console.error(`Error fetching environment with id ${envId}:`, error);
                            return null;
                        }
                    })
                );
                setSelectedEnvironments(selectedEnvs.filter((env) => env !== null) as ProjectEnvironmentDto[]);

            } catch (error) {
                console.error('Error fetching project member:', error);
            }
        };

        fetchEnvironments();
        fetchProjectMember();
    }, [projectId, userId]);

    const handleRoleChange = (event: SelectChangeEvent<Role>) => {
        setForm({ ...form, role: event.target.value as Role });
    };

    const addExistingEnvironment = (env: ProjectEnvironmentDto) => {
        if (!form.environmentIds.includes(env.id)) {
            setForm({
                ...form,
                environmentIds: [...form.environmentIds, env.id]
            });
            setSelectedEnvironments((prev) => [...prev, env]);
        }
    };

    const removeEnvironment = (index: number) => {
        const newEnvironmentIds = form.environmentIds.filter((_, i) => i !== index);
        setForm({ ...form, environmentIds: newEnvironmentIds });
        setSelectedEnvironments((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.userId === '' || form.environmentIds.length === 0) {
            setFormError(t('emptyFieldError'));
            return;
        }

        try {
            const response = await api.projectMember.update(form);
            navigate(`/project-member/${projectId}/${response.userId}`);
        } catch (error) {
            console.error('Error updating project member:', error);
        }
    };

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {t('editProjectMember')}
                </Typography>
            </Box>
            {projectMember && (
                <Box sx={{ padding: 3 }}>
                    <Typography variant="h6" component="div">
                        {t('projectMemberName')}: {projectMember.firstName} {projectMember.lastName}
                    </Typography>
                </Box>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, padding: 3 }}
                noValidate
                autoComplete="off"
            >
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="role-select-label">{t('selectRole')}</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleRoleChange}
                    >
                        <MenuItem value={Role.OWNER}>{t('owner')}</MenuItem>
                        <MenuItem value={Role.MAINTAINER}>{t('maintainer')}</MenuItem>
                        <MenuItem value={Role.VISITOR}>{t('visitor')}</MenuItem>
                    </Select>
                </FormControl>
                {formError && (
                    <Typography color="error" sx={{ marginTop: 2 }}>
                        {formError}
                    </Typography>
                )}
                <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    {t('selectEnvironments')}
                </Typography>
                <List>
                    {existingEnvironments.map((env) => (
                        <ListItem
                            key={env.id}
                            onClick={() => addExistingEnvironment(env)}
                            sx={{ mb: 1, '&:hover': { backgroundColor: '#e3f2fd', cursor: 'pointer' } }}
                        >
                            <ListItemText primary={env.name} />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    {t('selectedEnvironments')}
                </Typography>
                <List>
                    {selectedEnvironments.map((env, index) => (
                        <ListItem
                            key={env.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => removeEnvironment(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            sx={{ mb: 1, '&:hover': { backgroundColor: '#e3f2fd' } }}
                        >
                            <ListItemText primary={env.name} />
                        </ListItem>
                    ))}
                </List>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {t('updateProjectMember')}
                </Button>
            </Box>
        </Paper>
    );
};

export default UpdateProjectMemberFormComponent;
