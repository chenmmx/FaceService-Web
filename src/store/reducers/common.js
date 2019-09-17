import { LOGIN, LOGOUT } from '../actions/common';

const defaultState = {
  isLogin: (window.localStorage.getItem('isLogin') === 'true') || false
};

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case LOGIN:
      newState.isLogin = true;
      window.localStorage.setItem('isLogin', newState.isLogin);
      return newState;
    case LOGOUT:
      newState.isLogin = false;
      window.localStorage.setItem('isLogin', newState.isLogin);
      return newState;
    default: return newState;
  }
};
