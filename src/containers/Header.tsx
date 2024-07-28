import HeaderSection from '@/components/Header/HeaderSection.tsx';
import Nav from '@/components/Header/Nav.tsx';
import HeaderButtonGroup from '@/components/Header/HeaderButtonGroup.tsx';
import Logo from '@/assets/icons/Logo.tsx';
import useThemeStore from '@/services/zustand/theme/theme.store.ts';

const Header = () => {
  const { theme } = useThemeStore();

  return (
    <header className="px-4 h-full flex justify-between items-center">
      <HeaderSection alignment="start">
          <Logo color={theme === 'dark' ? 'white' : 'black'} />
      </HeaderSection>
      <Nav />
      <HeaderSection alignment="end">
        <HeaderButtonGroup />
      </HeaderSection>
    </header>
  );
};

export default Header;
