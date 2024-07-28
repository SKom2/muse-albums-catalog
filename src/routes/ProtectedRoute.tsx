import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import Loader from '@/components/Loader/Loader.tsx';
import { RoleType } from '@/routes/routes.types.ts';

interface ProtectedRouteProps {
  isPublic: boolean;
  accessRole: RoleType
}

const checkAccess = (accessRole: RoleType, role: RoleType) => {
  return accessRole === role
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isPublic, accessRole }) => {
  const isAuthorized = useAuthStore(state => state.isAuthorized)
  const isLoading = useAuthStore(state => state.isLoading)
  const role = useAuthStore(state => state.role)

  const hasAccess = checkAccess(accessRole, role)

  if (isLoading && !isPublic) {
    return <Loader />;
  }
  return (isPublic || isAuthorized && hasAccess) ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
