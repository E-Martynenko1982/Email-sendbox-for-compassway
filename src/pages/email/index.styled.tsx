import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';

export const EmailPageContainer = styled(Box)`
display: flex;
flex-direction: column;
align-items: flex-start;
margin: 20px auto;
padding: 5px;
width: 600px;
width: 100%;
background-color:rgb(114, 131, 201);
border-radius: 5px;
`
export const EmailPageTitle = styled(Typography)`
font-size: 18px;
`
export const EmailPageButtons = styled(Button)`
height:20px;
`