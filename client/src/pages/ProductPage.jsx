import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NavBar, Footer, Alert } from '../components';
import { cartIcon } from '../assets';
import { useAuthContext } from '../contexts/auth/AuthContext';
import axios from 'axios';
import { useFeatureContext } from '../contexts/feature/FeatureContext';
import { useProductContext } from '../contexts/product/productContext';

const ProductPage = () => {
  const { addToCart } = useProductContext();
  const navigate = useNavigate();

  const { user } = useAuthContext();
  const { displayAlert, showAlert } = useFeatureContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [productReviews, setProductReviews] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [hasReviewed, setHasReviewed] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  const getASingleProduct = async () => {
    await axios
      .get(`${apiUrl}/product/${productId}`)
      .then((data) => {
        const { product } = data.data;
        setProduct(() => product);
      })
      .catch(() => {
        displayAlert('No Product Found By This Id', false);
        return navigate('/');
      });
  };

  const getProductReviews = async () => {
    await axios
      .get(`${apiUrl}/review?id=${productId}`, config)
      .then((data) => {
        const { reviews } = data.data;
        setProductReviews(() => reviews);
        if (user) {
          const isReviewed = reviews.find((review) => review.user === user._id);

          setHasReviewed(() => isReviewed);
        }
      })
      .catch(() => {
        displayAlert('Error Occurred', false);
      });
  };

  useEffect(() => {
    getASingleProduct();
    getProductReviews();
  }, [productId]);

  const delProductReview = async () => {
    await axios
      .delete(
        `${apiUrl}/review?productId=${productId}&id=${hasReviewed._id}`,
        config
      )
      .then(async (data) => {
        await getProductReviews();
        displayAlert(data.data.message);
      })
      .catch(() => {
        displayAlert("Couldn't delete product review!", false);
      });
  };

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const postReview = async () => {
    await axios
      .post(
        `${apiUrl}/product/review`,
        {
          rating: rating,
          comment: comment,
          productId: productId,
        },
        config
      )
      .then((data) => {
        setProductReviews(() => data.data.reviews);
        displayAlert(data.data.message);
        const isReviewed = data.data.reviews.find(
          (review) => review.user === user._id
        );
        console.log(isReviewed);
        setHasReviewed(() => isReviewed);
      })
      .catch(() => {
        displayAlert("Couldn't save product review!", false);
      });
  };

  return (
    <>
      <NavBar />
      {showAlert && <Alert />}
      <p className=' mt-3 text-[1rem]'>
        Category {'>'} {product?.category}
      </p>
      <div className='flex sm:flex-col mt-20 sm:mt-10 gap-20 sm:gap-10'>
        <div className=' max-w-[30rem] h-auto'>
          <img
            src={currentImage ? currentImage : product?.images[0]?.url}
            alt='product'
          />
        </div>
        <div className=' flex flex-col justify-start gap-10'>
          <p className=' text-[3.2rem] font-clash600'>{product?.name}</p>
          <div className=' flex mt-4 gap-4 items-center'>
            {product?.images?.map((image, index) => {
              return (
                <div
                  key={index}
                  className=' max-w-[10rem] h-auto'
                  onClick={() => setCurrentImage(image.url)}
                >
                  <img src={image.url} />
                </div>
              );
            })}
          </div>
          <p className=' text-[2rem]'>{product?.description}</p>
          <p className=' text-[2rem]'>In Stock : {product?.stock}</p>
          <p className=' text-[2.4rem] font-clash600'>
            Price : {product?.price}$
          </p>
          <button onClick={() => addToCart(productId)}>
            <img src={cartIcon} width={40} />
          </button>
        </div>
      </div>
      <p className=' mt-[4.8rem] text-[3.2rem] sm:text-[2.4rem] font-clash700'>
        Product Reviews
      </p>
      <div className=' w-full h-[1px]  bg-font1 my-6' />

      {productReviews?.length
        ? productReviews?.map((review, index) => {
            return (
              <div
                className='max-w-full flex flex-col justify-center gap-4 text-font1 my-4'
                key={index}
              >
                <Star rating={review.rating} />
                <p>
                  <span className=' text-[1.6rem] font-clash600'>By : </span>{' '}
                  {review.name}
                </p>
                <p>
                  <span className=' text-[1.6rem] font-clash600'>
                    Comment :{' '}
                  </span>
                  {review.comments}
                </p>
                <div className=' w-full h-[1px]  bg-font1 my-3' />
              </div>
            );
          })
        : 'No Reviews Yet'}
      {/* <RelatedProducts category={product?.category} /> */}

      {user ? (
        <div className='flex sm:flex-col gap-8 items-center sm:items-start'>
          <p className=' text-[3.2rem] sm:text-[2.4rem] leading-10 font-clash700'>
            {hasReviewed ? 'Update Review' : 'Post A review'}
          </p>
          <div className='flex gap-4 items-center'>
            <p>Select Rating:</p>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className='flex gap-4 items-center'>
            <label htmlFor='comment'>Comment:</label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              name='comment'
              className=' w-[30rem] sm:w-[25rem] p-4 bg-greyBg'
            />
          </div>
          <div className=' flex gap-4'>
            <button
              onClick={postReview}
              className=' px-6 py-4 bg-green2 ml-4 text-whiteBg text-[2.4rem]'
            >
              Post
            </button>
            {hasReviewed && (
              <button
                onClick={delProductReview}
                className=' px-6 py-4 ml-4 bg-fontRed text-[2.4rem] text-font2'
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ) : null}
      <Footer />
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
