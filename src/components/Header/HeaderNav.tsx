import NavLinks from "@/components/NavLinks/NavLinks.tsx";

const HeaderNav = () => {
  return (
    <nav className="flex gap-20 list-none max-xl:gap-16 max-lg:gap-12 justify-center max-md:hidden max-md:gap-8">
      <NavLinks />
    </nav>
  );
};

export default HeaderNav;
