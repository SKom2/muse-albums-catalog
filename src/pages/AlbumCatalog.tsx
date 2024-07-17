import Button from '@/ui/Button.tsx';
import { useAppDispatch } from '@/services/redux/typeHooks.ts';
import { useNavigate } from 'react-router-dom';
import { signOut } from '@/services/redux/slices/auth/auth.slice.ts';

const AlbumCatalog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(signOut()).unwrap().then(() => {
      navigate('/login');
    })
  }

  return (
    <div>
      <Button text="Sign out" onClick={handleLogout} />
    </div>
  );
};

export default AlbumCatalog;