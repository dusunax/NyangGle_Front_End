import styled, { css } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState, readingDataList, idState } from '../../atoms/fishBreadList';
//import '../../../public/assets/font/font703.css';
import './assets/font/font703.css';
import { useEffect, useState } from 'react';

const TypeObj = {
  밀가루: '1',
  고구마: '2',
  녹차: '3',
  초코: '4',
};

function DetailModal() {
  const setIsOpened = useSetRecoilState(modalState);
  const readingId = useRecoilValue(idState);
  const data = useRecoilValue(readingDataList);
  const [backSrc, setBackSrc] = useState('background1');
  const [letterSrc, setLetterSrc] = useState('letter1');
  const { Type, message, senderNickname } = data.find((e) => e.id === readingId);
  const onClickClose = () => setIsOpened(false);
  const onClickWrapper = () => setIsOpened(false);

  let [dough, sediment] = Type.split('/');

  const TypeReplace = () => {
    Object.keys(TypeObj).forEach((e) => {
      if (e === dough) dough = TypeObj[e];
    });
  };

  const setImageSrc = () => {
    TypeReplace();
    setBackSrc(`background${dough}`);
    setLetterSrc(`letter${dough}`);
  };

  useEffect(() => {
    setImageSrc();
  });

  return (
    <ModalWrapper>
      <ModalBackground onClick={onClickWrapper} />
      <ModalContainer backSrc={backSrc}>
        <ModalContent>
          <MessageWrapper letterSrc={letterSrc}>
            <MessageUser>nicknick</MessageUser>
            <MessageContent>{message}</MessageContent>
            <MessageSender>{senderNickname}</MessageSender>
          </MessageWrapper>
          <ModalCloseButton onClick={onClickClose}>
            <ButtonContent>확인 완료</ButtonContent>
            <ButtonBack />
          </ModalCloseButton>
        </ModalContent>
      </ModalContainer>
    </ModalWrapper>
  );
}

export default DetailModal;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 768px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ backSrc }) => css`
    //background: #fff url('../../../public/assets/images/breadDetail/${backSrc}.png') no-repeat center/cover;
    background: #fff url('./assets/images/breadDetail/${backSrc}.png') no-repeat center/cover;
  `}
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 375px;
  height: 100%;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  font-family: 'Room703';
  font-weight: 400;
  font-size: 22px;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 569px;
  margin-top: 30px;

  ${({ letterSrc }) => css`
    //background: url('../../../public/assets/images/breadDetail/${letterSrc}.png') no-repeat center / contain;
    background: url('./assets/images/breadDetail/${letterSrc}.png') no-repeat center / contain;
  `}
`;

const MessageContent = styled.div`
  line-height: 33px;
  position: absolute;
  width: 76%;
  height: 50%;
  left: 50%;
  bottom: 16%;
  transform: translateX(-50%);
  overflow-y: auto;
`;

const MessageUser = styled.div`
  position: absolute;
  width: 28%;
  top: 23.5%;
  left: 22.5%;
`;

const MessageSender = styled.div`
  position: absolute;
  width: 26%;
  bottom: 9%;
  right: 11%;
`;

const ModalCloseButton = styled.div`
  width: calc(100% - 28px);
  margin: 30px 0;
  height: 60px;
  position: relative;
`;

const ButtonContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background-color: #a54e09;
  border-radius: 10px;
  border: 2px solid #000;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

const ButtonBack = styled.div`
  position: absolute;
  top: 4px;
  width: 100%;
  height: 60px;
  background-color: #813c05;
  border-radius: 10px;
  border: 2px solid #000;
`;
