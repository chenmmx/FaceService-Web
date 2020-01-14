const name = 'common';

// 登录
export const LOGIN = 'LOGIN';

// 注销
export const LOGOUT = 'LOGOUT';

export const SET_LOADING = 'SET_LOADING';

export const CANCEL_LOADING = 'CANCEL_LOADING';

export function login() {
  return {
    type: LOGIN,
    name
  };
}

export function logout() {
  return {
    type: LOGOUT,
    name
  };
}

export const setLoading = () => ({
  type: SET_LOADING,
  name
});

export const cancelLoading = () => ({
  type: CANCEL_LOADING,
  name
});
