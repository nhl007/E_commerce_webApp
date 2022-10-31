import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { AUTH_SUCCESS } from './actions';
import { useFeatureContext } from '../features/featureContext';

const AuthContext = React.createContext();

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  token: token ? token : null,
  user: user ? user : {},
};
const AuthProvider = ({ children }) => {
  const { setIsLoading, displayAlert } = useFeatureContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLocalStorage = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const authSetup = async (domain, values, message) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/${domain}`,
        values
      );

      const { token, user } = response.data;
      setLocalStorage(token, user);
      dispatch({
        type: AUTH_SUCCESS,
        payload: {
          token: token,
          user: user,
        },
      });
      setIsLoading(false);
      displayAlert(message, true);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      displayAlert(error.response.data.message, false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:4000/api/v1/logout');
      removeLocalStorage();
      setIsLoading(false);
      displayAlert(response.data.message, true);
    } catch (error) {
      setIsLoading(false);
      displayAlert(error.response.data.message, false);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, authSetup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, initialState, useAuthContext };
