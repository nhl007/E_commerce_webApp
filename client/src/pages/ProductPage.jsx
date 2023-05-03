import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { cartIcon, headphone } from '../assets';
import { useProductContext } from '../contexts/product/productContext';

const ProductPage = () => {
  const {
    currentProduct,
    getASingleProduct,
    getProductReview,
    currentProductReviews,
  } = useProductContext();
  const { productId } = useParams();

  useEffect(() => {
    getASingleProduct(productId);
    getProductReview(productId);
  }, [productId]);

  return (
    <>
      <NavBar />
      <p className=' mt-3 text-[1rem]'>
        Category {'>'} {currentProduct?.category}
      </p>
      <div className='flex mt-20 gap-20'>
        <div className=' max-w-[400px] h-[auto]'>
          <img src={headphone} alt='product' />
        </div>
        <div className=' flex flex-col justify-start gap-4'>
          <p className=' text-[2.4rem] font-clash600'>{currentProduct?.name}</p>
          <Star rating={3.1} />
          <div className=' flex mt-4 gap-4 justify-center'>
            <div className=' w-[100px] bg-green1 h-[50px]'></div>
            <div className=' w-[100px] bg-green1 h-[50px]'></div>
            <div className=' w-[100px] bg-green1 h-[50px]'></div>
          </div>
          <p className=' text-[2.4rem]'>{currentProduct?.description}</p>
          <p className=' text-[2.4rem]'>In Stock : {currentProduct?.stock}</p>
          <p className=' text-[2.4rem] font-clash600'>
            Price : {currentProduct?.price}$
          </p>
          <button>
            <img src={cartIcon} width={40} />
          </button>
        </div>
      </div>
      {currentProductReviews?.map((review, index) => {
        return (
          <div key={index}>
            <p>{review.name}</p>
            <Star rating={review.rating} />
            <p>{review.comments}</p>
          </div>
        );
      })}
      <RelatedProducts category={currentProduct?.category} />
    </>
  );
};

export default ProductPage;

const Star = ({ rating }) => {
  const ceil = Math.ceil(rating);
  return (
    <div>
      {[...Array(ceil)].map((_, i) => (
        <span key={i}>⭐</span>
      ))}
    </div>
  );
};

const RelatedProducts = ({ category }) => {
  return (
    <div>
      <h1>Related Products</h1>
      {category}
    </div>
  );
};
