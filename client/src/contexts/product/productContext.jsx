import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import reducer from './reducer';
import {
  ADMIN_DELETE_PRODUCT,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
  SET_CURRENT_PRODUCT_REVIEW,
  UPDATE_CART,
} from './actions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useFeatureContext } from '../feature/FeatureContext';
import { useAuthContext } from '../auth/AuthContext';

const productContext = React.createContext();

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  products: [],
  currentProduct: null,
  currentProductReviews: null,
  cart: cart ? cart : [],
  totalCartProducts: cart.length ? cart.length : 0,
  totalProducts: 0,
  totalPage: 0,
  currentPage: 0,
  categories: [
    'Electronics',
    'Camera',
    'Video',
    'Audio',
    'Laptop',
    'Desktop',
    'Mobile',
    'Headphone',
    'Books',
    'Clothing',
    'Beauty/Healthcare',
    'Sports',
    'Outdoor',
    'Home',
  ],
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [cart, setCart] = useLocalStorage('cart', state.cart);
  const { displayAlert } = useFeatureContext();

  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const addToCart = (id) => {
    axios
      .get(`${apiUrl}/product/${id}`)
      .then((data) => {
        const product = data.data.product;
        const updatedCart = [...state.cart, product];
        setCart(updatedCart);
        dispatch({
          type: UPDATE_CART,
          payload: {
            cart: updatedCart,
            total: updatedCart.length,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromCart = (id) => {
    const cart = [...state.cart];
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    dispatch({
      type: UPDATE_CART,
      payload: {
        cart: updatedCart,
        total: updatedCart.length,
      },
    });
  };

  const getAllProducts = () => {
    axios
      .get(`${apiUrl}/products`)
      .then((data) => {
        dispatch({
          type: SET_ALL_PRODUCTS,
          payload: {
            product: data.data.products,
            totalProducts: data.data.totalProducts,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getASingleProduct = async (id) => {
    await axios
      .get(`${apiUrl}/product/${id}`)
      .then((data) => {
        const { product } = data.data;
        dispatch({
          type: SET_CURRENT_PRODUCT,
          payload: product,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductReview = async (id) => {
    axios
      .get(`${apiUrl}/review?id=${id}`, config)
      .then((data) => {
        const { reviews } = data.data;
        dispatch({
          type: SET_CURRENT_PRODUCT_REVIEW,
          payload: reviews,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postProductReview = (rating, comment, productId) => {
    axios
      .post(`${apiUrl}/review`, {
        rating: rating,
        comment: comment,
        productId: productId,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const delProductReview = (id) => {
    axios
      .delete(`${apiUrl}/review?productId=${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adminDeleteAProduct = async (id) => {
    try {
      const data = await axios.delete(`${apiUrl}/admin/product/${id}`, config);
      const { product } = data.data;
      dispatch({
        type: ADMIN_DELETE_PRODUCT,
        payload: {
          id: product._id,
        },
      });
      displayAlert(data.data.message);
    } catch (err) {
      displayAlert(err.response.data.message, false);
    }
  };

  const createNewProduct = async (values) => {
    try {
      const data = await axios.post(
        `${apiUrl}/admin/product/new`,
        values,
        config
      );
      getAllProducts();
      displayAlert('Successfully created a new product!');
    } catch (err) {
      displayAlert(err.response.data.message, false);
    }
  };

  return (
    <productContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        getAllProducts,
        getASingleProduct,
        getProductReview,
        postProductReview,
        delProductReview,
        adminDeleteAProduct,
        createNewProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(productContext);
};

export { useProductContext, ProductProvider };
