import { useAppSelector } from '@/services/redux/typeHooks.ts';

const Error = () => {
  const error = useAppSelector(state => state.auth.errorMessage)

  return (
    <p className="main-text-sm text-error self-center">{error && error}</p>
  );
};

export default Error;