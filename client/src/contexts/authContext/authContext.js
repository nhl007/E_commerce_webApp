import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import axios from 'axios';
import { AUTH_SUCCESS } from './actions';
import { useFeatureContext } from '../features/featureContext';

const AuthContext = React.createContext();

const initialState = {
  token: null,
  user: {},
};
const AuthProvider = ({ children }) => {
  const { setIsLoading, displayAlert } = useFeatureContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLocalStorage = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  // const removeLocalStorage = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  // };

  const register = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/register',
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
      displayAlert('Successfully created the account !', true);
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      displayAlert(error.response.data.message, false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/logout');
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, initialState, useAuthContext };
