import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as sizeImage from './sizeImage.json';

import styled from 'styled-components';

import useFetchContentSize from '../../hooks/useFetchContentSize';
import { useRedirectPage } from '../../hooks/useRedirectPage';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

function Member() {
  const navigate = useNavigate();
  const copyUrlRef = useRef();
  const [setPage] = useRedirectPage();
  const [isEditMode, setIsEditMode] = useState(false);

  const [fishSizeAll, setFishSizeAll] = useState();
  const [displayFishImage, setDisplayFishImage] = useState();
  const [activeHamburger, setActiveHamburger] = useState(false);

  // 리코일으로 전역 변수 가져와서 사용
  const [userName, setUserName] = useState('유저 네임');
  const [newUserName, setNewUserName] = useState();
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const uid = window.location.pathname.slice(1);

  // 쿠키에 uid 가져와서
  const [isMatchUid, setisMatchUid] = useState(false);
  const myUid = 'testtest0';
  const isMyPage = isLoggedUser && isMatchUid;

  const copyUrl = () => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사 기능이 지원되지 않는 브라우저입니다.');
    }

    copyUrlRef.current.select();
    document.execCommand('copy');

    alert('복사되었습니다.');
  };

  // 붕어빵 갯수 가져오기
  const fetchSizeAll = async () => {
    const { fetchContentSize } = await useFetchContentSize();
    // {success: boolean / sizeAll: number[] }
    const fetchedContents = await fetchContentSize();
    const fishCount = fetchedContents.sizeAllCount;

    setDisplayFishImage(sizeImage.default[fishCount - 1].imageURL);
    setFishSizeAll(fishCount);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userName > 10) return;
    let currentName;

    if (newUserName === undefined) {
      currentName = userName;
    } else {
      currentName = newUserName;
    }

    // 닉네임 변경 request
    if (userName !== newUserName) {
      // const payload = { userName: '' };
      // await requestAxios(payload);
      console.log('전송 완료!');
    }

    setUserName(currentName);
    setIsEditMode(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  const onClickNickName = () => {
    setIsEditMode(true);
  };

  const onClickHamburgerButton = () => {
    setActiveHamburger(!activeHamburger);
  };

  const onClickKakaoLogoutButton = async () => {
    try {
      // api에 로그아웃을 요청
      // const response = await requestAxios('/~~~')
      // if(response.isSucccess){

      // 쿠키 토큰을 삭제
      // deleteCookie('token')
      navigate('/');
      // }
    } catch (e) {
      console.log(e);
      alert('로그아웃에 실패하였습니다.');
    }
  };

  useEffect(() => {
    if (uid === myUid) setisMatchUid(true);
    fetchSizeAll();
  }, []);

  return (
    <MemberWrap>
      <div className="contents_area">
        {/* 타이틀 */}
        <SectionTitle>
          <HamburgerWarp>
            <div className="hambuger" onClick={onClickHamburgerButton}>
              🍔
            </div>
            <ul className={activeHamburger ? 'hambugerMenu active' : 'hambugerMenu'}>
              <li onClick={onClickKakaoLogoutButton}>로그아웃</li>
            </ul>
          </HamburgerWarp>

          {/* 붕어빵이 n개 있습니다냥 */}
          <NickNameChangeForm onSubmit={onSubmit} onClick={onClickNickName}>
            {isEditMode ? (
              <input
                className="username"
                defaultValue={userName}
                onChange={onChange}
                maxLength={10}
              />
            ) : (
              <span className="username">{userName}</span>
            )}
            <br />
            붕어빵이 <span className="sizeAll">{fishSizeAll}</span>개 있습니다냥.
          </NickNameChangeForm>
        </SectionTitle>

        {/* 푸드트럭 이미지 & 붕어빵 매대 */}
        <FishBreadTruckWrap>
          {/* url 복사 */}
          <CopyUrlWrap onClick={copyUrl}>
            <input id="copyUrl" type="text" ref={copyUrlRef} defaultValue={window.location.href} />
            <label htmlFor="copyUrl">🔗</label>
          </CopyUrlWrap>

          <FishBreadTruck>
            <img
              src="https://cdn-icons-png.flaticon.com/512/4105/4105446.png"
              alt="임시 이미지"
              style={{ width: '300px' }}
            />

            <FishBreadConatiner
              className={isMyPage ? 'clickable' : ''}
              onClick={isMyPage ? setPage.bind(this, `/list/${uid}`) : null}
            >
              <img src={displayFishImage} alt="붕어빵 매대입니다." />
            </FishBreadConatiner>
          </FishBreadTruck>
        </FishBreadTruckWrap>
        <ButtonConatiner>
          {isMyPage && <button onClick={setPage.bind(this, `/list/${uid}`)}>내 봉투 가기</button>}

          {isLoggedUser && !isMatchUid && (
            <>
              <button onClick={setPage.bind(this, `/member/${myUid}`)}>내 트럭 가기</button>
              <button onClick={setPage.bind(this, `/customFish/${uid}`)}>붕어빵 만들기</button>
            </>
          )}

          {!isLoggedUser && (
            <>
              <button onClick={setPage.bind(this, `/customFish/${uid}`)}>붕어빵 만들기</button>
              <button onClick={setPage.bind(this, `/`)}>내 봉투 만들기</button>
            </>
          )}
        </ButtonConatiner>
      </div>
    </MemberWrap>
  );
}

export default Member;

const MemberWrap = styled.div`
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
    justify-content: center;
  }
`;

const SectionTitle = styled.section`
  display: flex;
  flex-flow: column;
`;

const NickNameChangeForm = styled.form`
  /* padding-top: 40px; */
  margin-bottom: 10vh;

  font-family: 'EF_jejudoldam';
  text-align: center;
  font-size: 22px;
  line-height: 1.8;

  position: relative;

  @media (max-width: 500px) {
    font-size: 20px;
  }
  @media (max-width: 400px) {
    font-size: 16px;
  }
  @media (max-width: 300px) {
    font-size: 14px;
  }

  .username {
    width: 100%;
    display: block;
    text-align: center;

    padding: 5px 0;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  input.username {
    width: 70%;
    font-family: 'EF_jejudoldam';

    outline: none;
    border: none;
    border-bottom: 2px solid #b5cfe9;

    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);

    word-break: keep-all;
    white-space: nowrap;

    background-color: transparent;

    display: inline-block;
    font-size: inherit;
    font-weight: inherit;

    color: #307ac3;
  }

  .nickNameChangeButton {
    position: absolute;
    right: 10px;
    top: 5px;
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

// 햄버거 메뉴
const HamburgerWarp = styled.div`
  position: relative;
  align-self: flex-end;

  font-size: 24px;

  cursor: pointer;

  .hambugerMenu {
    height: 0;
    width: 100px;

    position: absolute;
    top: 100%;
    right: 0;

    transition: all 0.2s;
    overflow: hidden;

    z-index: 99;
    cursor: pointer;

    li {
      padding: 0px;
      text-align: center;

      border: 1px solid #aaa;
      background-color: #fff;
    }
  }

  .hambugerMenu.active {
    // 메뉴 높이
    height: 23px;

    position: absolute;
    top: 100%;

    .hambugerMenu.active li {
      cursor: pointer;
      padding: 10px 0;
    }
  }
`;

// 트럭 시작
const FishBreadTruckWrap = styled.div`
  height: 50vh;
  position: relative;

  margin-bottom: 5vh;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
`;

const FishBreadTruck = styled.div`
  position: relative;

  margin: 40px 0;
`;

const FishBreadConatiner = styled.ul`
  display: flex;
  width: 100px;
  flex-flow: wrap;

  position: absolute;
  right: 0;
  bottom: 150px;

  &.clickable {
    cursor: pointer;
  }

  li {
    flex: 0 0 50%;
  }
`;

const CopyUrlWrap = styled.div`
  padding: 10px 20px;
  border-radius: 30px;
  border: 1px solid #ddd;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  input {
    all: unset;
    width: 280px;
    font-size: 18px;

    overflow: hidden;
    white-space: nowrap;
    word-break: keep-all;

    text-overflow: ellipsis;
  }
`;

const ButtonConatiner = styled.div`
  /* background-color: tan; */
  button {
    font-family: 'EF_jejudoldam';

    width: 100%;
    max-height: 50px;

    padding: 0;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  margin-bottom: 55px;
`;
