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
    ToggleButtonGroup,
    ToggleButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateProjectForm } from "../../api/project/form/CreateProjectForm";
import { api } from "../../api/AppApi";
import { TechnologyDTO } from "../../api/project/technology/response/TechnologyDTO";
import { CreateTechnologyForm } from "../../api/project/technology/form/CreateTechnologyForm";
import { useNavigate } from 'react-router-dom';
import {useTranslation} from "react-i18next";

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
    const [showExisting, setShowExisting] = useState<string>('new');
    const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyDTO[]>([]);
    const [formError, setFormError] = useState<string | null>(null);
    const [technologyError, setTechnologyError] = useState<string | null>(null);
    const navigate = useNavigate();
    const {t} = useTranslation('projects');

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await api.technology.findAll();
                setExistingTechnologies(response);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTechnology({ ...technology, [name]: value });
    };

    const addTechnology = async () => {
        if (technology.name === '' || technology.description === '') {
            setTechnologyError(t('technologyError'));
            return;
        }

        setTechnologyError(null);
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
        setForm({
            ...form,
            technologyList: [...form.technologyList, tech.id]
        });
    };

    const removeTechnology = (index: number) => {
        const newTechnologyList = form.technologyList.filter((_, i) => i !== index);
        setForm({ ...form, technologyList: newTechnologyList });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.name === '' || form.description === '' || form.technologyList.length === 0) {
            setFormError(t('emptyFieldError'));
            return;
        }

        setFormError(null);
        try {
            const response = await api.project.create(form);
            setForm({
                name: '',
                description: '',
                technologyList: []
            });
            navigate(`/project/${response.id}`);
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleToggleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        if (newAlignment !== null) {
            setShowExisting(newAlignment);
        }
    };

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
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
                    error={!!formError}
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
                    error={!!formError}
                />
                {formError && (
                    <Typography color="error" sx={{ marginTop: 2 }}>
                        {formError}
                    </Typography>
                )}
                <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    {t('addTechnology')}
                </Typography>
                <ToggleButtonGroup
                    value={showExisting}
                    exclusive
                    onChange={handleToggleChange}
                    aria-label="technology type"
                    sx={{ mb: 2, borderRadius: 1 }}
                    size="small"
                >
                    <ToggleButton value="new" aria-label="new technology" sx={{ '&.Mui-selected': { backgroundColor: '#1976d2', color: '#fff' } }}>
                        {t('new')}
                    </ToggleButton>
                    <ToggleButton value="existing" aria-label="existing technology" sx={{ '&.Mui-selected': { backgroundColor: '#1976d2', color: '#fff' } }}>
                        {t('exists')}
                    </ToggleButton>
                </ToggleButtonGroup>
                {showExisting === 'new' ? (
                    <>
                        <TextField
                            id="tech-name"
                            name="name"
                            label={t('technologyName')}
                            value={technology.name}
                            onChange={handleTechnologyChange}
                            error={!!technologyError}
                        />
                        <TextField
                            id="tech-description"
                            name="description"
                            label={t('technologyDescription')}
                            value={technology.description}
                            onChange={handleTechnologyChange}
                            error={!!technologyError}
                        />
                        {technologyError && (
                            <Typography color="error" sx={{ marginTop: 2 }}>
                                {technologyError}
                            </Typography>
                        )}
                        <Button variant="contained" color="primary" onClick={addTechnology} sx={{ mt: 2 }}>
                            {t('addTechnology')}
                        </Button>
                    </>
                ) : (
                    <List>
                        {existingTechnologies.map((tech, index) => (
                            <ListItem
                                key={index}
                                onClick={() => addExistingTechnology(tech)}
                                sx={{ mb: 1, '&:hover': { backgroundColor: '#e3f2fd', cursor: 'pointer' } }}
                            >
                                <ListItemText
                                    primary={tech.name}
                                    secondary={tech.description}
                                />
                            </ListItem>
                        ))}
                    </List>
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
                            sx={{ mb: 1, '&:hover': { backgroundColor: '#e3f2fd' } }}
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
