import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className=' flex justify-center items-center gap-[48px] font-clash600'>
      <Link>Home</Link>
      <Link>Top Deal</Link>
      <Link>Today'a Deal</Link>
      <Link>Membership</Link>
    </div>
  );
};

export default Navigation;
