import styled from 'styled-components';
import ButtonText from './ButtonText';

const Button = ({ text, goTo }) => {
  return (
    <StButton text={text} goTo={goTo}>
      <img src="./assets/images/member/button.png" alt={text + ' 버튼'} />
    </StButton>
  );
};

export default Button;

const StButton = styled(ButtonText)`
  /* padding: 0; */
  /* font-weight: 700; */
  /* background-color: transparent;
  transition: all 0.2s;
  background-color: red;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    color: #ffffff !important;
  }

  &:hover {
    transform: translateY(-2px);
  } */
`;
