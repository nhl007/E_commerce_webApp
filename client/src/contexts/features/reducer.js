import { DISPLAY_ALERT, CLEAR_ALERT, SET_IS_LOADING } from './actions';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      alertType: action.success,
      showAlert: true,
      alertText: action.payload,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertText: '',
    };
  }
  if (action.type === SET_IS_LOADING) {
    return {
      ...state,
      isloading: action.payload,
    };
  }
  throw new Error(`no such action :${action.type}`);
};

export default reducer;
