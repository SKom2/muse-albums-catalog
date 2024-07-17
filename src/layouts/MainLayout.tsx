import { Outlet } from 'react-router-dom';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import { useEffect } from 'react';

const MainLayout = () => {
  const getSession = useAuthStore(state => state.getCurrentSession)
  const isLoading = useAuthStore(state => state.isLoading)

  useEffect(() => {
    getSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Outlet />
  );
};

export default MainLayout;