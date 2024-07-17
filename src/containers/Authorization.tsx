import AuthForm, { AuthFormProps } from '@/components/AuthForm.tsx';
import { FC } from 'react';

const Authorization: FC<AuthFormProps> = ({ type }) => {
  return (
    <div className="flex justify-center">
      <div className="mt-32 flex flex-col gap-4">
        <h3 className="title">Unlock premium features</h3>
        <p>Access exclusive content. Upgrade anytime.</p>
        <AuthForm type={type}/>
      </div>
    </div>
  );
};

export default Authorization;