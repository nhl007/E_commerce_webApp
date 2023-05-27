import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import reducer from './reducer';
import {
  // ADMIN_DELETE_PRODUCT,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
  SET_FEATURED_PRODUCTS,
  UPDATE_CART,
} from './actions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useFeatureContext } from '../feature/FeatureContext';
import { useNavigate } from 'react-router-dom';

const productContext = React.createContext();

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  products: [],
  featuredProducts: [],
  currentProduct: null,
  cart: cart ? cart : [],
  totalCartProducts: cart.length ? cart.length : 0,
  totalProducts: 0,
  totalPages: 1,
  currentPage: 1,
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
    'Beauty',
    'Sports',
    'Outdoor',
    'Home',
  ],
};

const ProductProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [cart, setCart] = useLocalStorage('cart', state.cart);
  const { displayAlert, setIsLoading } = useFeatureContext();

  const getFeaturedProducts = async () => {
    setIsLoading(true);
    await axios
      .get(`${apiUrl}/rank`)
      .then((data) => {
        dispatch({
          type: SET_FEATURED_PRODUCTS,
          payload: {
            products: data.data.products,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const addToCart = (id) => {
    if (!state.cart.length) {
      CartAddAction(id);
    } else {
      let isSaved = false;
      state.cart?.map((item) => {
        if (item._id === id) {
          isSaved = true;
        }
      });
      if (!isSaved) {
        CartAddAction(id);
        displayAlert('Item added to cart !');
      } else {
        displayAlert('The item is already in the cart!', false);
      }
    }
  };

  const CartAddAction = (id) => {
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

        //?rank update
        axios.get(`${apiUrl}/product/rank/${id}`).catch((err) => {
          console.log(err);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cardClickEvent = async (id) => {
    await axios.get(`${apiUrl}/product/rank/${id}`).catch((err) => {
      console.log(err);
    });
    navigate(`/products/${id}`);
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

  const getAllProducts = async (page = 1) => {
    await axios
      .get(`${apiUrl}/products/all?page=${page}`)
      .then((data) => {
        dispatch({
          type: SET_ALL_PRODUCTS,
          payload: {
            product: data.data.products,
            totalProducts: data.data.totalProducts,
            totalPages: data.data.totalPages,
            currentPage: data.data.currentPage,
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

  const adminDeleteAProduct = async (id) => {
    try {
      const data = await axios.delete(`${apiUrl}/admin/product/${id}`, config);
      const { product } = data.data;
      // dispatch({
      //   type: ADMIN_DELETE_PRODUCT,
      //   payload: {
      //     id: product._id,
      //   },
      // });
      displayAlert(data.data.message);
      return Promise.resolve(product);
    } catch (err) {
      displayAlert(err.response.data.message, false);
    }
  };

  const createNewProduct = async (values) => {
    try {
      await axios.post(`${apiUrl}/admin/product/new`, values, config);
      displayAlert('Successfully created a new product!');
    } catch (err) {
      displayAlert(err.response.data.message, false);
    }
  };

  const onSearch = async (
    search = '',
    category = '',
    price = '',
    ratings = ''
  ) => {
    let url = `${apiUrl}/products?`;
    if (search) {
      url += `keyword=${search}&`;
    }

    if (category) {
      url += `category=${
        category.charAt(0).toUpperCase() + category.slice(1)
      }&`;
    }

    if (price) {
      url += `price=${price}`;
    }
    if (ratings) {
      url += `ratings=${ratings}`;
    }

    if (url.endsWith('&')) {
      url = url.slice(0, -1);
    }
    try {
      const { products, totalProducts } = (await axios.get(url)).data;
      return Promise.resolve({ total: totalProducts, data: products });
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <productContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        getAllProducts,
        getFeaturedProducts,
        getASingleProduct,
        adminDeleteAProduct,
        createNewProduct,
        onSearch,
        cardClickEvent,
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
