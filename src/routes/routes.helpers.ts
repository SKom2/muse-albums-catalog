import { IRoute, PageAccessRoleType } from '@/routes/routes.types.ts';
import { UserRoleType } from '@/services/zustand/auth/auth.types.ts';
import flattenDeep from 'lodash/flattenDeep';

export const checkAccess = (pageAccessRole: PageAccessRoleType, userRole: UserRoleType): boolean => {
  if (!pageAccessRole) return true;
  if (!userRole) return false;
  if (Array.isArray(pageAccessRole)) {
    return pageAccessRole.includes(userRole);
  }
  return pageAccessRole === userRole;
};

export const getAccessibleRoutes = (routes: IRoute[], role: UserRoleType) => {
  return routes.filter(route => {
    if (!route.hasSideLink || !route.path) return false;

    const hasAccess = checkAccess(route.pageAccessRole, role);
    return hasAccess || !route.pageAccessRole;
  });
};

export const generateFlattenRoutes = (routes: IRoute[] | undefined): IRoute[]  => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ routes: subRoutes, ...rest }) => [rest, generateFlattenRoutes(subRoutes)]));
}