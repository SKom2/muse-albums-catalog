import { BrowserRouter } from 'react-router-dom';
import { Routes } from './routes/routes.data.ts';
import { useEffect } from 'react';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';

function App() {
  const getSession = useAuthStore(state => state.getCurrentSession)

  useEffect(() => {
    getSession();
  }, []);

  return <Routes />;
}

const WrappedApp = () => {
  return (
    <BrowserRouter basename="muse-catalog">
        <App />
    </BrowserRouter>
    )
}

export default WrappedApp
