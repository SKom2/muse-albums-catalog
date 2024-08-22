import { BrowserRouter } from 'react-router-dom';
import { routes, Routes } from './routes/routes.data.ts';
import { ThemeContextProvider } from '@/context/ThemeContext.tsx';
import { RoutesContextProvider } from '@/context/RoutesContext.tsx';
import {useEffect} from "react";
import useAuthStore from "@/services/zustand/auth/auth.store.ts";
import Loader from "@/components/Loader/Loader.tsx";

function App() {
    const getSession = useAuthStore(state => state.getSession);
    const isLoading = useAuthStore(state => state.isLoading)

    useEffect(() => {
        getSession()
    }, [getSession]);

    if (isLoading) {
        return <Loader />;
    }

    return <Routes />;
}

const WrappedApp = () => {
    return (
        <BrowserRouter basename="muse-catalog">
          <ThemeContextProvider>
            <RoutesContextProvider mainRoutes={routes}>
              <App />
            </RoutesContextProvider>
          </ThemeContextProvider>
        </BrowserRouter>
    )
}

export default WrappedApp
