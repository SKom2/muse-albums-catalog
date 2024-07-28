import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { getAccessibleRoutes } from '@/routes/routes.helpers.ts';
import useAuthStore from '@/services/zustand/auth/auth.store.ts';
import { routes } from '@/routes/routes.data.ts';
import Loader from '@/components/Loader/Loader.tsx';

const Nav = () => {
  const mainRoutes = routes.flatMap(route => route.routes);
  const role = useAuthStore(state => state.role);
  const routesHaveLink = useMemo(() => getAccessibleRoutes(mainRoutes, role), [mainRoutes, role]);

  const isLoading = useAuthStore(state => state.isLoading)

  if (isLoading) {
    return <Loader />
  }

  return (
    <nav className="flex gap-20 list-none justify-center">
      {routesHaveLink.map(route => (
        <NavLink
          key={route.path}
          to={route.path as string}
          end
          className={({ isActive }) =>
            `w-fit paragraph uppercase inline-flex items-center justify-center transition ${
              isActive ? 'font-bold text-content-primary' : 'text-content-secondary'
            }`
          }
        >
          {route.title}
        </NavLink>
      ))}
    </nav>
  );
};

export default Nav;
