import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRedirectPage } from '../../hooks/useRedirectPage';
import styled from 'styled-components';

function ButtonContainer({ isMyPage, myUid, isLoggedUser }) {
  const navigate = useNavigate();
  const [setPage] = useRedirectPage();

  return (
    <ButtonConatinerWrap>
      {isMyPage && (
        <button onClick={setPage.bind(this, `/list/${myUid}`)}>
          <img src="./assets/images/member/button.png" alt="내가 받은 붕어빵 확인 버튼" />
          <span> 내가 받은 붕어빵 확인</span>
        </button>
      )}

      {!isLoggedUser && (
        <>
          <button onClick={setPage.bind(this, `/customFish/`)}>
            <img src="./assets/images/member/button.png" alt="붕어빵 만들기 버튼" />
            <span>붕어빵 만들기</span>
          </button>
          <button onClick={setPage.bind(this, `/`)} className="buttonLink">
            <span>로그인 하러 가기</span>
          </button>
        </>
      )}

      {!isMyPage && isLoggedUser && (
        <>
          <button onClick={setPage.bind(this, `/customFish/`)}>
            <img src="./assets/images/member/button.png" alt="붕어빵 만들기 버튼" />
            <span>붕어빵 만들기</span>
          </button>
          <button
            onClick={() => {
              navigate(`/${myUid}`, { state: { loggedIn: true } });
            }}
            className="buttonLink"
          >
            <span>내 붕어빵 트럭 가기</span>
          </button>
        </>
      )}
    </ButtonConatinerWrap>
  );
}

export default ButtonContainer;

// 버튼 박스
const ButtonConatinerWrap = styled.section`
  button {
    width: 100%;
    height: 70px;
    padding: 0;
    position: relative;
    cursor: pointer;
    font-family: 'kotra';
    font-size: 24px;
    line-height: 28px;
    /* font-weight: 700; */
    background-color: transparent;
    border: none;
    color: #ffffff;
    transition: all 0.2s;

    img {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      white-space: nowrap;
    }

    &:hover {
      transform: translateY(-2px);
    }
  }

  .buttonLink {
    height: 70px;
    background: transparent;
    color: #73390b;

    span {
      display: inline-block;
      line-height: 28px;
      border-bottom: 2px solid #73390b;

      white-space: nowrap;
    }

    &:hover {
      transform: translateY(-1px);
      opacity: 0.8;
      box-shadow: none;
    }
  }
`;
