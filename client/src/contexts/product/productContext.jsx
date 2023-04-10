import axios from 'axios';
import React, { useReducer } from 'react';
import { useContext } from 'react';
import reducer from './reducer';
import { ADD_TO_CART, SET_ALL_PRODUCTS } from './actions';

const productContext = React.createContext();

const initialState = {
  products: [],
  cart: [],
  totalCartProducts: 0,
  totalProducts: 0,
  totalPage: 0,
  currentPage: 0,
};

const ProductProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (_id) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: _id,
        total: ++state.totalCartProducts,
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

  const getASingleProduct = (id) => {
    axios
      .get(`${apiUrl}/product/${id}`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductReview = (id) => {
    axios
      .get(`${apiUrl}/review?id=${id}`)
      .then((data) => {
        console.log(data);
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

  return (
    <productContext.Provider
      value={{
        ...state,
        addToCart,
        getAllProducts,
        getASingleProduct,
        getProductReview,
        postProductReview,
        delProductReview,
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
