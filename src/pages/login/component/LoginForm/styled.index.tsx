import { Box, Button, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

export const FormContainer = styled(Box)`
 display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px;
  max-width: 480px; 
  max-height: 190px; 
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border: 1px solid #ccc;
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

export const FormInputLogin = styled(FormInputBase)`

`
export const FormInputEmail = styled(FormInputBase)`

`
export const FormInputPassword = styled(FormInputBase)`

`
export const FormButton = styled(Button)`

`