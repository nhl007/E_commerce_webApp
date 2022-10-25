import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
