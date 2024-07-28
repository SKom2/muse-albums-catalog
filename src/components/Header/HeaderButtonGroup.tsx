import Button from '@/ui/Button.tsx';
import { Paths } from '@/routes/routes.types.ts';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import { useNavigate } from 'react-router-dom';

const HeaderButtonGroup = () => {
  const { isAuthorized } = useAuthStore()
  const { signOut } = useAuthStore()
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut()
      .catch(console.error)
    navigate(Paths.LOGIN)
  }

  return (
    <div className="h-full flex items-center justify-center">
      {!isAuthorized ?
        <Button size="large" text="Sign in" onClick={() => navigate(Paths.LOGIN)} />
        :
        <Button size="large" text="Sign out" onClick={handleSignOut} />
      }
    </div>
  );
};

export default HeaderButtonGroup;