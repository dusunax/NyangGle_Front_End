/** response의 붕어빵 갯수 정보를 localStorage에 string으로 저장합니다. return void */
const saveFish = (fetchedFishData) => {
  localStorage.setItem(
    'fish',
    JSON.stringify({
      totalCount: fetchedFishData.totalCount,
      unreadCount: fetchedFishData.unreadCount,
      nickname: fetchedFishData.nickname,
    }),
  );
};

// localStorage의 붕어빵 갯수를 꺼내와서 객체 형태로 return => 닉네임/토큰/uuid
/** 유저 정보를 객체로 return합니다. | null */
const getFish = () => {
  if (localStorage.getItem('fish') === null) {
    return null;
  }

  const locals = localStorage.getItem('fish');
  const fish = JSON.parse(locals);

  return fish;
};

export { saveFish, getFish };
