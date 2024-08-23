import {FC, useMemo} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import { PageAccessRoleType } from '@/routes/routes.types.ts';
import { checkAccess } from '@/routes/routes.helpers.ts';

interface ProtectedRouteProps {
  pageAccessRole: PageAccessRoleType
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ pageAccessRole }) => {
  const isAuthorized = useAuthStore(state => state.isAuthorized)
  const role = useAuthStore(state => state.role)

  const hasAccess = useMemo(() => checkAccess(pageAccessRole, role), [pageAccessRole, role])

  return (!pageAccessRole || isAuthorized && hasAccess) ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
