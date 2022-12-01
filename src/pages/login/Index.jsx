import { REST_API_KEY, REDIRECT_URI } from './OAuth';
import font from '../../../public/assets/font/font.css';
import styled from 'styled-components';
import { useRedirectPage } from '../../hooks/useRedirectPage';

function Login() {
  const [setPage] = useRedirectPage();
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onClickKakaoLoginButton = () => {
     window.open(KAKAO_AUTH_URL, '_self');
    window.location.replace(KAKAO_AUTH_URL);
    console.log('hi');
  };

  return (
    <LoginWrap>
      <div className="contents_area">
        <IntroTitle>냥냥편지</IntroTitle>
        <div className="imageWrap">
          <img className="catTruck" src="./assets/images/intro/cat_truck.png" alt="Cat Truck" />
        </div>

        <ButtonConatiner>
          <button onClick={setPage.bind(this, `/U184bdf21eb90001`)}>냥냥 편지 체험하기</button>
        </ButtonConatiner>
        { <KakaoLogin onClick={onClickKakaoLoginButton}>
          <KakaoLoginImage
            src="./assets/images/logos/kakao_login_large_wide.png"
            alt="카카오 로그인 버튼"
          />
        </KakaoLogin> }
      </div>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  height: calc(var(--vh, 1vh) * 100);

  background: linear-gradient(to bottom, #e3edf2 68%, #000 68%, #000 68.3%, #faeac7 68.3%);

  .contents_area {
    height: 100%;
    max-width: 450px;

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

    margin-top: 5vh;
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
  margin-top: 8vh;
  margin-bottom: 7vh;

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
  max-height: 55px;
  border-radius: 5px;
  overflow: hidden;

  margin-bottom: 55px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  transition: all 0.2s;
  background-color: #fee500;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0px 2px 4px rgba(55, 55, 55, 0.1);
  }
`;

const KakaoLoginImage = styled.img`
  width: 100%;
`;

// 버튼 박스
const ButtonConatiner = styled.div`
  width: 100%;
  button {
    width: 100%;
    height: 70px;

    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;

    font-size: 18px;
    line-height: 28px;
    font-weight: 700;

    color: #ffffff;
    background: url('./assets/images/member/button.png') no-repeat center / contain;

    transition: all 0.2s;

    &:hover {
      transform: translateY(-2px);
    }
  }
`;
