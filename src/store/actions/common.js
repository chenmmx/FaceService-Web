const name = 'common';

// 登录
export const LOGIN = 'LOGIN';

// 注销
export const LOGOUT = 'LOGOUT';

export function login() {
  return {
    type: LOGIN,
    name
  };
}

export function logout() {
  return {
    type: LOGIN,
    name
  };
}
