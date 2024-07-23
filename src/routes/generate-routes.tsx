import flattenDeep from 'lodash/flattenDeep';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute.tsx';
import { IMainRoute, IRouteBase } from '@/routes/routes.types.ts';
import { useMemo } from 'react';

const generateFlattenRoutes = (routes: IRouteBase[] | undefined): IRouteBase[]  => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
}

export const renderRoutes = (mainRoutes: IMainRoute[]) => {

  const Routes = () => {
    const layouts = useMemo(() => {
      return mainRoutes.map(({ layout: Layout, routes }, index) => {
        const subRoutes = generateFlattenRoutes(routes);

        return (
          <Route key={index} element={<Layout />}>
            {subRoutes.map(({ component: Component, path, name, isPublic, accessRole }) => {
              return (
                <Route
                  key={name}
                  element={
                    <ProtectedRoute
                      isPublic={isPublic ?? false}
                      accessRole={accessRole}
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
        <Route path="/" element={<Navigate to="/albums" />} />
        <Route path="*" element={<Navigate to="/404" />} />
        {layouts}
      </ReactRoutes>
    );
  };

  return Routes;
}