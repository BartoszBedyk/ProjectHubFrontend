import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { api } from "../../api/AppApi";
import { useTranslation } from "react-i18next";
import { UpdateProjectEnvironmentForm } from "../../api/project/project-environment/form/UpdateProjectEnvironmentForm";

const UpdateProjectEnvironmentFormComponent: React.FC<{ environmentId: string }> = ({ environmentId }) => {
    const { t } = useTranslation('environments');
    const [form, setForm] = useState<UpdateProjectEnvironmentForm>({
        id: environmentId,
        name: '',
        encrypted: false,
    });
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEnvironmentDetails = async () => {
            try {
                const environment = await api.projectEnvironment.findById(environmentId);
                setForm({
                    id: environment.id,
                    name: environment.name,
                    encrypted: environment.encrypted,
                });
            } catch (error) {
                console.error('Error fetching environment details:', error);
            }
        };

        fetchEnvironmentDetails();
    }, [environmentId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setForm({ ...form, [name]: checked });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.name === '') {
            setFormError(t('emptyFieldError'));
            return;
        }

        setFormError(null);
        try {
            await api.projectEnvironment.update(form);
            navigate(`/project-environment/${environmentId}`, { state: { showSnackbarEdit: true } });
        } catch (error) {
            console.error('Error updating environment:', error);
        }
    };

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {t('editEnvironment')}
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
                    label={t('environmentName')}
                    value={form.name}
                    onChange={handleInputChange}
                    error={!!formError}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={form.encrypted}
                            onChange={handleCheckboxChange}
                            name="encrypted"
                            color="primary"
                        />
                    }
                    label={t('encrypted')}
                />
                {formError && (
                    <Typography color="error" sx={{ marginTop: 2 }}>
                        {formError}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, marginTop: 3 }}>
                        {t('updateEnvironment')}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default UpdateProjectEnvironmentFormComponent;