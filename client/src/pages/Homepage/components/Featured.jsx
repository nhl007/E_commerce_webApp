import React from 'react';
import { featured, jbl, tv } from '../../../assets';
import ButtonGreen from '../../../components/ButtonGreen';
import CardBig from './CardBig';
import { percentageCal } from '../../../utils/mathOperations';

const Featured = () => {
  const percentage = percentageCal(14, 20) + '%';
  return (
    <section className='flex sm:flex-col mt-[6.8rem]'>
      <div className='h-[532px] sm:h-auto w-[36.4rem] bg-whiteBg __shadow rounded-[1rem] p-[3.2rem] sm:p-[1.6rem] pt-[9.6rem] sm:pt-[3.2rem] mr-[3rem] sm:mr-0 flex '>
        <div className='self-end'>
          <img src={featured} width={297} height={405} alt='phone' />
        </div>
      </div>
      <div className=' flex flex-col w-[40rem] sm:w-full self-end '>
        <h1 className='max-w-[29.4rem] font-clash600 text-[4.8rem] leading-[5.9rem] text-font3'>
          Xbox One S PlayStation 4
        </h1>
        <h4 className=' mt-8 mb-[8rem] sm:mb-[2.4rem]'>
          Xbox One X Xbox One S PlayStation 4
        </h4>
        <p className=' mb-[2.4rem]'>
          <span className=' text-green2 text-[3.2rem] leading-[3.939rem] mr-3'>
            $798.00
          </span>
          <span className=' line-through text-fontRed'>$998.00</span>
        </p>
        <div className='flex flex-col mb-[10rem] sm:mb-[3.2rem]'>
          <div className=' flex justify-between'>
            <p className=''>Sold: 14</p>
            <p className=''>Available: 20</p>
          </div>
          <div className='mt-[1.8rem] relative flex items-center'>
            <div className='absolute w-full h-[.5rem] bg-[#D9D9D9]'></div>
            <div
              style={{
                width: `${percentage}`,
              }}
              className={`absolute h-[.5rem] bg-green2 rounded-[1.5rem]`}
            ></div>
          </div>
        </div>
        <div className=' w-[11rem]'>
          <ButtonGreen text={'Shop Now'} height={'44px'} width={'110px'} />
        </div>
      </div>
      <div className=' flex flex-col gap-[3.2rem] ml-[5.2rem] sm:ml-0'>
        <CardBig
          image={jbl}
          heading={'JBL Boombox'}
          description={'Loudspeaker Wireless speaker'}
          price={'$10.95'}
        />
        <CardBig
          image={tv}
          heading={'Samsung Smart TV'}
          description={'4K resolution Ultra-high-definition television'}
          price={'$10.95'}
        />
      </div>
    </section>
  );
};

export default Featured;
