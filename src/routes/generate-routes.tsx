import flattenDeep from 'lodash/flattenDeep';
import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import ProtectedRoute from '@/routes/ProtectedRoute.tsx';
import { IMainRoute, IRoute } from '@/routes/routes.types.ts';

const generateFlattenRoutes = (routes: IRoute[] | undefined): IRoute[]  => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
}

export const renderRoutes = (mainRoutes: IMainRoute[]) => {

  const Routes = () => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      return (
        <Route key={index} element={<Layout />}>
          {subRoutes.map(({ component: Component, path, name, isPublic }) => {
            return (
              <Route
                key={name}
                element={
                  <ProtectedRoute
                    isPublic={isPublic ?? false}
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
    return (
      <ReactRoutes>
        <Route path="/" element={<Navigate to="/albums" />} />
        {layouts}
      </ReactRoutes>
    );
  }
  return Routes;
}