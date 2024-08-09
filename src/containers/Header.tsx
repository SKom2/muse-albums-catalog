import HeaderSection from '@/components/Header/HeaderSection.tsx';
import HeaderNav from '@/components/Header/HeaderNav.tsx';
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
      <HeaderNav />
      <HeaderSection alignment="end">
        <HeaderButtonGroup />
      </HeaderSection>
    </header>
  );
};

export default Header;
