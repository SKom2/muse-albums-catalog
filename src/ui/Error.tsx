import useAuthStore from '@/services/zustand/auth/auth.store.ts';

const Error = () => {
  const error = useAuthStore(state => state.errorMessage);

  if (!error) {
    return null;
  }

  return (
    <p className="main-text-sm text-error self-center">
      {error}
    </p>
  );
};

export default Error;
