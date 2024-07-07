import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isPublic: boolean;
  isAuthorized: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isPublic, isAuthorized }) => {
  return (isPublic || isAuthorized) ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRoute;