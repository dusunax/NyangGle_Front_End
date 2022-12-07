import styled, { css } from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState, readingDataList, idState } from '../../atoms/fishBreadList';
import { useEffect, useState } from 'react';

const typeObj = {
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
  const { type, message, senderNickname } = data.find((e) => e.id === readingId);
  const onClickClose = () => setIsOpened(false);
  const onClickWrapper = () => setIsOpened(false);

  let [dough, sediment] = type.split('/');
  const userData = JSON.parse(localStorage.getItem('user'));
  const { nickname } = userData ? userData : { nickname: '익명의냥냥이' };

  const replaceType = () => {
    Object.keys(typeObj).forEach((e) => {
      if (e === dough) dough = typeObj[e];
    });
  };

  const setImageSrc = () => {
    replaceType();
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
            <MessageUser>{nickname && nickname}</MessageUser>
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
  width: 100vh;
  height: 100%;
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
    background: #fff url('../../../assets/images/breadDetail/${backSrc}.png') no-repeat center/cover;
  `}
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 375px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  font-family: 'kotra';
  font-weight: 400;
  font-size: 22px;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 569px;
  margin-top: 30px;

  ${({ letterSrc }) => css`
    background: url('../../../assets/images/breadDetail/${letterSrc}.png') no-repeat center /
      contain;
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

  white-space: pre-wrap;
  word-break: keep-all;
`;

const MessageUser = styled.div`
  position: absolute;
  width: 28%;
  top: 23.5%;
  left: 22.5%;
  word-break: keep-all;
`;

const MessageSender = styled.div`
  position: absolute;
  width: 26%;
  bottom: 10%;
  right: 11%;
  word-break: keep-all;
`;

const ModalCloseButton = styled.div`
  width: calc(100% - 28px);
  margin: 30px 0;
  height: 60px;
  position: relative;

  cursor: pointer;
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
