import { useRef, useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import styled from 'styled-components';

function SectionTitle({ fishSizeAll, isMyPage, logout, user, saveUser, isLoggedUser }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userName, setUserName] = useState(user?.nickname);
  const [newUserName, setNewUserName] = useState();
  const copyUrlRef = useRef();
  const { requestApi } = useAxios();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (newUserName >= 2 && newUserName <= 10) {
      return alert('닉네임은 2자 이상 10자 이하여야 합니다.');
    }
    if (newUserName === '') {
      return alert('변경 할 닉네임을 적어 주세요.');
    }

    // 닉네임 변경 request
    if (userName !== newUserName) {
      try {
        const { status } = await requestApi('patch', `/user`, { nickname: newUserName });
        if (status >= 200 && status < 400) {
          const getData = { ...user }; //state
          getData.nickname = newUserName;
          saveUser(getData); // {...user, nickname: newUserName}
          setUserName(newUserName);
        }
      } catch (error) {
        console.log('에러 원인', error);
      }
    }

    setIsEditMode(false);
  };

  const onClickNickName = () => {
    setIsEditMode(true);
  };

  const copyUrl = () => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사 기능이 지원되지 않는 브라우저입니다.');
    }
    copyUrlRef.current.select();
    document.execCommand('copy');
    alert('복사되었습니다.');
  };

  return (
    <SectionTitleWrap>
      {/* 붕어빵이 n개 있습니다냥 */}
      {isMyPage ? (
        <NickNameChangeForm onSubmit={onSubmit} onClick={onClickNickName}>
          {isEditMode ? (
            <input
              className="username"
              defaultValue={userName}
              onChange={onChange}
              minLength={2}
              maxLength={10}
              autoFocus
            />
          ) : (
            <span className="username">{userName}!</span>
          )}
          <br />
          붕어빵이 <span className="sizeAll">{fishData ? fishData?.totalCount : '?'}</span>개 있다냥
        </NickNameChangeForm>
      ) : (
        <OtherUserWrap>
          <span className="otherUserName">비 로그인 유저의</span>
          <br />
          붕어빵이 <span className="sizeAll">3</span>개 있다냥
        </OtherUserWrap>
      )}

      <RightButtonsWrap>
        {/* url 복사 */}
        <CopyUrlWrap>
          <input id="copyUrl" type="text" ref={copyUrlRef} defaultValue={window.location.href} />
          <img
            src="./assets/images/member/link_button.png"
            alt="링크 복사 버튼"
            onClick={copyUrl}
          />
        </CopyUrlWrap>
        {isLoggedUser && isMyPage && (
          <LogoutWrap>
            <img
              src="./assets/images/member/logout_button.png"
              alt="로그아웃 버튼"
              onClick={logout}
            />
          </LogoutWrap>
        )}
      </RightButtonsWrap>
    </SectionTitleWrap>
  );
}

export default SectionTitle;

const SectionTitleWrap = styled.section`
  display: flex;
  position: relative;
  min-height: 20%;
`;

const RightButtonsWrap = styled.div`
  flex: 1;
`;

const NickNameChangeForm = styled.form`
  position: relative;
  flex: 1;
  font-family: 'EF_jejudoldam';
  font-size: 30px;
  line-height: 1.3;
  word-break: keep-all;
  text-shadow: -1px 0 #e3edf2, 0 1px #e3edf2, 1px 0 #e3edf2, 0 -1px #e3edf2;
  z-index: 99;

  @media (max-width: 500px) {
    font-size: 28px;
  }
  @media (max-width: 400px) {
    font-size: 26px;
  }
  @media (max-width: 300px) {
    font-size: 18px;
  }

  .username {
    display: block;
    position: absolute;
    top: -7px;
    left: 50%;
    width: 100%;
    padding: 5px 0;
    white-space: nowrap;
    transform: translateX(-50%);
  }

  input.username {
    height: 35px;
    display: inline-block;
    font-family: 'EF_jejudoldam';
    outline: none;
    border: none;
    border-bottom: 2px solid #b5cfe9;
    position: absolute;
    top: 0;
    word-break: keep-all;
    white-space: nowrap;
    background-color: transparent;
    font-size: inherit;
    font-weight: inherit;
    color: #307ac3;
  }

  .sizeAll {
    color: #ed9a00;
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

// 링크 복사 버튼
const CopyUrlWrap = styled.div`
  width: 66px;
  height: 36px;
  margin-left: auto;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  transition: all 0.3s;

  @media (max-width: 500px) {
    width: 60px;
  }
  @media (max-width: 400px) {
    width: 55px;
  }
  @media (max-width: 300px) {
    width: 50px;
  }

  animation: swing 1s 0.5s infinite;

  @keyframes swing {
    0% {
      transform: rotate(0);
    }
    30% {
      transform: rotate(-5deg);
    }
    60% {
      transform: rotate(5deg);
    }
    90% {
      transform: rotate(0);
    }
  }

  &:hover {
    transform: translateY(-3px) rotate(0);
  }

  #copyUrl {
    display: block;
    height: 1px;
    width: 1px;
    position: absolute;
    z-index: 99;
    border: none;
    color: transparent;
    outline: none;
  }
`;

//로그아웃 버튼
const LogoutWrap = styled.div`
  width: 66px;
  height: 36px;
  margin-left: auto;
  position: absolute;
  right: 0;
  top: 50px;
  cursor: pointer;
  transition: all 0.3s;

  @media (max-width: 500px) {
    width: 60px;
  }
  @media (max-width: 400px) {
    width: 55px;
  }
  @media (max-width: 300px) {
    width: 50px;
  }

  &:hover {
    transform: translateY(-3px) rotate(0);
  }
`;

const OtherUserWrap = styled.div`
  flex: 1;
  font-family: 'EF_jejudoldam';
  font-size: 30px;
  line-height: 1.3;
  word-break: keep-all;
  position: relative;
  z-index: 99;
  text-shadow: -1px 0 #e3edf2, 0 1px #e3edf2, 1px 0 #e3edf2, 0 -1px #e3edf2;

  @media (max-width: 500px) {
    font-size: 28px;
  }
  @media (max-width: 400px) {
    font-size: 26px;
  }
  @media (max-width: 300px) {
    font-size: 18px;
  }

  .otherUserName {
    width: 100%;
    display: block;
    padding: 5px 0;
    white-space: nowrap;
    position: absolute;
    top: -7px;
    left: 50%;
    transform: translateX(-50%);
  }

  .sizeAll {
    color: #ed9a00;
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
