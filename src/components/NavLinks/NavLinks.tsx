import {NavLink} from "react-router-dom";
import {useRoutesContext} from "@/context/RoutesContext.tsx";
import useAuthStore from "@/services/zustand/auth/auth.store.ts";
import {useMemo} from "react";
import {getAccessibleRoutes} from "@/routes/routes.helpers.ts";

const NavLinks = () => {
    const { routes } = useRoutesContext();
    const role = useAuthStore(state => state.role);

    const routesHaveLink = useMemo(() => {
        return getAccessibleRoutes(routes, role)
    }, [routes, role]);

    return (
        <>
            {routesHaveLink.map(route => (
                <NavLink
                    key={route.path}
                    to={route.path as string}
                    end
                    className={({ isActive }) =>
                        `w-fit caption uppercase inline-flex items-center justify-center transition ${
                            isActive ? 'font-bold text-content-primary' : 'text-content-secondary'
                        }`
                    }
                >
                    {route.title}
                </NavLink>
            ))}
        </>
    );
};

export default NavLinks;