import { FC, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/services/redux/typeHooks.ts';
import { getCurrentSessionData } from '@/services/redux/slices/auth/auth.slice.ts';

interface ProtectedRouteProps {
  isPublic: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isPublic }) => {
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized);
  const isLoading = useAppSelector(state => state.auth.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(getCurrentSessionData())
  }, [dispatch]);

  if (isLoading && !isPublic) {
    return <div>Loading...</div>;
  }

  return (isPublic || isAuthorized) ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
