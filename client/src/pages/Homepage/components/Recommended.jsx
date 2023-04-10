import React from 'react';
import Card from './Card';
import { headphone } from '../../../assets';

const Recommended = () => {
  return (
    <div className=' mt-[80px] flex flex-col '>
      <h1 className='font-clash600 text-[32px] leading-[39px]'>
        Recommended For You
      </h1>
      <div className=' flex mt-[48px] gap-[30px] min-h-full'>
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
