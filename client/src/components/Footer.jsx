import { Link } from 'react-router-dom';
import { logo, mailIcon } from '../assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex mt-[12rem] sm:mt-[8rem] justify-center items-center pb-[9rem] sm:pb-[4.8rem]'>
      <div className='flex gap-[100px] sm:gap-[2.4rem] sm:flex-wrap justify-between'>
        <div className='flex justify-center w-[full] mt-2'>
          <img
            className=' text-blue-700 w-[10rem] h-[6rem] sm:w-[5rem] sm:h-[3rem]'
            src={logo}
            alt='logo'
          />
        </div>
        <div className=' flex flex-col gap-[1rem]'>
          <h2 className=' leading-[2.8rem] font-clash700 text-[1.6rem]'>
            Product
          </h2>
          <Link className=' text-font4'>Auto Capture</Link>
          <Link className=' text-font4'>Data Governance</Link>
          <Link className=' text-font4'>Virtual Events</Link>
          <Link className=' text-font4'>Virtual Users</Link>
          <Link className=' text-font4'>Behavioral Analytics</Link>
          <Link className=' text-font4'>Connect</Link>
        </div>
        <div className=' flex flex-col gap-[1rem]'>
          <h2 className=' leading-[2.8rem] font-clash700 text-[1.6rem]'>
            Explore
          </h2>
          <Link className=' text-font4'>Resources</Link>
          <Link className=' text-font4'>Blog</Link>
          <Link className=' text-font4'>Documents</Link>
        </div>
        <div className='sm:w-full flex flex-col sm:flex-row sm:flex-wrap '>
          <div className=' flex flex-col'>
            <h2 className=' leading-[2.8rem] font-clash700 text-[1.6rem] mb-5 sm:mb-2'>
              OFFICE LOCATION
            </h2>
            <p className=' text-[1.4rem] leading-[2.2rem]'>
              ABC Company, 123 East, 17th Street, St. louis 10001
            </p>
          </div>
          <div className='w-full'>
            <h2 className=' leading-[2rem.8] font-clash700 text-[1.6rem] mt-[9rem] sm:mt-[2rem]'>
              News letter
            </h2>
            <div className='w-full'>
              <div>
                <div className='flex justify-between mt-6 sm:mt-3'>
                  <label
                    htmlFor='mailNews'
                    className='text-[1.4rem] leading-[2.2rem]'
                  >
                    Enter your email address
                  </label>
                  <img src={mailIcon} alt='mail' />
                </div>
                <input
                  name='mailNews'
                  className=' border-[0px] border-b-2 w-full mt-5 focus:outline-none'
                />
              </div>
              <p className='w-full mt-[9rem] sm:mt-[4.8rem] text-center text-[1.2rem] leading-[2rem]'>
                © {currentYear} ABC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
