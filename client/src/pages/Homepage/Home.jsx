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
import Navigation from './components/Navigation';
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
      <div className=' flex flex-row justify-start items-end mt-[53px] gap-[32px] relative'>
        <Category />
        <div className='  absolute right-0 top-[1rem]'>
          <Navigation />
        </div>
        <div className=' max-w-[570px] max-h-[380px] px-[48px] pt-[3.2rem] pb-[3.2rem] flex flex-col gap-[1.6rem] __shadow rounded-[10px] bg-whiteBg'>
          <h1 className=' font-clash600 text-[48px] leading-[59px] text-font1'>
            Nikon D3100
          </h1>
          <div className=' flex gap-[48px]'>
            <div className=' flex flex-col'>
              <p className=' max-w-[200px] text-[11px] leading-[14px] mb-[2.4rem]'>
                Easily capture the beauty of life's fleeting moments with
                Nikon's compact and lightweight D3100
              </p>

              <h1 className='font-clash600 text-[24px] leading-[30px] text-font1 mb-[4.8rem]'>
                $798.00
              </h1>

              <ButtonGreen text={'Shop Now'} width={'110px'} height={'44px'} />
            </div>
            <div>
              <img src={hero} width={213} height={206} />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[19px]'>
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
      <div className=' flex mt-[128px] gap-10 justify-center items-center'>
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
      <div className='ml-[-12rem] px-[12rem] w-[100vw] h-[251px] mt-[94px] bg-greyBg flex justify-center '>
        <div className='flex justify-between w-full relative ml-[3rem]'>
          <div className=' flex flex-col pt-8'>
            <h1 className='font-clash600 text-[48px] leading-[59px] text-font1 mb-4'>
              The Membership Plan
            </h1>
            <p className='mb-[44px] max-w-[688px]'>
              provides 24/7/365 tech support, up to 24 months of product
              protection with active membership, free standard installation and
              so much more.Terms and conditions apply.
            </p>
            <p className='font-clash600 text-[32px] leading-[39px] text-font1 mb-4'>
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
