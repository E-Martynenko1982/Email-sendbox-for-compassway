import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Styled from './index.styled';
import { registerUser, storeCredentials } from "../../../../services";




const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(username, email, password);
      console.log("Registration success");
      storeCredentials(username, password);
      navigate('/emails')
    } catch (error) {

      console.log(error, 'Registration failed. Please check your data or try again.')

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
        label="Username"
        onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
        required
        fullWidth
      />
      <Styled.FormInputEmail
        label="Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
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
        Register
      </Styled.FormButton>
    </Styled.FormContainer>
  )
}

export default RegisterForm;