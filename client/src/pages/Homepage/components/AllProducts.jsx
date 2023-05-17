import React, { useEffect } from 'react';
import Card from './Card';
import { useProductContext } from '../../../contexts/product/productContext';
import Pagination from '../../../components/Pagination';

const AllProducts = () => {
  const { products, currentPage, totalPages, totalProducts, getAllProducts } =
    useProductContext();

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <section>
      <h1 className='font-clash600 text-[3.2rem] leading-[3.9rem] mb-[4.8rem] sm:mb-[2.4rem]'>
        More Products
      </h1>

      <div className=' grid sm:flex grid-flow-row grid-cols-4 gap-x-[3rem] gap-y-[5rem] sm:gap-[1.6rem] sm:overflow-x-scroll'>
        {products?.map((p, index) => {
          return (
            <Card
              key={index}
              id={p._id}
              image={p?.images[0]?.url}
              heading={p.name}
              description={p.description}
              price={p.price}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPage={totalPages}
        getAllProducts={getAllProducts}
        totalProducts={totalProducts}
      />
    </section>
  );
};

export default AllProducts;
