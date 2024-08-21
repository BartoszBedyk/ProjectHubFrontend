import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    SelectChangeEvent,
    Checkbox,
    FormControlLabel
} from '@mui/material';
import { api } from "../../api/AppApi";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Role } from "../../api/project/project-member/response/Role";
import { UpdateProjectMemberForm } from "../../api/project/project-member/form/UpdateProjectMemberForm";
import { ProjectEnvironmentDto } from "../../api/project/project-environment/response/ProjectEnvironmentDto";
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import { useTheme } from "@mui/material/styles";

const UpdateProjectMemberFormComponent: React.FC<{ projectId: string, userId: string }> = ({ projectId, userId }) => {
    const [form, setForm] = useState<UpdateProjectMemberForm>({
        userId: '',
        projectId: '',
        role: Role.VISITOR,
        environmentIds: []
    });

    const [existingEnvironments, setExistingEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [projectMember, setProjectMember] = useState<ProjectMemberDto | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation('members');
    const theme = useTheme();
    const { t: t2 } = useTranslation('roles');

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

    const handleEnvironmentChange = (envId: string) => {
        const updatedEnvironmentIds = form.environmentIds.includes(envId)
            ? form.environmentIds.filter(id => id !== envId)
            : [...form.environmentIds, envId];

        setForm(prevForm => ({ ...prevForm, environmentIds: updatedEnvironmentIds }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.userId === '' || form.environmentIds.length === 0) {
            setFormError(t('emptyFieldError'));
            return;
        }

        try {
            const response = await api.projectMember.update(form);
            navigate(`/project-member/${projectId}/${response.userId}`, { state: { showSnackbarEdit: true } });
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
                <Box sx={{ padding: 2 }}>
                    <Typography variant="h6" component="div">
                        {t('projectMemberName')}: {projectMember.firstName} {projectMember.lastName}
                    </Typography>
                </Box>
            )}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, padding: 2 }}
                noValidate
                autoComplete="off"
            >
                <FormControl fullWidth sx={{ mt: 0.5 }}>
                    <InputLabel id="role-select-label">{t('selectRole')}</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleRoleChange}
                    >
                        <MenuItem value={Role.OWNER}>{t2(Role.OWNER)}</MenuItem>
                        <MenuItem value={Role.MAINTAINER}>{t2(Role.MAINTAINER)}</MenuItem>
                        <MenuItem value={Role.VISITOR}>{t2(Role.VISITOR)}</MenuItem>
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
                    {existingEnvironments.map(env => (
                        <ListItem key={env.id}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={form.environmentIds.includes(env.id)}
                                        onChange={() => handleEnvironmentChange(env.id)}
                                    />
                                }
                                label={env.name}
                            />
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

