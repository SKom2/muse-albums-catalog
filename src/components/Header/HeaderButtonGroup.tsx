import Button from '@/ui/Button.tsx';
import { Paths } from '@/routes/routes.types.ts';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import ProfileIcon from '@/assets/icons/ProfileIcon.tsx';
import { useNavigate } from 'react-router-dom';
import IconButton from '@/ui/IconButton.tsx';

const HeaderButtonGroup = () => {
  const { isAuthorized } = useAuthStore()
  const { signOut } = useAuthStore()
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut().then(() => {
      navigate(Paths.LOGIN)
    })
  }

  return (
    <div className="h-full flex items-center justify-center">
      {!isAuthorized ?
        <Button size="large" text="Sign in" onClick={() => navigate(Paths.LOGIN)} />
        :
        <IconButton size="large" onClick={handleSignOut}>
          <ProfileIcon />
        </IconButton>
      }
    </div>
  );
};

export default HeaderButtonGroup;