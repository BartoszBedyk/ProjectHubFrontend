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
    Slider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateProjectForm } from "../../api/project/form/CreateProjectForm";
import { api } from "../../api/AppApi";
import { TechnologyDTO } from "../../api/project/technology/response/TechnologyDTO";
import { CreateTechnologyForm } from "../../api/project/technology/form/CreateTechnologyForm";

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
    const [showExisting, setShowExisting] = useState<number>(0);
    const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyDTO[]>([]);

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
        try {
            console.log('Adding technology:', technology);
            const createdTechnology = await api.technology.create(technology);
            console.log('Created technology:', createdTechnology);
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
        try {
            const response = await api.project.create(form);
            console.log('Project created:', response);
            setForm({
                name: '',
                description: '',
                technologyList: []
            });
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setShowExisting(newValue as number);
    };

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    Nowy projekt
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
                    label="Nazwa projektu"
                    value={form.name}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    id="description"
                    name="description"
                    label="Opis projektu"
                    multiline
                    rows={4}
                    value={form.description}
                    onChange={handleInputChange}
                />
                <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
                    Dodaj technologie
                </Typography>
                <Slider
                    value={showExisting}
                    onChange={handleSliderChange}
                    aria-labelledby="continuous-slider"
                    valueLabelDisplay="auto"
                    min={0}
                    max={1}
                    step={1}
                    marks={[
                        { value: 0, label: 'Nowe' },
                        { value: 1, label: 'Istniejące' },
                    ]}
                />
                {showExisting === 0 ? (
                    <>
                        <TextField
                            id="tech-name"
                            name="name"
                            label="Nazwa technologii"
                            value={technology.name}
                            onChange={handleTechnologyChange}
                        />
                        <TextField
                            id="tech-description"
                            name="description"
                            label="Opis technologii"
                            value={technology.description}
                            onChange={handleTechnologyChange}
                        />
                        <Button variant="contained" color="primary" onClick={addTechnology} sx={{ mt: 2 }}>
                            Dodaj technologię
                        </Button>
                    </>
                ) : (
                    <List>
                        {existingTechnologies.map((tech, index) => (
                            <ListItem
                                key={index}
                                onClick={() => addExistingTechnology(tech)}
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
                    Wybrane technologie
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
                        >
                            <ListItemText
                                primary={tech.name}
                                secondary={tech.description}
                            />
                        </ListItem>
                    ))}
                </List>
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Utwórz projekt
                </Button>
            </Box>
        </Paper>
    );
};

export default CreateProjectFormComponent;
