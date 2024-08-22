import HeaderSection from '@/components/Header/HeaderSection.tsx';
import HeaderNav from '@/components/Header/HeaderNav.tsx';
import HeaderButtonGroup from '@/components/Header/HeaderButtonGroup.tsx';
import Logo from '@/assets/icons/Logo.tsx';
import useThemeStore from '@/services/zustand/theme/theme.store.ts';
import {useNavigate} from "react-router-dom";
import {Paths} from "@/routes/routes.types.ts";
import NavLinks from "@/components/NavLinks/NavLinks.tsx";

const Header = () => {
    const { theme } = useThemeStore();
    const navigate = useNavigate();

    return (
        <header className="px-4 h-full max-md:px-0 flex flex-col gap-4">
            <div
                className="hidden z-20 max-md:flex bg-screen-default justify-between px-10 w-full h-[70px]">
                <NavLinks/>
            </div>
            <div className="h-full flex  sm:flex-row justify-between items-center gap-4 max-sm:gap-0 max-md:px-4">
                <HeaderSection alignment="start">
                    <button type="button" className="h-24" onClick={() => navigate(Paths.ALBUMS)}>
                        <Logo color={theme === 'dark' ? 'white' : 'black'}/>
                    </button>
                </HeaderSection>
                <HeaderNav/>
                <HeaderSection alignment="end">
                    <HeaderButtonGroup/>
                </HeaderSection>
            </div>
        </header>
    );
};

export default Header;