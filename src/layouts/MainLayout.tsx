import { Outlet } from 'react-router-dom';
import Header from '@/containers/Header.tsx';
import Main from '@/containers/Main.tsx';

const MainLayout = () => {
  return (
    <div className="grid grid-rows-[100px_1fr] min-h-screen">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default MainLayout;