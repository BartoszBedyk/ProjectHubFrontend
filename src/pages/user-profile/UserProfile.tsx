import React from 'react';
import CustomLayout from "../../components/Layout/Layout";
import {Box, Container, Grid, Paper, Typography} from "@mui/material";

const UserProfile = () => {
    return (
        <CustomLayout>
            <Paper sx={{ width: 'auto', m: 3, pb: 3 }}>
                <Box sx={{ display: 'flex', flexDirection:'column', mb: 1, ml: 3 }}>
                    <Box sx={{ width: 8, height: 32 }} />
                    <Typography variant='h4' component='div'><strong>User profile:</strong></Typography>
                    <Box sx={{ height: 64 }} />
                    <Typography variant='h5' component='div' sx={{ml: 3}}>Kacper Koncki</Typography>
                    <Typography variant='h6' component='div' sx={{ml: 3, mt: 2}}>email: kacper.koncki@gmail.com</Typography>
                    <Box sx={{ display: 'flex', flexDirection:'row' }}>
                        <Typography variant='h6' component='div' sx={{ml: 3, mt: 2}}>password: ******</Typography>
                        <Typography variant='h6' component='div' sx={{ml: 3, mt: 2}}>tutaj może pokazanie passworda przycisk</Typography>
                    </Box>
                </Box>
            </Paper>
        </CustomLayout>
    );
};

export default UserProfile;