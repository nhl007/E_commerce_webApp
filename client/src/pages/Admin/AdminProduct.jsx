import { NavBar, Alert } from '../../components';
import { useFeatureContext } from '../../contexts/feature/FeatureContext';
import { useProductContext } from '../../contexts/product/productContext';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { headphone } from '../../assets';
import { useState } from 'react';
import ModalNewProduct from './ModalNewProduct';

const AdminProduct = () => {
  const { showAlert } = useFeatureContext();
  const { products, adminDeleteAProduct } = useProductContext();

  const [show, setShow] = useState(false);
  return (
    <>
      <NavBar />
      {showAlert ? <Alert /> : null}
      {show ? <ModalNewProduct show={show} setShow={setShow} /> : null}
      <div className='w-full mt-[8rem] flex flex-col'>
        <h1 className=' self-center text-[3.2rem] font-clash600'>
          Product Dashboard
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
                Image
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Name
              </th>

              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Description
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Price
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Seller
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Stock
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1 '>
                Ratings
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Created At
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Edit
              </th>
              <th scope='col' className='px-6 py-3 sm:px-1  sm:py-1'>
                Delete
              </th>
            </tr>
          </thead>
          {products?.map((product, index) => {
            return (
              <tbody key={index}>
                <tr className=' border-b hover:bg-green4'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium whitespace-nowrap'
                  >
                    <img className='' src={headphone} width={48} height={48} />
                  </th>
                  <td className='px-6 py-4'>{product.name}</td>
                  <td className='px-6 py-4 '>{product.description}</td>
                  <td className='px-6 py-4 '>{product.price}</td>
                  <td className='px-6 py-4 '>{product.seller}</td>
                  <td className='px-6 py-4 '>{product.stock}</td>
                  <td className='px-6 py-4 '>{product.ratings}</td>
                  <td className='px-6 py-4 '>
                    {product.createdAt.slice(0, 10)}
                  </td>
                  <td className='px-6 py-4 '>
                    <button
                      onClick={() => {
                        adminDeleteproduct(product._id);
                      }}
                      className=' w-[80%] flex justify-center items-center'
                    >
                      <PencilIcon width={24} color='green' />
                    </button>
                  </td>
                  <td className='px-6 py-4 '>
                    <button
                      onClick={() => {
                        adminDeleteAProduct(product._id);
                      }}
                      className=' w-[80%] flex justify-center items-center'
                    >
                      <TrashIcon width={24} color='red' />
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default AdminProduct;
