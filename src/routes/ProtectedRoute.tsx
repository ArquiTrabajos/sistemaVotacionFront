import { Navigate } from 'react-router-dom';
import authService from '../services/auth.service';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles: string[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getRole();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(userRole || '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute; 