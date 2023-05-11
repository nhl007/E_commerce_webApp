import React, { useContext, useReducer } from 'react';
import reducer from './reducer';
import {
  AUTH_SUCCESS_GOOGLE,
  AUTH_SUCCESS,
  ADMIN_SAVE_ALL_USERS,
  ADMIN_DELETE_USER,
  LOGOUT_USER,
  UPDATE_USER,
} from './actions';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { useFeatureContext } from '../feature/FeatureContext';

const AuthContext = React.createContext();

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  token: token ? token : null,
  user: user ? user : null,
  userType: user ? user.roles : '',
  adminUsers: null,
  adminTotalUsers: 0,
};

const AuthProvider = ({ children }) => {
  const { displayAlert } = useFeatureContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const apiUrl = import.meta.env.VITE_API_URL;

  const config = {
    withCredentials: true,
    credentials: 'include',
  };

  //! local storage set and remove

  const setLocalStorage = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeLocalStorage = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  //!-------------------------------

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
          displayAlert('Successfully Logged in. Redirecting...');
        })
        .catch((err) => displayAlert(err.message, false));
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  const GoogleLogOut = () => {
    googleLogout();
    removeLocalStorage();
  };

  const registerLogin = async (data, type) => {
    await axios
      .post(
        `${apiUrl}/${type === 'register' ? 'register' : 'sign-in'}`,
        data,
        config
      )
      .then((res) => {
        const { token, user } = res.data;
        setLocalStorage(token, user);
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            token: token,
            user: user,
          },
        });
        displayAlert(
          type !== 'register'
            ? 'Successfully Logged in! Redirecting...'
            : 'Successfully Created an account! Redirecting..."'
        );
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  const logout = async () => {
    await removeLocalStorage();
    await axios
      .get(`${apiUrl}/logout`, config)
      .then((res) => {
        dispatch({
          type: LOGOUT_USER,
        });
        displayAlert(res.data.message);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  const updateProfile = async (type, data) => {
    await axios
      .put(`${apiUrl}/${type}/update`, data, config)
      .then((res) => {
        const { user } = res.data;
        console.log(user);
        setLocalStorage(state.token, user);
        dispatch({
          type: UPDATE_USER,
          payload: {
            user: user,
            role: user.roles,
          },
        });
        displayAlert(res.data.message);
      })
      .catch((err) => {
        displayAlert(err.response.data.message, false);
      });
  };

  const getAllUsersAdmin = async () => {
    try {
      const data = await axios.get(`${apiUrl}/admin/users`, config);
      // console.log(data.data);
      const { users, totalUsers } = data.data;
      dispatch({
        type: ADMIN_SAVE_ALL_USERS,
        payload: {
          data: users,
          total: totalUsers,
        },
      });
      displayAlert('Successfully fetched users...');
    } catch (err) {
      displayAlert(err.response.data.message, false);
    }
  };
  const adminDeleteUser = async (id) => {
    try {
      const data = await axios.delete(`${apiUrl}/admin/users/${id}`, config);
      const { user } = data.data;
      dispatch({
        type: ADMIN_DELETE_USER,
        payload: {
          id: user._id,
        },
      });
      displayAlert(data.data.message);
    } catch (err) {
      displayAlert(err.response.data.message, false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        googleLogin,
        GoogleLogOut,
        registerLogin,
        logout,
        getAllUsersAdmin,
        adminDeleteUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext, initialState };
