import React, {FC} from 'react';
import MainHeading from '@/components/MainHeading/MainHeading.tsx';

interface MainProps {
  children: React.ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return (
    <main className="relative mt-16">
      <div className="flex flex-col gap-6 w-[85%] m-auto h-full">
        <MainHeading />
        <section className="w-full border-[2.5px] border-dashed border-content-secondary"></section>
        {children}
      </div>
    </main>
  );
};

export default Main;
