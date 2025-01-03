import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { storeCredentials } from '../../../../services';
import axiosClient from '../../../../services/axiosClient';
import * as Styled from './styled.index';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      storeCredentials(username, password);
      await axiosClient.get('/users/current');
      navigate('/emails');
    } catch (error) {
      console.error(error);
      alert('Invalid login or password. Please try again.')
      storeCredentials('', '')
    }
  }


  return (
    <Styled.FormContainer
      onSubmit={handleSubmit}
      as="form"
    >
      <Styled.RegisterTitle gutterBottom>
        Fill out the form please
      </Styled.RegisterTitle>
      <Styled.FormInputLogin
        value={username}
        label="Login"
        onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
        required
        fullWidth
      />

      <Styled.FormInputPassword
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
        required
        fullWidth
      />
      <Styled.FormButton
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        Login
      </Styled.FormButton>
    </Styled.FormContainer>
  )
}

export default LoginForm;