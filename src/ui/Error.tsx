import useAuthStore from '@/services/zustand/auth/auth.store.ts';

const Error = () => {
  const error = useAuthStore(state => state.errorMessage)

  return (
    <p className="main-text-sm text-error self-center">{error && error}</p>
  );
};

export default Error;