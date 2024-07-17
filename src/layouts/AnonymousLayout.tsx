import { Outlet } from 'react-router-dom';
import Welcome from '@/components/Welcome.tsx';

const AnonymousLayout = () => {
  return (
    <div className="h-full p-20 max-w-[1440px] mx-auto">
      <section className="h-full grid grid-cols-[60%_40%] gap-4">
        <Welcome />
        <Outlet />
      </section>
    </div>
  );
};

export default AnonymousLayout;
