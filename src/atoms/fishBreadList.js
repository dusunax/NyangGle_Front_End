import { atom } from 'recoil';

export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const idState = atom({
  key: 'idState',
  default: '',
});

export const dataList = atom({
  key: 'dataList',
  default: [],
});
export const readingDataList = atom({
  key: 'readingDataList',
  default: [],
});
