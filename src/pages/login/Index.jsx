import styled from 'styled-components';
import { REST_API_KEY, REDIRECT_URI, CLIENT_SECRET } from './OAuth';
import useAxios from '../../hooks/useAxios';
import font from '../../../public/assets/font/font.css';

function Login() {
  const { requestApi } = useAxios();
  const onClickKakaoLoginButton = async () => {
    try {
      // requestApi('get', '/보낼 api주소');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LoginWrap>
      <IntroTitle>냥냥편지</IntroTitle>
      <img src="public/assets/images/intro/catTruck.png" alt="Cat Truck" />
      <KakaoLogin onClick={onClickKakaoLoginButton}>
        <KakaoLoginImage
          src="public/assets/images/logos/kakao_login_large_wide.png"
          alt="카카오 로그인 버튼"
        />
      </KakaoLogin>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  background: linear-gradient(to bottom, #e3edf2 70%, #000 70%, #000 70.3%, #faeac7 70.3%);
  & > img {
    position: absolute;
    bottom: 21%;
    object-fit: fill;
    @media (min-width: 500px) {
      transform: scale(1.2);
    }
  }
`;

const IntroTitle = styled.h1`
  position: absolute;
  top: 86px;
  font-family: 'EF_jejudoldam';
  color: #ed9a00;
  font-size: 80px;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
`;

const KakaoLogin = styled.button`
  position: absolute;
  width: 100%;
  bottom: 54px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const KakaoLoginImage = styled.img`
  width: 80%;
  height: 100%;
`;
