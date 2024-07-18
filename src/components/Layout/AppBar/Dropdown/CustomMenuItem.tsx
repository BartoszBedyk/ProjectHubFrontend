import {MenuItem, styled} from "@mui/material";

export const CustomMenuItem = styled(MenuItem)({
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: '#71C9F1',
    },
    '&.Mui-selected': {
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: '#71C9F1',
        },
    },
})
