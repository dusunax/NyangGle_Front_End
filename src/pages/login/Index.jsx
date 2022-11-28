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
      <div className="contents_area">
        <IntroTitle>냥냥편지</IntroTitle>
        <div className="imageWrap">
          <img className="catTruck" src="public/assets/images/intro/catTruck.png" alt="Cat Truck" />
        </div>
        <KakaoLogin onClick={onClickKakaoLoginButton}>
          <KakaoLoginImage
            src="public/assets/images/logos/kakao_login_large_wide.png"
            alt="카카오 로그인 버튼"
          />
        </KakaoLogin>
      </div>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  height: calc(var(--vh, 1vh) * 100);

  background: linear-gradient(to bottom, #e3edf2 70%, #000 70%, #000 70.3%, #faeac7 70.3%);

  .contents_area {
    height: 100%;
    max-width: 400px;

    margin: 0 auto;
    padding: 0 32px;

    position: relative;

    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  .imageWrap {
    width: 100%;
    height: 50vh;
    position: relative;

    margin-bottom: 5vh;
  }

  .catTruck {
    height: 100%;
    max-width: 100%;
    object-fit: contain;

    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const IntroTitle = styled.h1`
  margin-top: 5vh;
  margin-bottom: 10vh;

  font-family: 'EF_jejudoldam';
  font-size: 80px;
  text-align: center;

  color: #ed9a00;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;

  @media (max-width: 500px) {
    font-size: 60px;
  }
  @media (max-width: 400px) {
    font-size: 50px;
  }
  @media (max-width: 300px) {
    font-size: 42px;
  }

  animation: up 0.5s 0.2s forwards;
  opacity: 0;

  @keyframes up {
    0% {
      transform: translateY(10px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const KakaoLogin = styled.button`
  width: 100%;
  max-height: 50px;

  margin-bottom: 55px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const KakaoLoginImage = styled.img`
  width: 100%;

  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0px 2px 0 4px rgba(55, 55, 55, 0.1);
  }
`;
