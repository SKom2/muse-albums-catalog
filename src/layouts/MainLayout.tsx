import { Outlet } from 'react-router-dom';
import Header from '@/containers/Header.tsx';

const MainLayout = () => {
  return (
    <div className="grid grid-rows-[100px_1fr] min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;