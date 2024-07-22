import Button from '@/ui/Button.tsx';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import useThemeStore from '@/services/zustand/theme/theme.store.ts';

const AlbumCatalog = () => {
  const { signOut } = useAuthStore();
  const { toggleTheme } = useThemeStore()

  const handleLogout = async () => {
    signOut()
  }

  return (
    <div>
      <Button text="Theme Change" onClick={toggleTheme} />
      <Button text="Sign out" onClick={handleLogout} />
    </div>
  );
};

export default AlbumCatalog;