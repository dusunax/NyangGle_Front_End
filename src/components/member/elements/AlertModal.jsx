import styled, { css } from 'styled-components';

function DetailAlert({ logout, onClickCancel }) {
  return (
    <Wrapper>
      <ModalBackground onClick={onClickCancel} />
      <AlertContainer>
        <h5>정말 로그아웃 할꺼냥?</h5>
        <BtnWrapper>
          <Button onClick={onClickCancel}>취소</Button>
          <Button onClick={logout} btnType="logout">
            로그아웃
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
    btnType === 'logout' &&
    css`
      color: #a54e09;
    `}
`;
