import AuthForm, { AuthFormProps } from '@/components/Auth/AuthForm.tsx';
import { FC } from 'react';

const Authorization: FC<AuthFormProps> = ({ type }) => {
  return (
    <div className="flex justify-center text-content-primary max-md:items-center">
      <div className="mt-36 flex flex-col gap-9 max-md:mt-0 w-3/6">
        <div className="max-md:text-center">
          <h2 className="heading-2 mb-2 max-lg:title-sm max-md:title max-[425px]:title-sm">Unlock premium features</h2>
          <p className="subheading max-lg:main-text-sm">Access exclusive content. Upgrade anytime.</p>
        </div>
        <AuthForm type={type}/>
      </div>
    </div>
  );
};

export default Authorization;