import NavBar from '../../components/NavBar';
import Featured from './components/Featured';
import Banner from './components/Banner';
import Footer from '../../components/Footer';
import AllProducts from './components/AllProducts';
import { Alert, Loading } from '../../components';
import { useFeatureContext } from '../../contexts/feature/FeatureContext';

const Home = () => {
  const { showAlert, isloading } = useFeatureContext();
  return (
    <div className=' flex flex-col'>
      {showAlert && <Alert />}
      {isloading && <Loading />}
      <NavBar />
      <Featured />
      <Banner />
      <AllProducts />
      <MemberShip />
      <Footer />
    </div>
  );
};

export default Home;

const MemberShip = () => {
  return (
    <section className='lg:ml-[-4rem] xl:ml-[-12rem] sm:ml-0 px-[12rem] sm:px-0 w-[100vw] sm:w-full h-[25.1rem] sm:h-auto mt-[9.4rem] sm:mt-[2.4rem] bg-greyBg flex justify-center '>
      <div className='flex justify-between w-full relative ml-[3rem] sm:ml-0'>
        <div className=' flex flex-col pt-8'>
          <h1 className='font-clash600 text-[4.8rem] sm:text-[3.2rem] sm:leading-[3.9rem] leading-[5.9rem] text-font1 mb-4'>
            The Membership Plan
          </h1>
          <p className='mb-[4.4rem] sm:mb-[2.4rem] max-w-[688px]'>
            provides 24/7/365 tech support, up to 24 months of product
            protection with active membership, free standard installation and so
            much more.Terms and conditions apply.
          </p>
          <p className='font-clash600 text-[3.2rem] leading-[3.9rem] text-font1 mb-4 sm:mb-2'>
            Coming Soon
          </p>
        </div>
      </div>
    </section>
  );
};
