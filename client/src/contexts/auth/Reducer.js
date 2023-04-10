import { AUTH_SUCCESS, AUTH_SUCCESS_GOOGLE } from './actions';

const reducer = (state, action) => {
  if (action.type === AUTH_SUCCESS_GOOGLE) {
    return {
      ...state,
      user: action.payload.user,
    };
  } else if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    };
  }

  throw new Error(`no such action ${action.type}`);
};

export default reducer;
