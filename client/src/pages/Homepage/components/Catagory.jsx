import React from 'react';

const Catagory = () => {
  return (
    <div className=' w-[277px] h-[auto] rounded-[10px] __shadow bg-whiteBg'>
      <div className='flex bg-green1 rounded-t-[10px] justify-center items-center py-[6px]'>
        <h1 className=' text-base font-clash600 text-font2 '>Category</h1>
      </div>
      <div className='flex flex-col gap-4 pl-4 text-font3'>
        <p className=' mt-4'>Computers</p>
        <p>Computers</p>
        <p>Peripherals & Accessories</p>
        <p>Components & Storage</p>
        <p>Power</p>
        <p>Printers & Scanners</p>
        <p>Monitors & Projectors</p>
        <p>Networking</p>
        <p>Software</p>
        <p>Office & Communications</p>
        <p>Telephones & Communications</p>
        <p className='  mb-[68px]'>Consumer Electronics</p>
      </div>
    </div>
  );
};

export default Catagory;
