import { atom } from 'recoil';

export const isLoggedUser = atom({
  key: 'isLoggedUser',
  default: false,
});

export const nickNameState = atom({
  key: 'nickname',
  default: '',
});

export const tokenState = atom({
  key: 'token',
  default: '',
});

export const uuidState = atom({
  key: 'uuid',
  default: '',
});
