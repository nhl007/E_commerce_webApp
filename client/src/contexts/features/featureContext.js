import React, { useContext, useReducer } from 'react';
import { DISPLAY_ALERT, CLEAR_ALERT, SET_IS_LOADING } from './actions';
import reducer from './reducer';

const initialState = {
  isUser: false,
  alertText: '',
  showAlert: false,
  alertType: false,
  isloading: false,
};

const FeatureContext = React.createContext();

const FeatureProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //?  display alert context
  //! clear alert after 4 seconds
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      });
    }, 4000);
  };

  const displayAlert = (alertText, isSuccess) => {
    dispatch({
      type: DISPLAY_ALERT,
      payload: alertText,
      success: isSuccess,
    });
    clearAlert();
  };

  //? Loading state Context
  const setIsLoading = (isloading) => {
    dispatch({ type: SET_IS_LOADING, payload: isloading });
  };

  //? Context Provider Setup
  return (
    <FeatureContext.Provider
      value={{
        ...state,
        displayAlert,
        setIsLoading,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

//? custom hook to use the context
const useFeatureContext = () => {
  return useContext(FeatureContext);
};

export { FeatureProvider, initialState, useFeatureContext };
