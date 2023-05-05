import axios from 'axios';
import { useState } from 'react';

const CheckoutPage = ({ products, setShow, total }) => {
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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
    <section className=' ml-[-12rem] fixed w-full h-full flex justify-center items-center gap-[3.2rem] bg-[transparent] z-[999]'>
      <form
        onSubmit={onSubmit}
        className='p-[1.6rem] relative w-[60%] h-[100%] flex flex-col bg-font4 text-font5 '
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            setShow(false);
          }}
          className=' absolute top-0 right-0 bg-fontRed px-[1.6rem] text-[2.4rem] py-[.8rem]'
        >
          X
        </button>
        <h1 className=' text-[2.4rem]'>Shipping Info</h1>
        <div className=' flex gap-[1rem] items-center mt-[1.6rem]'>
          <label className=' font-clash600'> Address :</label>
          <input
            name='address'
            placeholder='Home Address'
            onChange={handleChange}
            autoComplete='address'
            className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
          />
        </div>
        <div className=' flex gap-[1rem] items-center mt-[1.6rem]'>
          <label className=' font-clash600'> City :</label>
          <input
            name='city'
            placeholder='Home city'
            onChange={handleChange}
            autoComplete='city'
            className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
          />
        </div>
        <div className=' flex gap-[1rem] items-center mt-[1.6rem]'>
          <label className=' font-clash600'> phone :</label>
          <input
            name='phone'
            placeholder='Home phone'
            onChange={handleChange}
            autoComplete='phone'
            className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
          />
        </div>
        <div className=' flex gap-[1rem] items-center mt-[1.6rem]'>
          <label className=' font-clash600'> postalCode :</label>
          <input
            name='postalCode'
            placeholder='Home postalCode'
            onChange={handleChange}
            autoComplete='postalCode'
            className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
          />
        </div>
        <div className=' flex gap-[1rem] items-center mt-[1.6rem]'>
          <label className=' font-clash600'> country :</label>
          <input
            name='country'
            placeholder='Home country'
            onChange={handleChange}
            autoComplete='country'
            className=' w-[70%] text-[1.6rem] py-2 px-4 rounded-sm'
          />
        </div>
        <button
          type='submit'
          className={`rounded-[8px] bg-green2 px-[8px] py-[4px] text-font2 font-clash700 text-[16px] leading-[21px] w-[150px] mt-[2.4rem]`}
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default CheckoutPage;
