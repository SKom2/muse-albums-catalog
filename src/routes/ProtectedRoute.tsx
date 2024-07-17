import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';

interface ProtectedRouteProps {
  isPublic: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isPublic }) => {
  const isAuthorized = useAuthStore(state => state.isAuthorized)

  return (isPublic || isAuthorized) ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
