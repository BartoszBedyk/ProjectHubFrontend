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
import { CreateProjectForm } from "../../api/project/form/CreateProjectForm";
import { api } from "../../api/AppApi";
import { TechnologyDTO } from "../../api/project/technology/response/TechnologyDTO";
import { CreateTechnologyForm } from "../../api/project/technology/form/CreateTechnologyForm";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useTheme } from '@mui/material/styles';

const CreateProjectFormComponent: React.FC = () => {
    const [form, setForm] = useState<CreateProjectForm>({
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

        fetchTechnologies();
    }, []);

    useEffect(() => {
        const fetchSelectedTechnologies = async () => {
            const technologies: TechnologyDTO[] = [];
            for (const techId of form.technologyList) {
                try {
                    const response = await api.technology.findById(techId);
                    technologies.push(response);
                } catch (error) {
                    console.error(`Error fetching technology with id ${techId}:`, error);
                }
            }
            setSelectedTechnologies(technologies);
        };

        if (form.technologyList.length > 0) {
            fetchSelectedTechnologies();
        } else {
            setSelectedTechnologies([]);
        }
    }, [form.technologyList]);

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
        }
        setListVisible(false);
    };

    const removeTechnology = (index: number) => {
        const newTechnologyList = form.technologyList.filter((_, i) => i !== index);
        setForm({ ...form, technologyList: newTechnologyList });
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
            const response = await api.project.create(form);
            setForm({
                name: '',
                description: '',
                technologyList: []
            });
            navigate(`/project/${response.id}`, { state: { showSnackbarCreate: true } });
        } catch (error) {
            console.error('Error creating project:', error);
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
                    {t('newProject')}
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, padding: 3 }}
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
                                            button
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
                <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    {t('selectedTechnologies')}
                </Typography>
                <List>
                    {selectedTechnologies.map((tech, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={() => removeTechnology(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            sx={{ mb: 1, '&:hover': { backgroundColor: theme.palette.customHover.main } }}
                        >
                            <ListItemText
                                primary={tech.name}
                                secondary={tech.description}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {t('createProject')}
                </Button>
            </Box>
        </Paper>
    );
};

export default CreateProjectFormComponent;
