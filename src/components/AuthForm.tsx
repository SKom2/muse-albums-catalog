import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/ui/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import InputGroup from '@/containers/InputGroup.tsx';
import Error from '@/ui/Error.tsx';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';

export interface AuthFormProps {
  type: 'register' | 'login';
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const { signIn, signUp  } = useAuthStore()
  const isLoading= useAuthStore(state => state.isLoading)
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm();

  const isLogin = type === 'login'

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.email || !data.password) return;

    const action = isLogin ? signIn : signUp
    await action(data)
      .then(() => {
        isLogin ? navigate('/albums') : navigate('/login')
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const buttonText = isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up';
  const linkText = isLogin ? 'sign up' : 'log in';
  const linkPath = isLogin ? '/register' : '/login';

  return (
    <form className="gap-4 flex flex-col items-stretch" autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
      <InputGroup register={register} />
      <Error />
      <Button text={buttonText} />
      <p className="self-center">
        or <Link className="text-link" to={linkPath}>{linkText}</Link>
      </p>
    </form>
  );
};

export default AuthForm;
