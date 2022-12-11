import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import font from '../../../public/assets/font/font.css';
import styled from 'styled-components';
import { REST_API_KEY, REDIRECT_URI } from './OAuth';
import { saveUser } from '../../utils/userAuth';

const KakaoLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { requestApi } = useAxios();
  const code = qs.parse(location.search, { ignoreQueryPrefix: true }).code;

  const postKakaoAuthCode = async () => {
    const { data, status } = await requestApi('post', '/oauth/login/kakao', {
      grant_type: 'autorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    });

    if (status >= 200 && status < 400) {
      saveUser(data);
      navigate(`/${data.uuid}`);
    }
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
  height: 100%;
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
