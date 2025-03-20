import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const accessToken = localStorage.getItem('accessToken');

  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000); 
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Помилка при перевірці токена:', error);
      return false;
    }
  };

  const isAuthenticated = accessToken && isTokenValid(accessToken);

  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/login" />;
}