import { Outlet } from 'react-router-dom';
import Welcome from '@/components/Welcome.tsx';

const AuthorizationLayout = () => {
  return (
    <main className="py-20 min-h-screen flex flex-col">
      <section
        className="flex-1 px-10 grid grid-cols-[1.5fr_1fr] gap-10 max-lg:px-5 max-lg:gap-4 max-md:grid-cols-none">
        <Welcome />
        <Outlet />
      </section>
    </main>

  );
};

export default AuthorizationLayout;
