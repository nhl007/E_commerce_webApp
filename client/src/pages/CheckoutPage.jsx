import axios from 'axios';
import { useState } from 'react';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const CheckoutPage = ({ products, setShow, total }) => {
  const { displayAlert } = useFeatureContext();
  const shipping = {
    address: '',
    city: '',
    phone: '',
    postalCode: '',
    country: '',
  };

  const [shipInfo, setShipInfo] = useState(shipping);

  const handleChange = (e) => {
    setShipInfo({ ...shipInfo, [e.target.name]: e.target.value });
  };

  const config = {
    withCredentials: true,
    credentials: 'include',
  };
  const apiUrl = import.meta.env.VITE_API_URL;

  const createANewOrder = async (order) => {
    await axios
      .post(`${apiUrl}/order/new`, order, config)
      .then((res) => {
        setShow((prev) => !prev);
        if (res.data.success) {
          displayAlert('Successfully created order!');
        }
      })
      .catch((err) => {
        displayAlert('Error Occurred!', false);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      shippingInfo: shipInfo,
      orderedItems: products,
      totalPrice: total,
    };

    await createANewOrder(data);
  };

  return (
    <section className='w-full h-full flex justify-center items-center bg-[transparent] z-[999] fixed'>
      <form
        onSubmit={onSubmit}
        className='fixed bottom-0 p-[1.6rem] w-[40%] sm:ml-[-2rem] sm:w-[100%] flex flex-col bg-font4 text-font5 '
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setShow(false);
          }}
          className=' absolute top-0 right-0 bg-fontRed px-[1.6rem] sm:px-[1rem] text-[2.4rem] sm:text-[1.6rem] py-[.8rem] sm:py-[.5rem]'
        >
          X
        </button>
        <h1 className=' text-[2.4rem]'>Shipping Info</h1>
        <div className=' flex gap-[1rem] items-center justify-between mt-[1.6rem]'>
          <label className=' font-clash600'> Phone :</label>
          <input
            name='phone'
            placeholder='Home phone'
            onChange={handleChange}
            autoComplete='phone'
            className=' w-[70%] text-[1.6rem] sm:text-[1.2rem] py-2 sm:py-1 px-4 rounded-sm'
          />
        </div>
        <div className=' flex gap-[1rem] items-center justify-between mt-[1.6rem]'>
          <label className=' font-clash600'> Address :</label>
          <input
            name='address'
            placeholder='Home Address'
            onChange={handleChange}
            autoComplete='address'
            className=' w-[70%] text-[1.6rem] sm:text-[1.2rem] py-2 sm:py-1 px-4 rounded-sm'
          />
        </div>
        <div className=' flex gap-[1rem] justify-between  items-center mt-[1.6rem]'>
          <label className=' font-clash600'> City :</label>
          <input
            name='city'
            placeholder='Home city'
            onChange={handleChange}
            autoComplete='city'
            className=' w-[70%] text-[1.6rem] sm:text-[1.2rem] py-2 sm:py-1 px-4 rounded-sm'
          />
        </div>

        <div className=' flex gap-[1rem] items-center justify-between mt-[1.6rem]'>
          <label className=' font-clash600'> PostalCode :</label>
          <input
            name='postalCode'
            placeholder='Home postalCode'
            onChange={handleChange}
            autoComplete='postalCode'
            className=' w-[70%] text-[1.6rem] sm:text-[1.2rem] py-2 sm:py-1 px-4 rounded-sm'
          />
        </div>
        <div className=' flex gap-[1rem] items-center justify-between mt-[1.6rem]'>
          <label className=' font-clash600'> Country :</label>
          <input
            name='country'
            placeholder='Home country'
            onChange={handleChange}
            autoComplete='country'
            className=' w-[70%] text-[1.6rem] sm:text-[1.2rem] py-2 sm:py-1 px-4 rounded-sm'
          />
        </div>
        <button
          type='submit'
          className={`self-center rounded-[8px] bg-green2 px-[8px] py-[4px] text-font2 font-clash700 text-[16px] leading-[21px] w-[150px] mt-[2.4rem]`}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default CheckoutPage;
