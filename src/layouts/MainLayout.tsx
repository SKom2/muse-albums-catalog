import {Outlet} from 'react-router-dom';
import Header from '@/containers/Header.tsx';
import Main from '@/containers/Main.tsx';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import {useCallback, useEffect} from "react";
import IconButton from "@/ui/IconButton.tsx";
import useThemeStore from "@/services/zustand/theme/theme.store.ts";
import BrushIcon from "@/assets/icons/BrushIcon.tsx";

const MainLayout = () => {
    const getGenres = useFiltersStore(state => state.getGenres);
    const getFormats = useFiltersStore(state => state.getFormats);
    const toggleTheme = useThemeStore(state => state.toggleTheme)

    const fetchFilters = useCallback(async () => {
        await Promise.all([getGenres(), getFormats()]);
    }, [getGenres, getFormats]);

    useEffect(() => {
        fetchFilters()
    }, [fetchFilters]);

    return (
        <div className="flex flex-col min-h-screen relative">
            <Header />
            <Main>
             <Outlet />
            </Main>
            <div className="fixed bottom-6 left-6">
                <IconButton size="large" onClick={toggleTheme}>
                    <BrushIcon />
                </IconButton>
            </div>
        </div>
  );
};

export default MainLayout;