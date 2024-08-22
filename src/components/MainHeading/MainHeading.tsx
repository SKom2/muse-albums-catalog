import { useLocation } from 'react-router-dom';
import { useRoutesContext } from '@/context/RoutesContext.tsx';
import {useMemo, useState} from 'react';
import { match } from 'path-to-regexp';
import SearchForm from '@/components/SearchForm/SearchForm.tsx';
import {IRoute, Paths} from '@/routes/routes.types.ts';
import Filters from "@/components/Filters/Filters.tsx";
import FilterIcon from "@/assets/icons/FilterIcon.tsx";
import Button from "@/ui/Button.tsx";

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
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-between items-center md:h-[45px] max-md:flex-col max-md:items-center max-md:gap-8">
          <h1 className="heading">{title}</h1>
          {
            isSearchFormExist && (
                <div className="flex items-center h-full gap-4 max-md:justify-between max-md:w-full max-md:flex-row-reverse max-md:h-[45px]">
                  <SearchForm />
                  <Button type="button" size="medium" onClick={() => setIsFiltersVisible(!isFiltersVisible)}>
                    <FilterIcon />
                    <span className="medium">Filters</span>
                  </Button>
                </div>
              )
          }
        </div>
        {
          isSearchFormExist && (
            <Filters isFiltersVisible={isFiltersVisible} setIsFiltersVisible={setIsFiltersVisible}  />
          )
        }
      </div>
    </section>
  );
};

export default MainHeading;