import styled, { css } from 'styled-components';

function AlertMessage({ setMessageAlert, setActiveTab }) {
  return (
    <Wrapper>
      <AlertContainer>
        <h5>내용 작성을 취소하시겠습니까?</h5>
        <BtnWrapper>
          <Button
            onClick={() => {
              setActiveTab('커스텀');
              setMessageAlert(false);
            }}
            btnType="confirm"
          >
            확인
          </Button>
          <Button
            onClick={() => {
              setMessageAlert(false);
            }}
          >
            취소
          </Button>
        </BtnWrapper>
      </AlertContainer>
    </Wrapper>
  );
}

export default AlertMessage;

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
