import { IRoute, PageAccessRoleType } from '@/routes/routes.types.ts';
import { UserRoleType } from '@/services/zustand/auth/auth.types.ts';
import useAuthStore from "@/services/zustand/auth/auth.store.ts";

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
    const isAuthorized = useAuthStore.getState().isAuthorized

    return hasAccess && isAuthorized || !route.pageAccessRole;
  });
};
