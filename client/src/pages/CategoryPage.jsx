import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar, Footer, Alert } from '../components';
import { useProductContext } from '../contexts/product/productContext';
import Card from './Homepage/components/Card';
import Category from './Homepage/components/Category';
import { useFeatureContext } from '../contexts/feature/FeatureContext';

const CategoryPage = () => {
  const { category } = useParams();
  const { onSearch } = useProductContext();
  const { showAlert } = useFeatureContext();
  const [products, setProducts] = useState(null);
  const [totalProd, setTotalProd] = useState(0);
  const [range, setRange] = useState(10000);

  const fetchProducts = async () => {
    const { total, data } = await onSearch('', category, '0-' + range);
    setProducts(() => data);
    setTotalProd(() => total);
  };

  useEffect(() => {
    fetchProducts();
  }, [category, range]);

  return (
    <>
      <NavBar />
      {showAlert && <Alert />}
      <div className=' flex sm:flex-col mt-[4rem] gap-[3rem]'>
        <Category current={category} />
        <div className=' flex flex-col'>
          <div className='flex gap-[1rem] sm:gap-[.5rem] h-[3.5rem] justify-end sm:justify-center items-center'>
            <h1 className=' font-clash600  text-[2rem]'>Price Range : </h1>
            <input
              type='range'
              className=' w-[20rem] sm:w-[10rem] '
              value={range}
              max='10000'
              min='1'
              onInput={(e) => setRange(e.target.value)}
            />
            {/* <p className='flex justify-center gap-2 text-right w-[10rem]  font-clash600  text-[2rem]'> */}
            <span className=' text-fontRed font-clash600 text-[2.4rem]'>
              &lt;
            </span>

            <span className='font-clash600  text-[2rem] w-[8.3rem]'>
              {range + ' $'}
            </span>
            {/* </p> */}
          </div>
          <p className=' self-end sm:self-center mr-[.2rem]'>
            Total {totalProd} product found
          </p>

          <div className='flex flex-wrap sm:flex-nowrap sm:overflow-x-scroll  gap-[1rem] mt-[3.2rem] '>
            {products?.map((product, index) => {
              return (
                <Card
                  key={index}
                  image={product.images[0].url}
                  heading={product.name}
                  description={product.description}
                  price={product.price}
                  id={product._id}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;
