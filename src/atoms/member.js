import { atom } from 'recoil';

export const isLoggedUser = atom({
  key: 'isLoggedUser',
  default: false,
});
