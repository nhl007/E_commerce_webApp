import React from 'react';

const Loading = () => {
  return (
    <div className='lg:mx-[-4rem] xl:mx-[-12rem] xxl:mx-[-1rem] sm:mx-[-1rem] mt-[-2.4rem] sm:mt-[-2.4rem] z-[9999] spinner opacity-90 fixed w-[100vw] h-[100vh]'>
      <div className='loader'></div>
      <p className=' font-clash600 text-[2.4rem] sm:text-[1.6rem] mt-10'>
        Loading... Please Wait...
      </p>
    </div>
  );
};

export default Loading;
