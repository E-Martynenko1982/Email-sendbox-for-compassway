import { Link } from 'react-router-dom';
import RegisterForm from './component/RegisterForm';
import * as Styled from './index.style';

function RegisterPage() {
  return (
    <Styled.RegisterContainer>
      <RegisterForm />
      <Link to='/login'> Already have an account?</Link>
    </Styled.RegisterContainer>
  )
}

export default RegisterPage;