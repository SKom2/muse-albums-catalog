import React, { FC } from 'react';

interface MainProps {
  children: React.ReactNode;
  title: string;
}

const Main: FC<MainProps> = ({ children, title }) => {
  return (
    <main className="relative mt-20">
      <div className="flex flex-col gap-10 w-[85%] m-auto h-full">
        <section>
          <h1 className="heading">{title}</h1>
        </section>
        <section className="w-full border-[2.5px] border-dashed border-content-secondary"></section>
        {children}
      </div>
    </main>
  );
};

export default Main;