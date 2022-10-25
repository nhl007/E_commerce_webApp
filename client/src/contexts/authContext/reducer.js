import { AUTH_SUCCESS } from './actions';

const reducer = (state, action) => {
  if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    };
  }

  throw new Error(`no such action ${action.type}`);
};

export default reducer;
