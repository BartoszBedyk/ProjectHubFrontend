import React, {useEffect, useState} from 'react';
import {EditUserForm} from "../../api/user-management/form/EditUserForm";
import {useNavigate} from "react-router-dom";
import {api} from "../../api/AppApi";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

const UpdateUserFormComponent: React.FC<{userId: string}> = ({userId}) => {

    const [form, setForm] = useState<EditUserForm>({
        id: userId,
        firstName: '',
        lastName: '',
        email: ''
    });

    const {t} = useTranslation("userManagement");

    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await api.userManagement.get(userId);
                setForm({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                });
            } catch (e) {
                console.error('Error fetching user data: ', e);
            }
        };
        fetchUser();
    }, [userId])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.firstName === '' || form.lastName === '' || form.email === '') {
            setFormError(t('formError'));
            return;
        }

        setFormError(null);

        try {
            const response = await api.userManagement.update(form);
            navigate('/user');
        } catch (e) {
            console.error('Error updating user:', e);
        }
    }

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pt: 4, pr: 2 }}>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {t('editUser')}
                </Typography>
            </Box>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, padding: 3 }}
                noValidate
                autoComplete='off'
            >
                <TextField
                    required
                    type='text'
                    id='firstName'
                    name="firstName"
                    label={t('firstName')}
                    value={form.firstName}
                    onChange={handleInputChange}
                    error={!!formError}
                />
                <TextField
                    required
                    type='text'
                    id='lastName'
                    name="lastName"
                    label={t('lastName')}
                    value={form.lastName}
                    onChange={handleInputChange}
                    error={!!formError}
                />
                <TextField
                    disabled //TODO Handle email change
                    type='email'
                    id='email'
                    name="email"
                    label={t('email')}
                    value={form.email}
                    onChange={handleInputChange}
                    error={!!formError}
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, ml: 1 }}>
                    {t('edit')}
                </Button>
            </Box>
        </Paper>
    );
};

export default UpdateUserFormComponent;