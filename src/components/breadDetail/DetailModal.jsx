import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalState, readingDataList, idState } from '../../atoms/fishBreadList';
import '../../../public/assets/font/font703.css';

function DetailModal() {
  const setIsOpened = useSetRecoilState(modalState);
  const readingId = useRecoilValue(idState);
  const data = useRecoilValue(readingDataList);
  const readingData = data.find((e) => e.id === readingId);

  const onClickClose = () => setIsOpened(false);
  const onClickWrapper = () => setIsOpened(false);

  return (
    <ModalWrapper>
      <ModalBackground onClick={onClickWrapper} />
      <ModalContent>
        <div onClick={onClickClose}>닫기</div>
        {readingData.message}
        {readingData.id}
      </ModalContent>
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
  font-family: 'Room703';
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  max-width: 768px;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  z-index: 1;
`;
