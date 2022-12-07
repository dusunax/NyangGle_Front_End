/** response의 유저 정보를 localStorage에 string으로 저장합니다. return void */
const saveUser = (fetchedUserData) => {
  localStorage.setItem(
    'user',
    JSON.stringify({
      nickname: fetchedUserData.nickname,
      token: fetchedUserData.token,
      uuid: fetchedUserData.uuid,
    }),
  );
};

// localStorage의 user를 꺼내와서 객체 형태로 return => 닉네임/토큰/uuid
/** 유저 정보를 객체로 return합니다. | null */
const getUser = () => {
  if (localStorage.getItem('user') === null) {
    return null;
  }

  const locals = localStorage.getItem('user');
  const user = JSON.parse(locals);

  return user;
};

/** 토큰이 있는지 확인합니다.(인수로 유저 객체값이 있어야 합니다.) hasToken(user:User) */
const hasToken = (user) => {
  if (user === null || user === undefined) return false;

  return user?.token !== undefined ? true : false;
};

const jwt_decode = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

/** JWT 토큰을 decode해서 token이 expired 되었는지 확인합니다. */
const isTokenExpired = (token) => {
  const decoded = jwt_decode(token);

  const today = new Date();
  const exp = new Date(decoded.exp * 1000);
  const isExpired = exp < today;

  return isExpired;
};

const isMatchUuid = (userId, pageId) => (userId === pageId ? true : false);

export { saveUser, getUser, hasToken, isTokenExpired, isMatchUuid };
