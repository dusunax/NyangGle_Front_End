import React from 'react';
import ButtonText from './elements/ButtonText';
import Button from './elements/Button';
import { useRecoilValue } from 'recoil';
import { fishCartState } from '../../atoms/fishCartData';

function ButtonContainer({ isMyPage, myUid, isLoggedUser, fishData }) {
  const recipient = useRecoilValue(fishCartState);

  // 버튼 components
  const buttonToMyTruck = <ButtonText goTo={`/${myUid}`} text="내 붕어빵 트럭 가기" type="text" />;
  const buttonToCustomFish = <Button goTo={`/customFish/${recipient.uuid}`} text="붕어빵 보내기" />;
  const buttonToMyList = (
    <Button
      goTo={`/list/${myUid}`}
      myUid={myUid}
      fishData={fishData}
      text="내가 받은 붕어빵 확인"
    />
  );
  const buttonToMyLogin = <ButtonText goTo="/" text="로그인 하러 가기" type="text" />;
  const buttonToNyangle = <ButtonText goTo="/nyangle" text="사장에게 붕어빵 보내기" type="text" />;

  return (
    <>
      {isMyPage && (
        <>
          {buttonToMyList}
          {buttonToNyangle}
        </>
      )}

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
