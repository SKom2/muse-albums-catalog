import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import Loader from '@/components/Loader/Loader.tsx';

interface ProtectedRouteProps {
  isPublic: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isPublic }) => {
  const isAuthorized = useAuthStore(state => state.isAuthorized)
  const isLoading = useAuthStore(state => state.isLoading)

  if (isLoading && !isPublic) {
    return <Loader />;
  }
  return (isPublic || isAuthorized) ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
