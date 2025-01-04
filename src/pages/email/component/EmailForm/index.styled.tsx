import { Box, Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

export const FormContainer = styled(Box)`
 display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  max-width: 680px; 
  max-height: 900px;
  width: 100%;
  height: 100%;
  margin: 5px auto;
 
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
 `
export const RegisterTitle = styled(Typography)`
text-align: center;
  font-size: 1.2rem;
`
const FormInputBase = styled(TextField)`
  .MuiInputBase-root {
    height: 20px; 
    font-size: 0.4rem; 
  }

  .MuiInputLabel-root {
  top: -0.4rem;
    font-size: 0.4rem; 
  }

    .MuiInputLabel-shrink {
    top: 2px;
    font-size: 0.4rem;
   
  }
`

export const FormInputRecipient = styled(FormInputBase)`
height:20px;
`
export const FormInputSubject = styled(FormInputBase)`
height:20px;
`


export const FormButton = styled(Button)`
height:20px;
  `