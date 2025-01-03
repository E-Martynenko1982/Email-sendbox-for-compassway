import React from 'react'
import LoginForm from './component/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div style={{ margin: '20px' }}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  )
}

export default LoginPage;