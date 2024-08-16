import { useLocation } from 'react-router-dom';
import { useRoutesContext } from '@/context/RoutesContext.tsx';
import {useMemo, useState} from 'react';
import { match } from 'path-to-regexp';
import SearchForm from '@/components/SearchForm/SearchForm.tsx';
import {IRoute, Paths} from '@/routes/routes.types.ts';
import OpenFiltersButton from "@/components/Filters/OpenFiltersButton.tsx";
import Filters from "@/components/Filters/Filters.tsx";


const getTitle = (pathname: string, routes: IRoute[]) => {
  let matchedTitle = '';

  routes.forEach((route) => {
    const matcher = match(route.path, { decode: decodeURIComponent });

    if (matcher(pathname)) {
      matchedTitle = route.title;
    }
  });

  return matchedTitle;
};

const MainHeading = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const location = useLocation();
  const { routes } = useRoutesContext();

  const title = useMemo(() => getTitle(location.pathname, routes), [location.pathname, routes]);

  let isSearchFormExist = false

  if (location.pathname === Paths.ALBUMS || location.pathname === Paths.FAVORITE_ALBUMS) {
    isSearchFormExist = true
  }

  return (
    <section>
      <div className="flex justify-between h-12 items-center">
        <h1 className="heading">{title}</h1>
        {
          isSearchFormExist && (
              <>
                <SearchForm />
                <OpenFiltersButton onClick={() => setIsFiltersVisible(!isFiltersVisible)} />
              </>
            )
        }
      </div>
      {
        isSearchFormExist && (
          <Filters isFiltersVisible={isFiltersVisible} setIsFiltersVisible={setIsFiltersVisible}  />
        )
      }
    </section>
  );
};

export default MainHeading;