import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
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
import { CreateProjectMemberForm } from "../../api/project/project-member/form/CreateProjectMemberForm";
import { ProjectEnvironmentDto } from "../../api/project/project-environment/response/ProjectEnvironmentDto";
import { UserDto } from "../../api/user-management/response/UserDto";
import { SearchForm } from "../../commons/Search/SearchForm";
import { SearchSortOrder } from "../../commons/Search/SearchSortOrder";
import { ProjectMemberDto } from "../../api/project/project-member/response/ProjectMemberDto";
import { getUserId } from "../../storage/AuthStorage";

const CreateProjectMemberFormComponent: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [form, setForm] = useState<CreateProjectMemberForm>({
        firstName: '',
        lastName: '',
        role: Role.VISITOR,
        projectId: projectId,
        userId: '',
        environmentIds: []
    });

    const [existingEnvironments, setExistingEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [selectedEnvironments, setSelectedEnvironments] = useState<ProjectEnvironmentDto[]>([]);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<UserDto[]>([]);
    const [existingMembers, setExistingMembers] = useState<ProjectMemberDto[]>([]);
    const [formError, setFormError] = useState<string | null>(null);
    const [userError, setUserError] = useState<string | null>(null);
    const [currentUserRole, setCurrentUserRole] = useState<Role | null>(null);
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

        const fetchUsers = async () => {
            try {
                const searchForm: SearchForm = {
                    criteria: [],
                    page: 1,
                    size: 50,
                    sort: { by: 'firstName', order: SearchSortOrder.ASC }
                };
                const response = await api.userManagement.search(searchForm);
                setUsers(response.items);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchExistingMembers = async () => {
            try {
                const response = await api.projectMember.getByProjectId(projectId);
                setExistingMembers(response);
            } catch (error) {
                console.error('Error fetching existing project members:', error);
            }
        };

        const fetchCurrentUserRole = async () => {
            try {
                const currentUserId = getUserId();
                if (currentUserId) {
                    const currentUserResponse = await api.projectMember.getByIds(currentUserId, projectId);
                    setCurrentUserRole(currentUserResponse.role);
                }
            } catch (error) {
                console.error('Error fetching current user role:', error);
            }
        };

        fetchEnvironments();
        fetchUsers();
        fetchExistingMembers();
        fetchCurrentUserRole();
    }, [projectId]);

    useEffect(() => {
        const fetchSelectedEnvironments = async () => {
            const environments: ProjectEnvironmentDto[] = [];
            for (const envId of form.environmentIds) {
                try {
                    const response = await api.projectEnvironment.findById(envId);
                    environments.push(response);
                } catch (error) {
                    console.error(`Error fetching environment with id ${envId}:`, error);
                }
            }
            setSelectedEnvironments(environments);
        };

        if (form.environmentIds.length > 0) {
            fetchSelectedEnvironments();
        } else {
            setSelectedEnvironments([]);
        }
    }, [form.environmentIds]);

    useEffect(() => {
        const filtered = users.filter(user => !existingMembers.some(member => member.userId === user.id));
        setFilteredUsers(filtered);
    }, [users, existingMembers]);

    const handleRoleChange = (event: SelectChangeEvent<Role>) => {
        setForm({ ...form, role: event.target.value as Role });
    };

    const handleUserChange = (event: SelectChangeEvent<string>) => {
        const userId = event.target.value as string;
        const selectedUser = users.find(user => user.id === userId);
        if (selectedUser) {
            setForm({
                ...form,
                userId,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName
            });
        }
    };

    const addExistingEnvironment = (env: ProjectEnvironmentDto) => {
        setForm({
            ...form,
            environmentIds: [...form.environmentIds, env.id]
        });
    };

    const removeEnvironment = (index: number) => {
        const newEnvironmentIds = form.environmentIds.filter((_, i) => i !== index);
        setForm({ ...form, environmentIds: newEnvironmentIds });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.userId === '' || form.environmentIds.length === 0) {
            setFormError(t('emptyFieldError'));
            return;
        }

        try {
            const existingMembers = await api.projectMember.getByProjectId(projectId);
            const isUserAlreadyMember = existingMembers.some(member => member.userId === form.userId);

            if (isUserAlreadyMember) {
                setUserError(t('userAlreadyInProject'));
                return;
            }

            setUserError(null);
            setFormError(null);

            const response = await api.projectMember.create(form);
            console.log('Project member created:', response);
            setForm({
                firstName: '',
                lastName: '',
                role: Role.VISITOR,
                projectId: projectId,
                userId: '',
                environmentIds: []
            });
            navigate(`/project-member/${projectId}/${response.userId}`);
        } catch (error) {
            console.error('Error creating project member:', error);
        }
    };

    if (currentUserRole !== Role.OWNER) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                {t('noPermission')}
            </Typography>
        );
    }

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {t('newMember')}
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, padding: 3 }}
                noValidate
                autoComplete="off"
            >
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="user-select-label">{t('selectUser')}</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="userId"
                        name="userId"
                        value={form.userId}
                        onChange={handleUserChange}
                        error={!!userError}
                    >
                        {filteredUsers.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.firstName} {user.lastName} ({user.email})
                            </MenuItem>
                        ))}
                    </Select>
                    {userError && (
                        <Typography color="error" sx={{ marginTop: 2 }}>
                            {userError}
                        </Typography>
                    )}
                </FormControl>
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
                    {existingEnvironments.map((env, index) => (
                        <ListItem
                            key={index}
                            onClick={() => addExistingEnvironment(env)}
                            sx={{ mb: 1, '&:hover': { backgroundColor: '#e3f2fd', cursor: 'pointer' } }}
                        >
                            <ListItemText
                                primary={env.name}
                            />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    {t('selectedEnvironments')}
                </Typography>
                <List>
                    {selectedEnvironments.map((env, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => removeEnvironment(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            sx={{ mb: 1, '&:hover': { backgroundColor: '#e3f2fd' } }}
                        >
                            <ListItemText
                                primary={env.name}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {t('createProjectMember')}
                </Button>
            </Box>
        </Paper>
    );
};

export default CreateProjectMemberFormComponent;
