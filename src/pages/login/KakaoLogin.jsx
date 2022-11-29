import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import styled from 'styled-components';
import { useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';

const KakaoLogin = () => {
  const { requestApi } = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const code = qs.parse(location.search, { ignoreQueryPrefix: true }).code;
  console.log(code);
  const postKakaoAuthCode = async () => {
    try {
      const { data } = await requestApi('post', 'oauth/login/kakao', {
        code: code,
      });
      console.log(data);
      // const res = await axios
      //   .post('http://localhost:8081/api/oauth/login/kakao', { code: code })
      //   .then((result) => {
      //     console.log(result);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postKakaoAuthCode();
  }, []);

  return (
    <LogoBox>
      <LogoWrap>
        <BobMorganLogo src="/assets/images/intro/catTruck.png" alt="고양이 붕어빵 트럭" />
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
`;

const BobMorganLogo = styled.img`
  animation: jello-horizontal infinite 0.9s both;
  @keyframes jello-horizontal {
    0% {
      transform: scale3d(1, 1, 1);
    }
    30% {
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      transform: scale3d(1.05, 0.95, 1);
    }
    100% {
      transform: scale3d(1, 1, 1);
    }
  }
`;

const LoginH1 = styled.h1`
  margin-top: 35px;
  font-size: 28px;
  font-weight: bold;
  line-height: 1.3em;
`;

export default KakaoLogin;
