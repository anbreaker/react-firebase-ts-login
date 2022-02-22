import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const ProtectedRoute = ({ children }: any) => {
  const { user, loading }: any = useAuth();

  if (loading) return <h1>Loading</h1>;

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};
