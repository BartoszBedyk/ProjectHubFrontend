import React, {useState} from 'react';
import {CreateUserWithPasswordForm} from "../../api/login-pass-auth/form/CreateUserWithPasswordForm";
import {useNavigate} from "react-router-dom";
import {api} from "../../api/AppApi";
import {Box, Button, IconButton, InputAdornment, Paper, TextField, Typography} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useTranslation} from "react-i18next";

const CreateUserFormComponent: React.FC = () => {

    const [form, setForm] = useState<CreateUserWithPasswordForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const {t} = useTranslation("userManagement");

    const [formError, setFormError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (form.firstName === '' || form.lastName === '' || form.email === '' || form.password === '') {
            setFormError(t('formError'));
            return;
        }

        if (form.password.length < 8) {
            setFormError(null)
            setPasswordError(t('passwordError'));
            return;
        }

        try {
            const response = await api.loginPassAuth.register(form);
            console.log('User created: ', response);
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            });
            navigate('/user', { state: { showSnackbarCreate: true } });

        } catch (e) {
            console.error('Error creating user:', e);
        }
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Paper sx={{ width: 'auto', mb: 2, margin: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, pt: 4, pr: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, ml: 1 }}>
                        {t('create')}
                    </Button>
                </Box>
                <Box sx={{ width: 8, height: 32, backgroundColor: '#1976d2', marginRight: 2 }} />
                <Typography variant="h5" component="div">
                    {t('createUser')}
                </Typography>
            </Box>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' }, padding: 3 }}
                noValidate
                autoComplete='off'
            >
                {formError && (
                    <Typography color="error" sx={{ mb: 1, mt: 1 }}>
                        {t(formError)}
                    </Typography>
                )}
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
                    required
                    type='email'
                    id='email'
                    name="email"
                    label={t('email')}
                    value={form.email}
                    onChange={handleInputChange}
                    error={!!formError}
                />
                {passwordError && (
                    <Typography color="error" sx={{ mb: 1, mt: 1 }}>
                        {t(passwordError)}
                    </Typography>
                )}
                <TextField
                    required
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    name="password"
                    label={t('password')}
                    value={form.password}
                    onChange={handleInputChange}
                    error={!!passwordError}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={toggleShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </Paper>
    );
};

export default CreateUserFormComponent;
