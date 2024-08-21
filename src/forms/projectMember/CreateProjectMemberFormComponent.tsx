import React, {useState, useEffect} from 'react';
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
import {api} from "../../api/AppApi";
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Role} from "../../api/project/project-member/response/Role";
import {CreateProjectMemberForm} from "../../api/project/project-member/form/CreateProjectMemberForm";
import {ProjectEnvironmentDto} from "../../api/project/project-environment/response/ProjectEnvironmentDto";
import {UserDto} from "../../api/user-management/response/UserDto";
import {SearchForm} from "../../commons/Search/SearchForm";
import {SearchSortOrder} from "../../commons/Search/SearchSortOrder";
import {ProjectMemberDto} from "../../api/project/project-member/response/ProjectMemberDto";
import {CriteriaOperator} from "../../commons/Search/CriteriaOperator";
import {useTheme} from "@mui/material/styles";

const CreateProjectMemberFormComponent: React.FC<{ projectId: string }> = ({projectId}) => {
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
    const navigate = useNavigate();
    const {t} = useTranslation('members');
    const theme = useTheme()

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await api.projectEnvironment.findAll(projectId);
                setExistingEnvironments(response);
            } catch (error) {
                console.error('Error fetching environments:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const environments = await api.projectEnvironment.findAll(projectId);
                setExistingEnvironments(environments);

                const searchForm: SearchForm = {
                    criteria: [
                        {
                            fieldName: 'deletedOn',
                            value: null,
                            operator: CriteriaOperator.EQUALS
                        }
                    ],
                    page: 1,
                    size: 50,
                    sort: {by: 'firstName', order: SearchSortOrder.ASC}
                };
                const usersResponse = await api.userManagement.search(searchForm);
                setUsers(usersResponse.items);

                const members = await api.projectMember.getByProjectId(projectId);
                setExistingMembers(members);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        fetchUsers();
        fetchInitialData();
    }, [projectId]);

    useEffect(() => {
        const fetchSelectedEnvironments = async () => {
            const environments = await Promise.all(
                form.environmentIds.map(envId => api.projectEnvironment.findById(envId))
            );
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
        setForm(prevForm => ({...prevForm, role: event.target.value as Role}));
    };

    const handleUserChange = (event: SelectChangeEvent<string>) => {
        const userId = event.target.value as string;
        const selectedUser = users.find(user => user.id === userId);
        if (selectedUser) {
            setForm(prevForm => ({
                ...prevForm,
                userId,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName
            }));
        }
    };

    const addExistingEnvironment = (env: ProjectEnvironmentDto) => {
        setForm(prevForm => ({
            ...prevForm,
            environmentIds: [...prevForm.environmentIds, env.id]
        }));
    };

    const removeEnvironment = (index: number) => {
        setForm(prevForm => ({
            ...prevForm,
            environmentIds: prevForm.environmentIds.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.userId === '' || form.environmentIds.length === 0) {
            setFormError(t('emptyFieldError'));
            return;
        }

        try {
            const isUserAlreadyMember = existingMembers.some(member => member.userId === form.userId);

            if (isUserAlreadyMember) {
                setUserError(t('userAlreadyInProject'));
                return;
            }

            setUserError(null);
            setFormError(null);

            const response = await api.projectMember.create(form);
            setForm({
                firstName: '',
                lastName: '',
                role: Role.VISITOR,
                projectId: projectId,
                userId: '',
                environmentIds: []
            });
            navigate(`/project-member/${projectId}/${response.userId}`, {state: {showSnackbarCreate: true}});
        } catch (error) {
            console.error('Error creating project member:', error);
        }
    };

    return (
        <Paper sx={{width: 'auto', mb: 2, margin: 3}}>
            <Box sx={{display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2}}>
                <Box sx={{width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2}}/>
                <Typography variant="h5" component="div">
                    {t('newMember')}
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{'& .MuiTextField-root': {m: 1, width: '100%'}, padding: 3}}
                noValidate
                autoComplete="off"
            >
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel id="user-select-label">{t('selectUser')}</InputLabel>
                    <Select
                        labelId="user-select-label"
                        id="userId"
                        name="userId"
                        value={form.userId}
                        onChange={handleUserChange}
                        error={!!userError}
                        label={t('selectUser')}
                    >
                        {filteredUsers.map(user => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.firstName} {user.lastName} ({user.email})
                            </MenuItem>
                        ))}
                    </Select>
                    {userError && (
                        <Typography color="error" sx={{marginTop: 2}}>
                            {userError}
                        </Typography>
                    )}
                </FormControl>
                <FormControl fullWidth sx={{mt: 2}}>
                    <InputLabel id="role-select-label">{t('selectRole')}</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleRoleChange}
                        label={t('selectRole')}
                    >
                        <MenuItem value={Role.OWNER}>{t('owner')}</MenuItem>
                        <MenuItem value={Role.MAINTAINER}>{t('maintainer')}</MenuItem>
                        <MenuItem value={Role.VISITOR}>{t('visitor')}</MenuItem>
                    </Select>
                </FormControl>
                {formError && (
                    <Typography color="error" sx={{marginTop: 2}}>
                        {formError}
                    </Typography>
                )}
                <Typography variant="h6" gutterBottom sx={{marginTop: 3}}>
                    {t('selectEnvironments')}
                </Typography>
                <List>
                    {existingEnvironments.map(env => (
                        <ListItem
                            key={env.id}
                            onClick={() => addExistingEnvironment(env)}
                            sx={{mb: 1, '&:hover': {backgroundColor: theme.palette.customHover.main}}}
                        >
                            <ListItemText
                                primary={env.name}
                            />
                        </ListItem>
                    ))}
                </List>
                <Typography variant="h6" gutterBottom sx={{marginTop: 3}}>
                    {t('selectedEnvironments')}
                </Typography>
                <List>
                    {selectedEnvironments.map((env, index) => (
                        <ListItem
                            key={env.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => removeEnvironment(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                            sx={{mb: 1, '&:hover': {backgroundColor: theme.palette.customHover.main}}}
                        >
                            <ListItemText
                                primary={env.name}
                            />
                        </ListItem>
                    ))}
                </List>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                        {t('createProjectMember')}
                    </Button>
                </div>
            </Box>
        </Paper>
    );
};

export default CreateProjectMemberFormComponent;
