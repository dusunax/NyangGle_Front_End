import styled from 'styled-components';
import { useRedirectPage } from '../../../hooks/useRedirectPage';

const ButtonText = ({ text = '링크 버튼 텍스트', goTo = `/`, children, type = 'button' }) => {
  const [setPage] = useRedirectPage();

  return (
    <StButtonText onClick={setPage.bind(this, goTo)}>
      {children}
      <span className={type === 'text' ? 'text' : ''}>{text}</span>
    </StButtonText>
  );
};

export default ButtonText;

const StButtonText = styled.button`
  width: 100%;
  height: 70px;
  position: relative;
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'kotra';
  font-size: 20px;
  line-height: 28px;
  white-space: nowrap;

  cursor: pointer;
  transition: all 0.2s;

  img,
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    width: 90%;
  }

  span {
    transform: translate(-50%, calc(-50% - 4px));
  }

  span.text {
    display: inline-block;
    line-height: 40px;
    color: #73390b;
    border-bottom: 2px solid #73390b;

    white-space: nowrap;
  }

  &:hover {
    transform: translateY(-2px);
  }

  span.text:hover {
    opacity: 0.8;
    box-shadow: none;
  }

  @media (max-width: 280px) {
    font-size: 18px;
  }
`;
