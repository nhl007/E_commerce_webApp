import React from 'react';
import NavBar from '../../components/NavBar';
import Category from './components/Category';
import Card from './components/Card';
import {
  controller,
  headphone,
  hero,
  memberIcon,
  moneyIcon,
  supportIcon,
} from '../../assets';
import Featured from './components/Featured';
import Recommended from './components/Recommended';
import ButtonGreen from '../../components/ButtonGreen';
import Banner from './components/Banner';
import Footer from '../../components/Footer';
import AllProducts from './components/AllProducts';

const Home = () => {
  return (
    <div className=' flex flex-col'>
      <NavBar />
      {/* //! hero sec  */}
      <div className=' flex flex-row sm:flex-col justify-start items-end sm:items-start mt-[5.3rem] gap-[3.2rem] sm:gap-[1.6rem] relative'>
        <Category />
        <div className=' sm:hidden  absolute right-0 top-[1rem]'>
          <div className=' flex justify-center items-center gap-[3.2rem] font-clash600 pr-1'>
            <p>Top Deal</p>
          </div>
        </div>
        <div className=' max-w-[57rem] max-h-[38rem] px-[4.8rem] sm:px-[2.4rem] pt-[3.2rem] pb-[3.2rem] flex flex-col gap-[1.6rem] __shadow rounded-[1rem] bg-whiteBg'>
          <h1 className=' font-clash600 text-[4.8rem] leading-[5.9rem] text-font1'>
            Nikon D3100
          </h1>
          <div className=' flex gap-[4.8rem]'>
            <div className=' flex flex-col'>
              <p className=' max-w-[20rem] text-[1.2rem] leading-[1.4rem] mb-[2.4rem]'>
                Easily capture the beauty of life's fleeting moments with
                Nikon's compact and lightweight D3100
              </p>

              <h1 className='font-clash600 text-[2.4rem] leading-[3rem] text-font1 mb-[4.8rem]'>
                $798.00
              </h1>

              <ButtonGreen
                text={'Shop Now'}
                width={'11rem'}
                height={'4.4rem'}
              />
            </div>
            <div>
              <img src={hero} width={213} height={206} />
            </div>
          </div>
        </div>
        <div className='sm:w-full flex flex-col gap-[2rem] sm:mt-[2.4rem] sm:justify-center sm:items-center'>
          <Card
            image={headphone}
            heading={'JBL T450 Headphone'}
            description={'JBL T450 Headphones Wireless Audio'}
            price={'24.95'}
          />
          <Card
            image={controller}
            heading={'Xbox One Controller'}
            description={'Xbox 360 controller Game Controllers'}
            price={'10.95'}
          />
        </div>
      </div>
      {/* //! hero sec ends  */}
      <div className=' flex sm:flex-col mt-[12.8rem] sm:mt-[4.8rem] gap-[4rem] sm:gap-[2.4rem] justify-center  items-center sm:items-start'>
        <Marketing
          icon={supportIcon}
          text={'Support online 24 hours a day'}
          heading={'24/7 SupportMoney'}
        />
        <Marketing
          icon={moneyIcon}
          text={'Money back guarantee within 15 days '}
          heading={'Money Return'}
        />
        <Marketing
          icon={memberIcon}
          text={'On every order over $120.00 or Free Shipping'}
          heading={'Member Offers'}
        />
      </div>
      <Featured />
      <Recommended />
      <Banner />
      <AllProducts />
      {/* //!The membership plan */}
      <div className='lg:ml-[-4rem] xl:ml-[-12rem] sm:ml-0 px-[12rem] sm:px-0 w-[100vw] sm:w-full h-[25.1rem] sm:h-auto mt-[9.4rem] sm:mt-[2.4rem] bg-greyBg flex justify-center '>
        <div className='flex justify-between w-full relative ml-[3rem] sm:ml-0'>
          <div className=' flex flex-col pt-8'>
            <h1 className='font-clash600 text-[4.8rem] sm:text-[3.2rem] sm:leading-[3.9rem] leading-[5.9rem] text-font1 mb-4'>
              The Membership Plan
            </h1>
            <p className='mb-[4.4rem] sm:mb-[2.4rem] max-w-[688px]'>
              provides 24/7/365 tech support, up to 24 months of product
              protection with active membership, free standard installation and
              so much more.Terms and conditions apply.
            </p>
            <p className='font-clash600 text-[3.2rem] leading-[3.9rem] text-font1 mb-4 sm:mb-2'>
              Learn More
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

const Marketing = ({ icon, heading, text }) => {
  return (
    <div className=' flex gap-8 justify-center items-center'>
      <div className=' w-[48px] h-[48px] rounded-[50%] bg-green2 flex justify-center items-center'>
        <img className='' src={icon} width={20} height={20} />
      </div>

      <div className=' flex flex-col gap-2'>
        <p>{heading}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};
