import React, { useState, useEffect, useRef } from 'react';
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
    ToggleButtonGroup,
    ToggleButton,
    InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { UpdateProjectForm } from "../../api/project/form/UpdateProjectForm";
import { api } from "../../api/AppApi";
import { TechnologyDTO } from "../../api/project/technology/response/TechnologyDTO";
import { CreateTechnologyForm } from "../../api/project/technology/form/CreateTechnologyForm";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import {useTheme} from "@mui/material/styles";

const UpdateProjectFormComponent: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [form, setForm] = useState<UpdateProjectForm>({
        id: projectId,
        name: '',
        description: '',
        technologyList: []
    });

    const [technology, setTechnology] = useState<CreateTechnologyForm>({
        name: '',
        description: ''
    });

    const [existingTechnologies, setExistingTechnologies] = useState<TechnologyDTO[]>([]);
    const [filteredTechnologies, setFilteredTechnologies] = useState<TechnologyDTO[]>([]);
    const [showExisting, setShowExisting] = useState<string>('existing');
    const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyDTO[]>([]);
    const [formErrors, setFormErrors] = useState<{ name?: string; description?: string; technologyList?: string }>({});
    const [technologyErrors, setTechnologyErrors] = useState<{ name?: string; description?: string }>({});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [listVisible, setListVisible] = useState<boolean>(false);
    const navigate = useNavigate();
    const { t } = useTranslation('projects');
    const theme = useTheme();
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await api.technology.findAll();
                setExistingTechnologies(response);
                setFilteredTechnologies(response);
            } catch (error) {
                console.error('Error fetching technologies:', error);
            }
        };

        const fetchProject = async () => {
            try {
                const project = await api.project.get(projectId);

                setForm({
                    id: project.id,
                    name: project.name,
                    description: project.description,
                    technologyList: project.technologies
                });

                const selectedTechs = await Promise.all(
                    project.technologies.map((techId: string) => api.technology.findById(techId))
                );
                setSelectedTechnologies(selectedTechs);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };

        fetchTechnologies();
        fetchProject();
    }, [projectId]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                setListVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTechnology({ ...technology, [name]: value });
    };

    const addTechnology = async () => {
        let hasError = false;
        const newErrors: { name?: string; description?: string } = {};

        if (technology.name === '') {
            newErrors.name = t('technologyNameError');
            hasError = true;
        }

        if (technology.description === '') {
            newErrors.description = t('technologyDescriptionError');
            hasError = true;
        }

        if (hasError) {
            setTechnologyErrors(newErrors);
            return;
        }

        setTechnologyErrors({});
        try {
            const createdTechnology = await api.technology.create(technology);
            setForm({
                ...form,
                technologyList: [...form.technologyList, createdTechnology.id]
            });
            setSelectedTechnologies([...selectedTechnologies, createdTechnology]);
            setTechnology({ name: '', description: '' });
        } catch (error) {
            console.error('Error creating technology:', error);
        }
    };

    const addExistingTechnology = (tech: TechnologyDTO) => {
        if (!form.technologyList.includes(tech.id)) {
            setForm({
                ...form,
                technologyList: [...form.technologyList, tech.id]
            });
            setSelectedTechnologies([...selectedTechnologies, tech]);
        }
        setListVisible(false);
    };

    const removeTechnology = (index: number) => {
        const newTechnologyList = form.technologyList.filter((_, i) => i !== index);
        setForm({ ...form, technologyList: newTechnologyList });

        const newSelectedTechnologies = selectedTechnologies.filter((_, i) => i !== index);
        setSelectedTechnologies(newSelectedTechnologies);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let hasError = false;
        const newFormErrors: { name?: string; description?: string; technologyList?: string } = {};

        if (form.name === '') {
            newFormErrors.name = t('projectNameError');
            hasError = true;
        }

        if (form.description === '') {
            newFormErrors.description = t('projectDescriptionError');
            hasError = true;
        }

        if (form.technologyList.length === 0) {
            newFormErrors.technologyList = t('technologyListError');
            hasError = true;
        }

        if (hasError) {
            setFormErrors(newFormErrors);
            return;
        }

        setFormErrors({});
        try {
            const response = await api.project.update(form);
            navigate(`/project/${response.id}`, { state: { showSnackbarEdit: true } });
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment !== null) {
            setShowExisting(newAlignment);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (term) {
            setFilteredTechnologies(
                existingTechnologies.filter(tech =>
                    tech.name.toLowerCase().includes(term.toLowerCase())
                )
            );
        } else {
            setFilteredTechnologies(existingTechnologies);
        }
    };

    const handleClickInput = () => {
        setListVisible(prev => !prev);
    };

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: theme.palette.primary.main, marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {t('edit')}
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{'& .MuiTextField-root': {m: 1, width: '100%'}, padding: 3}}
                noValidate
                autoComplete="off"
            >
                <TextField
                    required
                    id="name"
                    name="name"
                    label={t('projectName')}
                    value={form.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                />
                <TextField
                    required
                    id="description"
                    name="description"
                    label={t('description')}
                    multiline
                    rows={4}
                    value={form.description}
                    onChange={handleInputChange}
                    error={!!formErrors.description}
                    helperText={formErrors.description}
                />
                <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    {t('chooseTechnology')}
                </Typography>
                    <ToggleButtonGroup
                        value={showExisting}
                        exclusive
                        onChange={handleToggleChange}
                        aria-label="technology type"
                        sx={{ mb: 2, borderRadius: 1 }}
                        size="small"
                    >
                        <ToggleButton value="existing" aria-label="existing technology" sx={{ '&.Mui-selected': { backgroundColor: theme.palette.primary.main, color: '#fff' } }}>
                            {t('exists')}
                        </ToggleButton>
                        <ToggleButton value="new" aria-label="new technology" sx={{ '&.Mui-selected': { backgroundColor: theme.palette.primary.main, color: '#fff' } }}>
                            {t('new')}
                        </ToggleButton>
                    </ToggleButtonGroup>
                    {showExisting === 'existing' ? (
                        <>
                            <TextField
                                id="search"
                                label={t('searchTechnology')}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onClick={handleClickInput}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 2 }}
                                error={!!formErrors.technologyList}
                            />
                            {formErrors.technologyList && (
                                <Typography color="error" sx={{ marginTop: 2 }}>
                                    {formErrors.technologyList}
                                </Typography>
                            )}
                            {listVisible && (
                                <div ref={listRef}>
                                    <List
                                        sx={{
                                            maxHeight: 300,
                                            overflowY: 'auto',
                                            backgroundColor: theme.palette.background.paper,
                                            borderRadius: 1,
                                            border: `1px solid ${theme.palette.divider}`,
                                            mb: 2,
                                            marginLeft: 1
                                        }}
                                    >
                                        {filteredTechnologies.map((tech, index) => (
                                            <ListItem
                                                key={index}
                                                onClick={() => addExistingTechnology(tech)}
                                                sx={{
                                                    mb: 1,
                                                    backgroundColor: form.technologyList.includes(tech.id) ? theme.palette.action.selected : 'inherit',
                                                    '&:hover': {
                                                        backgroundColor: theme.palette.customHover.main,
                                                        cursor: form.technologyList.includes(tech.id) ? 'default' : 'pointer',
                                                    },
                                                    cursor: form.technologyList.includes(tech.id) ? 'default' : 'pointer',
                                                    opacity: form.technologyList.includes(tech.id) ? 0.5 : 1,
                                                }}
                                            >
                                                <ListItemText
                                                    primary={tech.name}
                                                    secondary={tech.description}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <TextField
                                id="tech-name"
                                name="name"
                                label={t('technologyName')}
                                value={technology.name}
                                onChange={handleTechnologyChange}
                                error={!!technologyErrors.name}
                                helperText={technologyErrors.name}
                            />
                            <TextField
                                id="tech-description"
                                name="description"
                                label={t('technologyDescription')}
                                value={technology.description}
                                onChange={handleTechnologyChange}
                                error={!!technologyErrors.description}
                                helperText={technologyErrors.description}
                            />
                            <Button variant="contained" color="primary" onClick={addTechnology} sx={{ mt: 2 }}>
                                {t('addTechnology')}
                            </Button>
                        </>
                    )}
                <Box sx={{ marginTop: 3 }}>
                    <Typography variant="h6">{t('selectedTechnologies')}</Typography>
                    <List>
                        {selectedTechnologies.map((tech, index) => (
                            <ListItem key={tech.id}>
                                <ListItemText primary={tech.name} secondary={tech.description} />
                                <IconButton edge="end" aria-label="delete" onClick={() => removeTechnology(index)}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {formErrors.technologyList && (
                    <Typography color="error" variant="caption">
                        {formErrors.technologyList}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
                    <Button variant="contained" type="submit">
                        {t('edit')}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default UpdateProjectFormComponent;