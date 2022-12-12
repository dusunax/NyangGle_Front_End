import { atom } from 'recoil';

export const totalCountState = atom({
  key: 'totalCountState',
  default: 99,
});

export const unreadCountState = atom({
  key: 'unreadCountState',
  default: 99,
});

export const nicknameState = atom({
  key: 'nicknameState',
  default: 'default name',
});

export const uuidState = atom({
  key: 'uuidState',
  default: 'default uuid',
});

export const fishCartState = atom({
  key: 'fishCartState',
  default: {
    totalCount: 0,
    unreadCount: 0,
    nickname: '',
    uuid: null,
  },
});
