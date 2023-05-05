import { NavBar, Alert } from '../../components';
import { useFeatureContext } from '../../contexts/feature/FeatureContext';
import { TrashIcon, PencilIcon, TicketIcon } from '@heroicons/react/24/outline';
import { headphone } from '../../assets';
import { useEffect, useState } from 'react';
import ModalNewProduct from './ModalNewProduct';
import axios from 'axios';

const AdminOrders = () => {
  const { showAlert } = useFeatureContext();

  const apiUrl = import.meta.env.VITE_API_URL;
  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  const [orders, setOrders] = useState([]);
  const [totalOrder, setTotalOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const getAllOrders = async () => {
    await axios
      .get(`${apiUrl}/admin/orders`, config)
      .then((data) => {
        const { totalOrders, totalAmmount, order } = data.data;
        setOrders(...orders, order);
        setTotalOrders(totalOrders);
        setTotalAmount(totalAmmount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteOrder = async (id) => {
    await axios.delete(`${apiUrl}/admin/orders/${id}`, config).then(() => {
      const updatedOrders = orders.filter((order) => order._id !== id);
      setOrders(updatedOrders);
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  const [show, setShow] = useState(false);
  return (
    <>
      <NavBar />
      {showAlert ? <Alert /> : null}
      {show ? <ModalNewProduct show={show} setShow={setShow} /> : null}
      <div className='w-full mt-[8rem] flex flex-col'>
        <h1 className=' self-center text-[3.2rem] font-clash600'>
          Orders Dashboard
        </h1>
        <div className=' flex gap-[4.8rem] mt-[2.4rem]'>
          <button
            onClick={() => setShow(true)}
            className=' px-[1.6rem] py-[.8rem] bg-font4 text-font5'
          >
            Add New Product
          </button>
        </div>
        <table className='w-full text-[1.6rem] sm:text-[1.2rem] text-left text-font5 mt-[2.4rem]'>
          <thead className='text-[1.8rem] text-font5 uppercase bg-font4 '>
            <tr className=' sm:text-[1.2rem]'>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Ordered By
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Product Info
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Shipping Info
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Price
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Payment Status
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Paid At
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Order Status
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Order Date
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Edit
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Delete
              </th>
            </tr>
          </thead>
          {orders &&
            orders?.map((order, index) => {
              return (
                <OrderDetails
                  deleteOrder={deleteOrder}
                  key={index}
                  order={order}
                />
              );
            })}
        </table>
      </div>
    </>
  );
};

export default AdminOrders;

const OrderDetails = ({ order, deleteOrder }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  const [user, setUser] = useState(null);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  const fetchUserInfo = () => {
    axios
      .get(`${apiUrl}/admin/users/${order.user}`, config)
      .then((response) => {
        const userData = response.data.user;
        setUser(userData);
      });
  };
  const updateOrder = async () => {
    await axios
      .put(
        `${apiUrl}/admin/orders/${order._id}`,
        {
          status: orderStatus,
        },
        config
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  useEffect(() => {
    fetchUserInfo();
    console.log('sp');
  }, []);

  return (
    <tbody>
      <tr className=' border-b hover:bg-green4'>
        <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </th>
        <td className='px-6 py-4'>
          {order.orderedItems?.map((item, index) => {
            return <p key={index}>{item.quantity}</p>;
          })}
        </td>
        <td className='px-6 py-4 '>
          <p>{order.shippingInfo.city}</p>
        </td>
        <td className='px-6 py-4 '>{order.totalPrice}</td>
        <td className='px-6 py-4 '>
          {order.paymentInfo.status ? 'Paid' : 'Not-Paid'}
        </td>
        <td className='px-6 py-4 '>{order.paidAt.slice(0, 10)}</td>
        <td className='px-6 py-4'>
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value.trim())}
          >
            <option key='Processing' value='Processing'>
              Processing
            </option>
            <option key='Delivered' value='Delivered'>
              Delivered
            </option>
            <option key='Cancelled' value='Cancelled'>
              Cancelled
            </option>
          </select>
        </td>
        <td className='px-6 py-4'>{order.createdAt.slice(0, 10)}</td>
        <td className='px-6 py-4 '>
          <button
            onClick={() => {
              updateOrder();
            }}
            className=' hover:underline w-[80%] flex justify-center items-center text-[2.4rem]'
          >
            ✔
          </button>
        </td>
        <td className='px-6 py-4 '>
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
