import React, { useContext, useReducer } from 'react';
import reducer from './Reducer';
import { AUTH_SUCCESS_GOOGLE, AUTH_SUCCESS } from './actions';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';

const AuthContext = React.createContext();

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  token: token ? token : null,
  user: user ? user : {},
  userType: 'user',
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //! local storage set and remove

  const setLocalStorage = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  //!--------------------

  const googleLogin = useGoogleLogin({
    onSuccess: async (token) => {
      await axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then((res) => {
          const user = res.data;
          setLocalStorage('user', user);
          dispatch({
            type: AUTH_SUCCESS_GOOGLE,
            payload: {
              user: user,
            },
          });
        })
        .catch((err) => console.log(err));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const GoogleLogOut = () => {
    googleLogout();
    removeLocalStorage('user');
  };

  const config = {
    Authorization: `Bearer ${token}`,
  };

  const API = import.meta.env.VITE_API_URL;

  const registerLogin = async (data, type) => {
    await axios
      .post(`${API}/auth/${type === 'register' ? 'register' : 'login'}`, data)
      .then((res) => {
        const { token, user } = res.data.data;
        setLocalStorage(token, user);
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            token: token,
            user: user,
          },
        });
      });
  };

  const logout = async () => {
    await axios.get(`${API}/auth/logout`, config).then((res) => {
      removeLocalStorage();
      console.log(res);
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, googleLogin, GoogleLogOut, registerLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext, initialState };
