import React, { useContext, useReducer } from 'react';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  UPDATE_PAGE_NAME,
  SET_IS_LOADING,
  IS_SUPER_ADMIN,
} from './actions';
import reducer from './reducer';

const initialState = {
  pagename: '',
  showAlert: false,
  alertText: '',
  alertType: false,
  isloading: false,
  superAdmin: false,
  signatureData: null,
};

const FeatureContext = React.createContext();

const FeatureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = (alertText, alertIsSuccess = true) => {
    dispatch({
      type: DISPLAY_ALERT,
      payload: alertText,
      green: alertIsSuccess,
    });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 4000);
  };
  const updatePageName = (pagename) => {
    dispatch({ type: UPDATE_PAGE_NAME, payload: pagename });
  };
  const setIsLoading = (isloading) => {
    dispatch({ type: SET_IS_LOADING, payload: isloading });
  };
  const isSuperAdmin = (superAdmin) => {
    dispatch({ type: IS_SUPER_ADMIN, payload: superAdmin });
  };
  return (
    <FeatureContext.Provider
      value={{
        ...state,
        displayAlert,
        updatePageName,
        setIsLoading,
        isSuperAdmin,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

const useFeatureContext = () => {
  return useContext(FeatureContext);
};

export { FeatureProvider, initialState, useFeatureContext };
