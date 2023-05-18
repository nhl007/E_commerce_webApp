import React, { useEffect, useState } from 'react';
import { NavBar, Footer, Alert, Loading } from '../components';
import axios from 'axios';
// import { headphone } from '../assets';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const OrderPage = () => {
  const { showAlert, displayAlert, isloading, setIsLoading } =
    useFeatureContext();
  const apiUrl = import.meta.env.VITE_API_URL;
  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(`${apiUrl}/orders/me`, config);
      const { order, totalOrders } = data.data;
      setOrders(() => order);
      setTotalOrders(() => Number(totalOrders));
    } catch (err) {
      displayAlert('Error Occurred', false);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const deleteOrder = async (id) => {
    setIsLoading(true);
    await axios
      .delete(`${apiUrl}/admin/orders/${id}`, config)
      .then(() => {
        const updatedOrders = orders.filter((order) => order._id !== id);
        setOrders(() => updatedOrders);
        displayAlert('Successfully Canceled Order');
      })
      .catch((err) => {
        displayAlert("Couldn't Cancel Order", false);
      });
    setIsLoading(false);
  };

  // const updateOrder = async (id, data) => {
  //   await axios
  //     .put(`${apiUrl}/admin/orders/${id}`, data, config)
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      {isloading && <Loading />}
      {showAlert && <Alert />}
      <NavBar />
      <h1 className='text-[3.2rem] leading-[4rem] text-font1 font-clash600 mt-[3.2rem] sm:text-center mb-2'>
        Your Orders
      </h1>
      <div className=' h-[1px] w-full bg-font5 mb-8' />
      <p className=' text-[2.4rem] sm:text-[1.6rem] font-clash600'>
        Total Orders : {totalOrders}
      </p>
      {totalOrders ? (
        <div className='sm:overflow-x-scroll'>
          <div className=' flex flex-col gap-[2.4rem] sm:w-[250%] '>
            <table className='w-full text-[1.6rem] sm:text-[1.2rem] text-left text-font5 mt-[2.4rem]'>
              <thead className='text-[1.8rem] text-font5 uppercase bg-font4 '>
                <tr className=' sm:text-[1.2rem]'>
                  <th scope='col' className='px-3 py-3   sm:py-1'>
                    Status
                  </th>
                  <th scope='col' className='px-3 py-3   sm:py-1'>
                    Product Info
                  </th>
                  <th scope='col' className='px-3 py-3   sm:py-1 '>
                    Shipping Info
                  </th>
                  <th scope='col' className='px-3 py-3   sm:py-1 '>
                    Total Price
                  </th>
                  <th scope='col' className='px-3 py-3   sm:py-1 '>
                    Payment Status
                  </th>
                  <th scope='col' className='px-3 py-3   sm:py-1'>
                    Order Date
                  </th>
                  <th scope='col' className='px-3 py-3   sm:py-1'>
                    Cancel
                  </th>
                </tr>
              </thead>
              {orders?.map((order, index) => {
                return (
                  <OrderDetails
                    key={index}
                    order={order}
                    deleteOrder={deleteOrder}
                  />
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <p className='mt-4'>No records found !</p>
      )}

      <Footer />
    </>
  );
};

const OrderDetails = ({ order, deleteOrder }) => {
  return (
    <tbody>
      <tr className=' border-b hover:bg-green4'>
        <th scope='row' className='px-3 py-4 font-medium'>
          {order.orderStatus}
        </th>
        <td className=' px-3 py-4'>
          {order.orderedItems?.map((item, index) => {
            return (
              <div key={index} className=' flex gap-[1.6rem] items-center my-4'>
                <img alt={item.name} src={item.image} width={40} height={40} />
                <div className=' flex flex-col justify-center  gap-2'>
                  <p>{item.name}</p>
                  <p>
                    {item.price + ' $'}

                    <span className='mx-3 text-fontRed'>X</span>
                    <span>{item.quantity}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </td>
        <td className='px-3 py-4 '>
          <p>
            {' '}
            <span className='font-clash600 '>Phone :</span>{' '}
            {order.shippingInfo.phone}
          </p>
          <p>
            {' '}
            <span className='font-clash600'>Address :</span>{' '}
            {order.shippingInfo.address}
          </p>
          <p>
            {' '}
            <span className='font-clash600'>City : </span>
            {order.shippingInfo.city}
          </p>
          <p>
            {' '}
            <span className='font-clash600'>PostalCode :</span>{' '}
            {order.shippingInfo.postalCode}
          </p>
          <p>
            {' '}
            <span className='font-clash600'>Country : </span>
            {order.shippingInfo.country}
          </p>
        </td>
        <td className='px-3 py-4 '>{order.totalPrice + ' $'}</td>
        <td className='px-3 py-4 '>
          {order.paymentInfo.status ? 'Paid' : 'Not-Paid'}
        </td>

        <td className='px-3 py-4'>{order.createdAt.slice(0, 10)}</td>
        <td className='px-3 py-4 '>
          <button
            onClick={() => deleteOrder(order._id)}
            className=' w-[80%] flex justify-center items-center'
          >
            <TrashIcon width={24} color='red' />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default OrderPage;
