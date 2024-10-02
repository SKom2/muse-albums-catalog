import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {useCallback, useState} from 'react';
import { Paths } from '@/routes/routes.types.ts';

export const useAuthForm = (type: 'register' | 'login') => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const { signIn, signUp  } = useAuthStore()
  const isAuthorizing = useAuthStore(state => state.isAuthorizing)
  const isLogin = type === 'login'

  const handleFormSubmit: SubmitHandler<FieldValues> = useCallback(async (data) => {
    if (!data.email || !data.password) return;

    const action = isLogin ? signIn : signUp;
    await action(data)
      .then(() => {
        if (isLogin) {
          navigate(Paths.ALBUMS);
        } else {
          setIsPortalOpen(true);
          setTimeout(() => {
            setIsPortalOpen(false);
            navigate(Paths.LOGIN);
          }, 15000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogin, isPortalOpen]);

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    isPortalOpen,
    isAuthorizing,
    closePortal: () => {
      setIsPortalOpen(false)
      navigate(Paths.LOGIN);
    },
    isLogin
  };
}

