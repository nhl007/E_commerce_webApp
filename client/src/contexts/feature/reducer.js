import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  UPDATE_PAGE_NAME,
  SET_IS_LOADING,
  IS_SUPER_ADMIN,
  SET_SIGNATURE_IMAGE,
} from './actions';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      alertType: action.green ? true : false,
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
  if (action.type === UPDATE_PAGE_NAME) {
    return {
      ...state,
      pagename: action.payload,
    };
  }
  if (action.type === SET_IS_LOADING) {
    return {
      ...state,
      isloading: action.payload,
    };
  }
  if (action.type === IS_SUPER_ADMIN) {
    return {
      ...state,
      superAdmin: action.payload,
    };
  }
  if (action.type === SET_SIGNATURE_IMAGE) {
    return {
      ...state,
      signatureData: action.payload,
    };
  }
  throw new Error(`no such action :${action.type}`);
};

export default reducer;
