import React from 'react';
import Card from './Card';
import { headphone } from '../../../assets';

const Recommended = () => {
  return (
    <div className=' mt-[8rem] sm:mt-[4.8rem] flex flex-col '>
      <h1 className='font-clash600 text-[3.2rem] leading-[3.9rem]'>
        Recommended For You
      </h1>
      <div className=' flex mt-[4.8rem] sm:mt-[2.4rem] gap-[3rem] sm:gap-[1.6rem] min-h-full sm:overflow-x-scroll'>
        <Card
          image={headphone}
          heading={'JBL T450 Headphone'}
          description={'JBL T450 Headphones Wireless Audio'}
          price={'$24.95'}
          background={true}
        />
        <Card
          image={headphone}
          heading={'JBL T450 Headphone'}
          description={'JBL T450 Headphones Wireless Audio'}
          price={'$24.95'}
          background={true}
        />
        <Card
          image={headphone}
          heading={'JBL T450 Headphone'}
          description={'JBL T450 Headphones Wireless Audio'}
          price={'$24.95'}
          background={true}
        />
        <Card
          image={headphone}
          heading={'JBL T450 Headphone'}
          description={'JBL T450 Headphones Wireless Audio'}
          price={'$24.95'}
          background={true}
        />
      </div>
    </div>
  );
};

export default Recommended;
