import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

function AlertCopy({ setCustomAlert }) {
  // const recipient = useRecoilValue(fishCartState);
  const pathname = location.pathname;
  const fishId = pathname.split('/')[2];
  const navigate = useNavigate();
  return (
    <Wrapper>
      <AlertContainer>
        <h5>붕어빵 만들기를 취소하시겠습니까?</h5>
        <BtnWrapper>
          <Button
            onClick={() => {
              setCustomAlert(false);
            }}
          >
            취소
          </Button>
          <Button
            onClick={() => {
              navigate(`/${fishId}`);
            }}
            btnType="confirm"
          >
            확인
          </Button>
        </BtnWrapper>
      </AlertContainer>
    </Wrapper>
  );
}

export default AlertCopy;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
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
  max-width: 400px;
  height: 200px;
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
    color: #000;
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
  margin-top: 10%;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  font-size: 22px;
  color: #000;
  cursor: pointer;

  ${({ btnType }) =>
    btnType === 'confirm' &&
    css`
      color: #a54e09;
    `}
`;
