import { Outlet } from 'react-router-dom';
import Welcome from '@/components/Welcome.tsx';

const AuthorizationLayout = () => {
  return (
    <div className="h-full py-20 max-w-[1440px] min-w-[320px] mx-auto max-md:py-5">
      <section className="h-full px-10 grid grid-cols-[1.5fr_1fr] gap-10 max-lg:px-5 max-lg:gap-4 max-md:grid-cols-none">
        <Welcome />
        <Outlet />
      </section>
    </div>
  );
};

export default AuthorizationLayout;
