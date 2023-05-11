import {
  ADMIN_DELETE_USER,
  ADMIN_SAVE_ALL_USERS,
  AUTH_SUCCESS,
  AUTH_SUCCESS_GOOGLE,
  LOGOUT_USER,
  UPDATE_USER,
} from './actions';

const reducer = (state, action) => {
  if (action.type === AUTH_SUCCESS_GOOGLE) {
    return {
      ...state,
      user: action.payload.user,
      userType: action.payload.user.roles,
    };
  } else if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    };
  } else if (action.type === LOGOUT_USER) {
    return {
      ...state,
      token: null,
      user: null,
      userType: '',
    };
  } else if (action.type === UPDATE_USER) {
    return {
      ...state,
      user: action.payload.user,
      userType: action.payload.role,
    };
  } else if (action.type === ADMIN_SAVE_ALL_USERS) {
    return {
      ...state,
      adminUsers: action.payload.data,
      adminTotalUsers: action.payload.total,
    };
  } else if (action.type === ADMIN_DELETE_USER) {
    const users = [...state.adminUsers];
    const updatedUsers = users.filter((user) => user._id !== action.payload.id);
    return {
      ...state,
      adminUsers: [...updatedUsers],
      adminTotalUsers: updatedUsers.length,
    };
  }
  throw new Error(`no such action ${action.type}`);
};

export default reducer;
