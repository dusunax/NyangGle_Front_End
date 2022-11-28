import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as countFishTruckImages from './countFishTruckImages.json';

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
  const [displayFishImage, setDisplayFishImage] = useState('cat_truck_6.png');
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

    if (fetchedContents.success) {
      const fishCount = fetchedContents.sizeAllCount;

      if (fishCount < 6) {
        setDisplayFishImage(countFishTruckImages.default[fishCount].imageURL);
      }
      setFishSizeAll(fishCount);
    } else {
      navigate('/');
    }
  };

  console.log(displayFishImage);

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
    <>
      <MemberWrap>
        <div className="contents_area">
          {/* 타이틀 */}
          <SectionTitle>
            {/* 붕어빵이 n개 있습니다냥 */}
            {isMyPage && (
              <NickNameChangeForm onSubmit={onSubmit} onClick={onClickNickName}>
                {isEditMode ? (
                  <input
                    className="username"
                    defaultValue={userName}
                    onChange={onChange}
                    maxLength={10}
                  />
                ) : (
                  <span className="username">{userName}!</span>
                )}
                <br />
                붕어빵이 <span className="sizeAll">{fishSizeAll}</span>개 있다냥
              </NickNameChangeForm>
            )}

            <div className="right">
              {/* url 복사 */}
              <CopyUrlWrap onClick={copyUrl}>
                <input
                  id="copyUrl"
                  type="text"
                  ref={copyUrlRef}
                  defaultValue={window.location.href}
                />
              </CopyUrlWrap>
              {/* <HamburgerWarp>
              <div className="hambuger" onClick={onClickHamburgerButton}>
                🍔
              </div>
              <ul className={activeHamburger ? 'hambugerMenu active' : 'hambugerMenu'}>
                <li onClick={onClickKakaoLogoutButton}>로그아웃</li>
              </ul>
            </HamburgerWarp> */}
            </div>
          </SectionTitle>

          {/* 푸드트럭 이미지 & 붕어빵 매대 */}
          <FishBreadTruckWrap>
            <FishBreadTruck>
              <img
                src={`public/assets/images/member/${displayFishImage}`}
                alt="고양이 트럭이다냥"
                className={isMyPage ? 'catTruck clickable' : 'catTruck'}
                onClick={isMyPage ? setPage.bind(this, `/list/${uid}`) : null}
              />

              {/* <FishBreadConatiner
                className={isMyPage ? 'clickable' : ''}
                onClick={isMyPage ? setPage.bind(this, `/list/${uid}`) : null}
              >
                <img src={displayFishImage} alt="붕어빵 매대입니다." />
              </FishBreadConatiner> */}
            </FishBreadTruck>
          </FishBreadTruckWrap>
          <ButtonConatiner>
            {isMyPage && (
              <button onClick={setPage.bind(this, `/list/${uid}`)}>내가 받은 붕어빵 확인</button>
            )}

            {isLoggedUser && !isMatchUid && (
              <>
                <button onClick={setPage.bind(this, `/member/${myUid}`)}>
                  내 붕어빵 페이지 보기{' '}
                </button>
                <button onClick={setPage.bind(this, `/customFish/${uid}`)}>붕어빵 만들기</button>
              </>
            )}

            {!isLoggedUser && (
              <>
                <button onClick={setPage.bind(this, `/customFish/${uid}`)}>붕어빵 만들기</button>
                <button onClick={setPage.bind(this, `/`)} className="buttonLink">
                  <span>로그인 하러 가기</span>
                </button>
              </>
            )}
          </ButtonConatiner>
        </div>
      </MemberWrap>
    </>
  );
}

export default Member;

const MemberWrap = styled.div`
  height: calc(var(--vh, 1vh) * 100);

  background: linear-gradient(to bottom, #e3edf2 68%, #000 68%, #000 68.3%, #faeac7 68.3%);

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
  /* margin-bottom: 5vh; */
  min-height: 20%;
  display: flex;

  position: relative;

  .right {
    flex: 1;
  }
`;

const NickNameChangeForm = styled.form`
  flex: 1;
  /* margin-bottom: 10vh; */

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
    font-family: 'EF_jejudoldam';

    outline: none;
    border: none;
    border-bottom: 2px solid #b5cfe9;

    position: absolute;
    top: 0px;

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
  width: 100%;
  height: 50%;
  position: relative;

  margin-bottom: 2%;
`;

const FishBreadTruck = styled.div`
  background-color: #fff;

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

const FishBreadConatiner = styled.ul`
  display: flex;
  width: 125px;
  height: 80px;
  flex-flow: wrap;

  position: absolute;
  left: 40px;
  bottom: 165px;

  &.clickable {
    cursor: pointer;
  }

  li {
    flex: 0 0 50%;
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

  background: url('./assets/images/member/link_button.png') no-repeat center / contain;

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
    height: 0;
    width: 0;
    position: absolute;
    z-index: -9;
    border: none;
    padding: 0;
  }
`;

// 버튼 박스
const ButtonConatiner = styled.div`
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
      box-shadow: 0px 2px 4px rgba(55, 55, 55, 0.1);
    }
  }
  .buttonLink {
    height: 50px;
    background: transparent;
    color: #73390b;
    span {
      display: inline-block;
      line-height: 28px;
      border-bottom: 2px solid #73390b;
    }
    &:hover {
      transform: translateY(-1px);
      opacity: 0.8;
      box-shadow: none;
    }
  }
`;
