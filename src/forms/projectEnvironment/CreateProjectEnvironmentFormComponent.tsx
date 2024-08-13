import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { api } from "../../api/AppApi";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { CreateProjectEnvironmentForm } from "../../api/project/project-environment/form/CreateProjectEnvironmentForm";

const CreateProjectEnvironmentFormComponent: React.FC<{ projectId: string }> = ({ projectId }) => {
    const [form, setForm] = useState<CreateProjectEnvironmentForm>({
        name: '',
        isEncrypted: false,
        projectId: projectId,
    });

    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { t } = useTranslation('environments');

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
            const response = await api.projectEnvironment.create(form);
            setForm({
                name: '',
                isEncrypted: false,
                projectId: form.projectId,
            });
            navigate(`/project-environment/${response.id}`, { state: { showSnackbarCreate: true } });
        } catch (error) {
            console.error('Error creating environment:', error);
        }
    };

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, paddingTop: 4, paddingRight: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {t('newEnvironment')}
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
                            checked={form.isEncrypted}
                            onChange={handleCheckboxChange}
                            name="isEncrypted"
                            color="primary"
                        />
                    }
                    label={t('isEncrypted')}
                />
                {formError && (
                    <Typography color="error" sx={{ marginTop: 2 }}>
                        {formError}
                    </Typography>
                )}
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    {t('createEnvironment')}
                </Button>
            </Box>
        </Paper>
    );
};

export default CreateProjectEnvironmentFormComponent;