import Button from '@/ui/Button.tsx';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';

const AlbumCatalog = () => {
  const { signOut } = useAuthStore();

  const handleLogout = async () => {
    signOut()
  }

  return (
    <div>
      <Button text="Sign out" onClick={handleLogout} />
    </div>
  );
};

export default AlbumCatalog;