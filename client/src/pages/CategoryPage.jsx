import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useProductContext } from '../contexts/product/productContext';
import Card from './Homepage/components/Card';
import { headphone } from '../assets';
import { currencyFormatter } from '../utils/mathOperations';
import Category from './Homepage/components/Category';

const CategoryPage = () => {
  const { category } = useParams();
  const { onSearch } = useProductContext();
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
      <div className=' flex mt-[4rem] gap-[3rem]'>
        <Category current={category} />
        <div className=' flex flex-col w-full'>
          <div className=' flex gap-[1rem] h-[3.5rem] justify-center items-center self-end pr-2'>
            <h1>Price Range : </h1>
            <input
              type='range'
              className=' w-[20rem] bg-slate-700'
              value={range}
              max='10000'
              min='1'
              onInput={(e) => setRange(e.target.value)}
            />
            <p className='flex justify-center gap-2 text-right w-[10rem]'>
              <span className=' text-fontRed text-[2.4rem]'>&lt;</span>

              {currencyFormatter(range)}
            </p>
          </div>

          <div className=' w-full flex-wrap flex gap-[1rem] mt-[3.2rem]'>
            {products?.map((product, index) => {
              return (
                <Card
                  key={index}
                  image={headphone}
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
    </>
  );
};

export default CategoryPage;
