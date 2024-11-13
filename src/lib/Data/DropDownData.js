import { BsPersonWorkspace } from 'react-icons/bs';
import { FaHeart, FaQuestion } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { LuLayoutDashboard } from 'react-icons/lu';
import { SlCalender } from 'react-icons/sl';
import { TbPhoneCall } from 'react-icons/tb';

export const DropDownData = [
  {
    name: 'My Profile',
    path: '/my-profile',
    icon: <ImProfile />,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: <LuLayoutDashboard />,
  },
  {
    name: 'Post your activity',
    path: '/dashboard/post-activities',
    icon: <BsPersonWorkspace />,
  },
  {
    name: 'My Favorites',
    path: '/my-favorites',
    icon: <FaHeart />,
  },
  {
    name: 'My Calendar',
    path: '/my-calendar',
    icon: <SlCalender />,
  },
  {
    name: 'FAQ',
    path: '/faq',
    icon: <FaQuestion />,
  },
  {
    name: 'Help Center',
    path: '/contact-us',
    icon: <TbPhoneCall />,
  },
];

export const NormalDropDownData = [
  {
    name: 'My Profile',
    path: '/my-profile',
    icon: <ImProfile />,
  },
  {
    name: 'My Favorites',
    path: '/my-favorites',
    icon: <FaHeart />,
  },
  {
    name: 'My Calendar',
    path: '/my-calendar',
    icon: <SlCalender />,
  },
  {
    name: 'FAQ',
    path: '/faq',
    icon: <FaQuestion />,
  },
  {
    name: 'Help Center',
    path: '/contact-us',
    icon: <TbPhoneCall />,
  },
];
