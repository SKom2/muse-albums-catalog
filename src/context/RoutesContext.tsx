import { createContext, FC, ReactNode, useContext, useMemo } from 'react';
import { IMainRoute, IRoute } from '@/routes/routes.types.ts';

interface RoutesContextProps {
  mainRoutes: IMainRoute[];
  routes: IRoute[];
}

const RoutesContext = createContext<RoutesContextProps | undefined>(undefined);

export const RoutesContextProvider: FC<{ mainRoutes: IMainRoute[], children: ReactNode }> = ({ mainRoutes, children }) => {
  const routes = useMemo(() => mainRoutes.flatMap(routes => routes.routes), [mainRoutes])

  return (
    <RoutesContext.Provider value={{ routes, mainRoutes }}>
      {children}
    </RoutesContext.Provider>
  )
}

export const useRoutesContext = () => {
  const context = useContext(RoutesContext);
  if (context === undefined) {
    throw new Error('useRoutes must be used within a RoutesProvider');
  }
  return context;
};