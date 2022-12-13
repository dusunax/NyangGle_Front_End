import styled, { css } from 'styled-components';
import {
  modalState,
  readingDataList,
  idState,
  alertState,
  dataList,
} from '../../../atoms/fishBreadList';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { deleteBread } from '../../../utils/fetchBreadDetail';

function DetailAlert() {
  const [breadList, setBreadList] = useRecoilState(dataList);
  const [readingData, setReadingData] = useRecoilState(readingDataList);
  const readingid = useRecoilValue(idState);
  const setIsOpened = useSetRecoilState(modalState);
  const setIsAlertOpened = useSetRecoilState(alertState);

  const onClickWrapper = () => setIsAlertOpened(false);
  const onClickCancel = () => setIsAlertOpened(false);
  const onClickDelete = () => {
    const filterReadingData = [...readingData].filter((e) => e.id !== readingid);
    setReadingData(filterReadingData);
    const { token } = JSON.parse(localStorage.getItem('user'));
    const filterBread = [...breadList].flat().filter((e) => e.fishId !== readingid);
    const filterList = [];
    for (let i = 0; i < filterBread.length; i += 9) {
      filterList.push(filterBread.slice(i, i + 9));
    }
    setBreadList(filterList);
    deleteBread(readingid, token);
    setIsAlertOpened(false);
    setIsOpened(false);
  };

  return (
    <Wrapper>
      <ModalBackground onClick={onClickWrapper} />
      <AlertContainer>
        <h5>편지를 삭제할거냥?</h5>
        <p>삭제한 편지는 복구할 수 없다냥</p>
        <BtnWrapper>
          <Button onClick={onClickCancel}>취소</Button>
          <Button btnType="delete" onClick={onClickDelete}>
            삭제
          </Button>
        </BtnWrapper>
      </AlertContainer>
    </Wrapper>
  );
}

export default DetailAlert;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const AlertContainer = styled.div`
  width: calc(100% - 26px);
  max-width: 380px;
  height: 220px;
  background-color: #fff;
  z-index: 4;
  border: 2px solid #000000;
  border-radius: 10px;
  font-family: 'kotra';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h5 {
    font-size: 26px;
    font-weight: 500;
    color: #a54e09;
    margin-bottom: 6px;
  }

  p {
    font-size: 20px;
    color: #989898;
    line-height: 33px;
    margin-bottom: 38px;
  }
`;

const BtnWrapper = styled.div`
  width: calc(100% - 68px);
  display: flex;
  justify-content: space-between;
  gap: 40px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 22px;
  color: #000;

  ${({ btnType }) =>
    btnType === 'delete' &&
    css`
      color: #a54e09;
    `}
`;
