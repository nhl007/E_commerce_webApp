import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import reducer from './reducer';
import {
  ADMIN_DELETE_PRODUCT,
  SET_ALL_PRODUCTS,
  SET_CURRENT_PRODUCT,
  UPDATE_CART,
} from './actions';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useFeatureContext } from '../feature/FeatureContext';
import { useNavigate } from 'react-router-dom';

const productContext = React.createContext();

const cart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  products: [],
  currentProduct: null,
  // currentProductReviews: [],
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
    'Beauty',
    'Sports',
    'Outdoor',
    'Home',
  ],
  searchKeyword: '',
  searchResult: null,
};

const ProductProvider = ({ children }) => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(reducer, initialState);
  const apiUrl = import.meta.env.VITE_API_URL;
  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  const [cart, setCart] = useLocalStorage('cart', state.cart);
  const { displayAlert } = useFeatureContext();

  useEffect(() => {
    getAllProducts();
  }, []);

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

  const getAllProducts = async () => {
    await axios
      .get(`${apiUrl}/products/all`)
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
