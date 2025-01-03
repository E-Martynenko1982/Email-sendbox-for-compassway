import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import EmailPage from './pages/email';
import { getStoredCredentials, clearCredentials } from './services/auth/authStorage';
import { getCurrentUser } from './services/users';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkCredentials = async () => {
      const { username, password } = getStoredCredentials();
      if (!username || !password) return;
      try {
        await getCurrentUser();
        navigate("/emails");
      } catch (error) {
        console.error("Invalid credentials in local storage:", error);
        clearCredentials();
      }
    };
    checkCredentials();
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/emails" element={<EmailPage />} />
    </Routes>
  );
};

export default App;
