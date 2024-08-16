import { Outlet } from 'react-router-dom';
import Header from '@/containers/Header.tsx';
import Main from '@/containers/Main.tsx';
import useFiltersStore from "@/services/zustand/filters/filters.store.ts";
import {useCallback, useEffect} from "react";

const MainLayout = () => {
    const getGenres = useFiltersStore(state => state.getGenres);
    const getFormats = useFiltersStore(state => state.getFormats);

    const fetchFilters = useCallback(async () => {
        try {
            await Promise.all([getGenres(), getFormats()]);
        } catch (error) {
            console.error("Failed to fetch filters:", error);
        }
    }, [getGenres, getFormats]);

    useEffect(() => {
        fetchFilters()
    }, [fetchFilters]);

    return (
    <div className="grid grid-rows-[100px_1fr] min-h-screen">
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
};

export default MainLayout;