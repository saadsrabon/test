'use client';
import DashboardNav from '@/components/shared/dashboardLayout/DashboardNav';
import DesktopLayout from '@/components/shared/dashboardLayout/DesktopLayout';
import MobileLayout from '@/components/shared/dashboardLayout/MobileLayout';
import BottomNavbar from '@/components/shared/Navbar/BottomNavbar';
import React from 'react';
import ReduxWrapper from '../../../provider/redux/ReduxWrapper';

const DashboardLayout = ({ children }) => {
  return (
    <ReduxWrapper>
      <DashboardNav />
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-[350px]">
          <DesktopLayout />
        </div>
        <MobileLayout />
        <div className="lg:w-[calc(100%-350px)] w-full pb-20">{children}</div>
        <BottomNavbar />
      </div>
    </ReduxWrapper>
  );
};

export default DashboardLayout;
