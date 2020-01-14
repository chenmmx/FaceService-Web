import {
  LOGIN, LOGOUT, SET_LOADING, CANCEL_LOADING
} from '../actions/common';

const defaultState = {
  isLogin: (window.localStorage.getItem('isLogin') === 'true') || false,
  loading: false
};

export default (state = defaultState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LOGIN:
      newState.isLogin = true;
      window.localStorage.setItem('isLogin', newState.isLogin);
      return newState;
    case LOGOUT:
      newState.isLogin = false;
      window.localStorage.setItem('isLogin', newState.isLogin);
      return newState;
    case SET_LOADING:
      newState.loading = true;
      return newState;
    case CANCEL_LOADING:
      newState.loading = false;
      return newState;
    default: return newState;
  }
};
