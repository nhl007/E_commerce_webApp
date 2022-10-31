import React, { useReducer } from 'react';
import { useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { useFeatureContext } from '../features/featureContext';
import { PRODUCT_FETCHING_SUCCESS } from './actions';

const productContext = React.createContext();

const initialState = {
  products: [],
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { setIsLoading, displayAlert } = useFeatureContext();

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('http://localhost:4000/api/v1/products');
      dispatch({
        type: PRODUCT_FETCHING_SUCCESS,
        payload: data.products,
      });
      setIsLoading(false);
      displayAlert('Successfully fetched products', true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      displayAlert('Could not fetch products', false);
    }
  };

  return (
    <productContext.Provider value={{ ...state, fetchProduct }}>
      {children}
    </productContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(productContext);
};

export { ProductProvider, initialState, useProductContext };
