import { useAppDispatch, useAppSelector } from '@/services/redux/typeHooks.ts';
import { loginUser, registerUser } from '@/services/redux/slices/auth/auth.slice.ts';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/ui/Button.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { FC } from 'react';
import InputGroup from '@/containers/InputGroup.tsx';
import Error from '@/ui/Error.tsx';

export interface AuthFormProps {
  type: 'register' | 'login';
}

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const isLogin = type === 'login'

  const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.email || !data.password) return;

    const action = isLogin ? loginUser : registerUser;
    await dispatch(action(data)).unwrap().then(() => {
      isLogin ? navigate('/albums') : navigate('/login')
    });
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
