import AuthForm, { AuthFormProps } from '@/components/AuthForm.tsx';
import { FC } from 'react';

const Authorization: FC<AuthFormProps> = ({ type }) => {
  return (
    <div className="flex justify-center max-md:items-center">
      <div className="mt-36 flex flex-col gap-9 max-md:mt-0">
        <div className="max-md:text-center">
          <h3 className="title mb-2 max-lg:title-sm max-md:title max-[425px]:title-sm">Unlock premium features</h3>
          <p className="main-text max-lg:main-text-sm">Access exclusive content. Upgrade anytime.</p>
        </div>
        <AuthForm type={type}/>
      </div>
    </div>
  );
};

export default Authorization;