import Button from '@/ui/Button.tsx';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import useThemeStore from '@/services/zustand/theme/theme.store.ts';
import { useNavigate } from 'react-router-dom';

const AlbumCatalog = () => {
  const navigate = useNavigate()
  const { signOut } = useAuthStore();
  const { toggleTheme } = useThemeStore()

  const handleLogout = async () => {
    await signOut()
      .then(() => {
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
      <Button text="Theme Change" onClick={toggleTheme} />
      <Button text="Sign out" onClick={handleLogout} />
    </div>
  );
};

export default AlbumCatalog;