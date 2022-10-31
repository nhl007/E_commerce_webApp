import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <footer className=' mt-5 flex justify-center'>
        <p>Made by Nihal</p>
      </footer>
    </div>
  );
};

export default Dashboard;
