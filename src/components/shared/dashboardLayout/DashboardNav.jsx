import logo from '@/assets/logo.png';
import ActiveLink from '@/components/shared/ActiveLink/ActiveLink';
import navItems from '@/lib/Data/NavData';
import Image from 'next/image';
import Link from 'next/link';
import LanguageSwitcher from '../Language/LanguageSwitcher';
import ProfileDropDown from '../Navbar/ProfileDropDown';

const DashboardNav = () => {
  return (
    <div className="sticky top-0 py-4 z-50  bg-white border-b-[1px] hidden lg:block">
      <div className="max-w-[1700px] bg-white mx-auto w-full lg:md:px-6 px-4">
        <div className="flex items-center justify-between">
          {/* Logo part nav start  */}
          <Link href="/" className="mr-6 cursor-pointer">
            <Image src={logo} width={160} alt="logo" />
          </Link>
          <div className="flex items-center justify-between gap-10">
            {/* Nav menus part nav center  */}
            <div className="">
              {navItems?.map((item, idx) => (
                <ActiveLink
                  key={idx}
                  href={item?.route}
                  className="px-4  text-[#5A627F]/90 text-xs lg:text-base"
                  activeClassName="px-4 font-semibold text-black text-xs lg:text-base"
                >
                  {item?.label}
                </ActiveLink>
              ))}
            </div>
            {/* Nav search bar and rest icons part nav end  */}
            <div className="flex items-center justify-center gap-5">
              <div className="pt-[20px]">
                <LanguageSwitcher />
              </div>

              <ProfileDropDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
