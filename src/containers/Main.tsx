import React, {FC} from 'react';
import MainHeading from '@/components/MainHeading/MainHeading.tsx';
import DashedLine from "@/components/DashedLine/DashedLine.tsx";

interface MainProps {
  children: React.ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
    return (
      <main className="relative mt-16 mb-10 max-md:mt-8">
        <div className="flex flex-col gap-6 m-auto max-w-[90%] max-md:max-w-full px-4">
          <MainHeading />
          <DashedLine />
          {children}
        </div>
      </main>
    );
};

export default Main;
