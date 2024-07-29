import { useLocation } from 'react-router-dom';
import { useRoutesContext } from '@/context/RoutesContext.tsx';
import { useMemo } from 'react';
import { match } from 'path-to-regexp';
import SearchForm from '@/components/SearchForm.tsx';
import { IRoute } from '@/routes/routes.types.ts';

const MainHeading = () => {
  const location = useLocation();
  const { routes } = useRoutesContext();

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

  const title = useMemo(() => getTitle(location.pathname, routes), [location.pathname, routes]);

  return (
    <section>
      <div className="flex justify-between">
        <h1 className="heading">{title}</h1>
        <SearchForm />
      </div>
    </section>
  );
};

export default MainHeading;