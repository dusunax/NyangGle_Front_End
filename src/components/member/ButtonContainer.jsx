import React from 'react';
import ButtonText from './elements/ButtonText';
import Button from './elements/Button';

function ButtonContainer({ isMyPage, myUid, isLoggedUser, fishData }) {
  // 버튼 components
  const buttonToMyTruck = <ButtonText goTo={`/${myUid}`} text="내 붕어빵 트럭 가기" type="text" />;
  const buttonToCustomFish = <Button goTo={`/customFish/`} text="붕어빵 만들기" />;
  const buttonToMyList = (
    <Button
      goTo={`/list/${myUid}`}
      myUid={myUid}
      fishData={fishData}
      text="내가 받은 붕어빵 확인"
    />
  );
  const buttonToMyLogin = <ButtonText goTo="/" text="로그인 하러 가기" type="text" />;

  return (
    <>
      {isMyPage && <>{buttonToMyList}</>}

      {!isLoggedUser && (
        <>
          {buttonToCustomFish}
          {buttonToMyLogin}
        </>
      )}

      {!isMyPage && isLoggedUser && (
        <>
          {buttonToCustomFish}
          {buttonToMyTruck}
        </>
      )}
    </>
  );
}

export default React.memo(ButtonContainer);
