import { Link } from 'react-router-dom';
import { logo, logoWhite, mailIcon } from '../assets';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex mt-[154px] justify-center items-center pb-[99px]'>
      <div className='flex gap-[100px]'>
        <div className='flex justify-center w-[200px] h-[119px]'>
          <img className=' text-blue-700' src={logo} alt='logo' width={150} />
        </div>
        <div className=' flex flex-col gap-[10px]'>
          <h2 className=' leading-[28px] font-clash700 text-[16px]'>Product</h2>
          <Link className=' text-font4'>Autocapture</Link>
          <Link className=' text-font4'>Data Governance</Link>
          <Link className=' text-font4'>Virtual Events</Link>
          <Link className=' text-font4'>Virtual Users</Link>
          <Link className=' text-font4'>Behavioral Analytics</Link>
          <Link className=' text-font4'>Connect</Link>
        </div>
        <div className=' flex flex-col gap-[10px]'>
          <h2 className=' leading-[28px] font-clash700 text-[16px]'>Explore</h2>
          <Link className=' text-font4'>Resources</Link>
          <Link className=' text-font4'>Blog</Link>
          <Link className=' text-font4'>Documents</Link>
        </div>
        <div className='flex flex-col'>
          <h2 className=' leading-[28px] font-clash700 text-[16px] mb-5'>
            OFFICE LOCATION
          </h2>
          <p className=' text-[14px] leading-[22px]'>
            ABC Company, 123 East, 17th Street, St. louis 10001
          </p>
          <h2 className=' leading-[28px] font-clash700 text-[16px] mt-[90px]'>
            News letter
          </h2>
          <div>
            <div>
              <div className='flex justify-between mt-6'>
                <label
                  htmlFor='mailNews'
                  className='text-[14px] leading-[22px]'
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
            <p className=' mt-[90px] text-[12px] leading-[20px]'>
              © {currentYear} ABC. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
