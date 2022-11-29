import { atom } from 'recoil';

export const breadListDummy = atom({
  key: 'breadListDummy',
  default: {
    content: [
      {
        id: 1,
        Type: '밀가루/팥',
        status: 'UNREAD',
        senderNickname: '슈슈슉어피치',
      },
      {
        id: 2,
        Type: '밀가루/슈',
        status: 'UNREAD',
        senderNickname: '베아',
      },
      {
        id: 3,
        Type: '밀가루/마라',
        status: 'UNREAD',
        senderNickname: '둠칫',
      },
      {
        id: 4,
        Type: '밀가루/민초',
        status: 'UNREAD',
        senderNickname: '교옹',
      },
      {
        id: 5,
        Type: '고구마/팥',
        status: 'UNREAD',
        senderNickname: '울루',
      },
      {
        id: 6,
        Type: '고구마/슈',
        status: 'UNREAD',
        senderNickname: '수아',
      },
      {
        id: 7,
        Type: '초코/마라',
        status: 'UNREAD',
        senderNickname: '뚜뚜',
      },
      {
        id: 8,
        Type: '고구마/민초',
        status: 'UNREAD',
        senderNickname: '킹냥이',
      },
      {
        id: 9,
        Type: '녹차/팥',
        status: 'UNREAD',
        senderNickname: '단팥빵',
      },
      {
        id: 10,
        Type: '녹차/슈',
        status: 'UNREAD',
        senderNickname: '댕댕이',
      },
    ],
    totalPages: 2,
    last: true,
    first: true,
  },
});

export const breadDetailDummy = atom({
  key: 'breadDetailDummy',
  value: {
    Type: '고구마/마라',
    message:
      '안녕 냥냥펀치! 나는 냥아치야 차가운 밀가루 반죽에 아주머니는 연신 허연 입김 불어넣으시고 후끈 달아오른 무쇠틀 속으로 붉은 심장을 넣어주신다 어느새 윤기 흐르는 피부로 세상에 나온 손주들 온기도 가시기 전 봉지에 담긴다 오늘은 아주머니도 월척 붕어 몇 마리 낚아',
    createdAt: '',
    senderNickname: '베아',
  },
});
