import Button from '@/ui/Button.tsx';
import { Link } from 'react-router-dom';
import { FC } from 'react';
import InputGroup from '@/components/Auth/InputGroup.tsx';
import Error from '@/ui/Error.tsx';
import ConfirmationPortal from '@/components/Auth/ConfirmationModal.tsx';
import { useAuthForm } from '@/hooks/useAuthForm.ts';
import { Paths } from '@/routes/routes.types.ts';

export interface AuthFormProps {
  type: 'register' | 'login';
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    isPortalOpen,
    closePortal,
    isLogin,
    isLoading
  } = useAuthForm(type);

  const buttonText = isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up';
  const linkText = isLogin ? 'sign up' : 'log in';
  const linkPath = isLogin ? Paths.REGISTER : Paths.LOGIN;

  return (
    <>
      <form className="gap-6 flex flex-col items-stretch" autoComplete="off" onSubmit={handleSubmit}>
        <InputGroup register={register} />
        <Error />
        <Button type="submit" text={buttonText} />
        <p className="self-center main-text">
          or <Link className="text-link-default" to={linkPath}>{linkText}</Link>
        </p>
      </form>
      {isPortalOpen && (
        <ConfirmationPortal
          message="A confirmation email has been sent to your email address. Please check your inbox."
          onClose={closePortal}
        />
      )}
    </>
  );
};

export default AuthForm;
