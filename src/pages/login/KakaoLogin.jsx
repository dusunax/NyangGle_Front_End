import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useEffect } from 'react';
import axios from 'axios';
import font from '../../../public/assets/font/font.css';
import styled from 'styled-components';

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const code = qs.parse(location.search, { ignoreQueryPrefix: true }).code;
  const postKakaoAuthCode = async () => {
    const res = await axios
      .post(
        'http://ec2-15-164-250-89.ap-northeast-2.compute.amazonaws.com:8081/api/oauth/login/kakao',
        { code: code },
      )
      .then((result) => {
        console.log(result);
        if (result.uuid) {
          localStorage.setItem('user', {
            uuid: result.uuid,
            nickname: result.nickname,
            token: result.token,
          });
          navigate(`/${result.uuid}`);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    postKakaoAuthCode();
  }, []);

  return (
    <LogoBox>
      <LogoWrap>
        <img className="catTruck" src="/assets/images/intro/cat_truck.png" alt="Cat Truck" />
        <LoginH1>붕어빵이 노릇노릇</LoginH1>
      </LogoWrap>
    </LogoBox>
  );
};

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 400px;

  .catTruck {
    -webkit-animation: wobble-hor-bottom 2s infinite both;
    animation: wobble-hor-bottom 2s infinite both;

    @-webkit-keyframes wobble-hor-bottom {
      0%,
      100% {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
      }
      15% {
        -webkit-transform: translateX(-30px) rotate(-6deg);
        transform: translateX(-30px) rotate(-6deg);
      }
      30% {
        -webkit-transform: translateX(15px) rotate(6deg);
        transform: translateX(15px) rotate(6deg);
      }
      45% {
        -webkit-transform: translateX(-15px) rotate(-3.6deg);
        transform: translateX(-15px) rotate(-3.6deg);
      }
      60% {
        -webkit-transform: translateX(9px) rotate(2.4deg);
        transform: translateX(9px) rotate(2.4deg);
      }
      75% {
        -webkit-transform: translateX(-6px) rotate(-1.2deg);
        transform: translateX(-6px) rotate(-1.2deg);
      }
    }
    @keyframes wobble-hor-bottom {
      0%,
      100% {
        -webkit-transform: translateX(0%);
        transform: translateX(0%);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
      }
      15% {
        -webkit-transform: translateX(-30px) rotate(-6deg);
        transform: translateX(-30px) rotate(-6deg);
      }
      30% {
        -webkit-transform: translateX(15px) rotate(6deg);
        transform: translateX(15px) rotate(6deg);
      }
      45% {
        -webkit-transform: translateX(-15px) rotate(-3.6deg);
        transform: translateX(-15px) rotate(-3.6deg);
      }
      60% {
        -webkit-transform: translateX(9px) rotate(2.4deg);
        transform: translateX(9px) rotate(2.4deg);
      }
      75% {
        -webkit-transform: translateX(-6px) rotate(-1.2deg);
        transform: translateX(-6px) rotate(-1.2deg);
      }
    }
  }
`;

const LoginH1 = styled.h1`
  margin-top: 40px;
  font-family: 'EF_jejudoldam';
  font-size: 40px;
  line-height: 1.3em;
`;

export default KakaoLogin;
