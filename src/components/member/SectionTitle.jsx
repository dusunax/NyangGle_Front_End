import { useRef, useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import styled from 'styled-components';

function SectionTitle({ fishSizeAll, isMyPage, logout, user }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userName, setUserName] = useState(user.nickname);
  const [newUserName, setNewUserName] = useState();
  const [randomComment, setRandomCommnet] = useState();
  const copyUrlRef = useRef();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userName > 10) {
      return;
    }
    let currentName;

    if (newUserName === undefined) {
      currentName = userName;
    } else {
      currentName = newUserName;
    }

    // 닉네임 변경 request
    if (userName !== newUserName) {
      console.log('전송 완료!');
    }

    setUserName(currentName);
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

  const twoCatsRandomComment = [
    '어서오라냥~',
    '날마다 오는 붕어빵이 아니다냥',
    '맛있는 붕어빵이 있다냥!',
    '친구랑 나눠먹어도 맛있다냥',
    '붕어빵 사가라냥!',
    '붕어빵 만들지 않겠냥?',
    '재료도 고를 수 있다냥!',
    '천원도 카드 된다냥!',
  ];

  let timeout;
  const refreshComment = () => {
    let currentComment = (
      <CatsComment>
        {twoCatsRandomComment[Math.floor(Math.random() * twoCatsRandomComment.length)]}
      </CatsComment>
    );
    setRandomCommnet(currentComment);

    timeout = setTimeout(() => {
      clearTimeout(timeout);

      refreshComment();
    }, 5000);
  };

  useEffect(() => {
    refreshComment();
    return () => clearTimeout(timeout);
  }, []);

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
          붕어빵이 <span className="sizeAll">{fishSizeAll}</span>개 있다냥
        </NickNameChangeForm>
      ) : (
        <TwoCatsCommentBubble>{randomComment}</TwoCatsCommentBubble>
      )}

      <div className="right">
        {/* url 복사 */}
        <CopyUrlWrap>
          <input id="copyUrl" type="text" ref={copyUrlRef} defaultValue={window.location.href} />
          <img
            src="./assets/images/member/link_button.png"
            alt="링크 복사 버튼"
            onClick={copyUrl}
          />
          <button onClick={logout}>로그아웃</button>
        </CopyUrlWrap>
      </div>
    </SectionTitleWrap>
  );
}

export default SectionTitle;

const SectionTitleWrap = styled.section`
  min-height: 20%;
  display: flex;
  position: relative;

  .right {
    flex: 1;
  }
`;

const NickNameChangeForm = styled.form`
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

  .username {
    width: 100%;
    display: block;
    padding: 5px 0;
    white-space: nowrap;
    position: absolute;
    top: -7px;
    left: 50%;
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
  position: relative;
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

const TwoCatsCommentBubble = styled.div`
  width: 100%;
  height: 80px;
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d4dde2;
  border-radius: 10px;
  overflow: hidden;
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

const CatsComment = styled.div`
  width: 100%;
  object-fit: cover;

  font-size: 18px;
  line-height: 28px;
  font-weight: 700;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 20px;
  text-align: center;

  animation: fadeIn 0.5s forwards;
  opacity: 0;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
