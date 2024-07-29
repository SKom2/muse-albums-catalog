import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute.tsx';
import { Paths } from '@/routes/routes.types.ts';
import { useMemo } from 'react';
import { generateFlattenRoutes } from '@/routes/routes.helpers.ts';
import { useRoutesContext } from '@/context/RoutesContext.tsx';

export const renderRoutes = () => {

  const Routes = () => {
    const { mainRoutes } = useRoutesContext()
    const layouts = useMemo(() => {
      return mainRoutes.map(({ layout: Layout, routes }, index) => {
        const subRoutes = generateFlattenRoutes(routes);

        return (
          <Route key={index} element={<Layout />}>
            {subRoutes.map(({ component: Component, path, name, pageAccessRole }) => {
              return (
                <Route
                  key={name}
                  element={
                    <ProtectedRoute
                      pageAccessRole={pageAccessRole}
                    />
                  }
                >
                  {Component && path && (
                    <Route element={<Component />} path={path} />
                  )}
                </Route>
              );
            })}
          </Route>
        );
      });
    }, [mainRoutes]);

    return (
      <ReactRoutes>
        <Route path="/" element={<Navigate to={Paths.ALBUMS} />} />
        <Route path="*" element={<Navigate to={Paths.NOT_FOUND} />} />
        {layouts}
      </ReactRoutes>
    );
  };

  return Routes;
}