import { NavBar, Alert, Footer } from '../../components';
import { useFeatureContext } from '../../contexts/feature/FeatureContext';
import { useProductContext } from '../../contexts/product/productContext';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { headphone } from '../../assets';
import { useEffect, useState } from 'react';
import ModalNewProduct from './ModalNewProduct';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const AdminProduct = () => {
  const { showAlert } = useFeatureContext();
  const { adminDeleteAProduct } = useProductContext();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [show, setShow] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  // const config = {
  //   withCredentials: true,
  //   credentials: 'include',
  // };

  const getAllProducts = async (page = 1) => {
    await axios
      .get(`${apiUrl}/products?admin=true&page=${page}`)
      .then((data) => {
        const { totalProducts, currentPage, totalPages, products } = data.data;
        setProducts(() => products);
        setTotalPages(() => totalPages);
        setTotalProducts(() => totalProducts);
        setCurrentPage(() => currentPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = async (id) => {
    await adminDeleteAProduct(id);
    const updatedProducts = products.filter((prod) => prod._id !== id);
    setProducts([...updatedProducts]);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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
                    <img
                      className=''
                      src={product?.images[0]?.url}
                      width={48}
                      height={48}
                    />
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
                      // onClick={() => {
                      //   adminDeleteproduct(product._id);
                      // }}
                      className=' w-[80%] flex justify-center items-center'
                    >
                      <PencilIcon width={24} color='green' />
                    </button>
                  </td>
                  <td className='px-6 py-4 '>
                    <button
                      onClick={() => {
                        deleteProduct(product._id);
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
        <Pagination
          currentPage={Number(currentPage)}
          totalPage={Number(totalPages)}
          getAllProducts={getAllProducts}
          totalProducts={Number(totalProducts)}
        />
      </div>
      <Footer />
    </>
  );
};

export default AdminProduct;
