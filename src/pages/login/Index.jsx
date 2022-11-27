import styled from 'styled-components';
import { REST_API_KEY, REDIRECT_URI, CLIENT_SECRET } from './OAuth';
import useAxios from '../../hooks/useAxios';

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
      <img
        src="https://cdn-icons-png.flaticon.com/512/4105/4105446.png"
        alt="임시 이미지"
        style={{ width: '300px', marginBottom: '100px' }}
      />

      <KakaoLogin onClick={onClickKakaoLoginButton}>
        <KakaoLoginImage src="./assets/images/logos/kakao_login_large_wide.png" alt="" />
      </KakaoLogin>
    </LoginWrap>
  );
}

export default Login;

const LoginWrap = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-between;
`;

const KakaoLogin = styled.button`
  width: 100%;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const KakaoLoginImage = styled.img`
  width: 100%;
  height: 100%;
`;
