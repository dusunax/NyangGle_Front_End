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
      {/* 타이틀 */}
      <MemberTitle>
        <HamburgerWarp>
          <div className="hambuger" onClick={onClickHamburgerButton}>
            🍔
          </div>
          <ul className={activeHamburger ? 'hambugerMenu active' : 'hambugerMenu'}>
            <li onClick={onClickKakaoLogoutButton}>로그아웃</li>
          </ul>
        </HamburgerWarp>

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
          <div className="nickNameChangeButton">🖍</div>
          <br />
          붕어빵이 <span className="sizeAll">{fishSizeAll}</span>개 있습니다냥.
        </NickNameChangeForm>
      </MemberTitle>

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
      </FishBreadTruckWrap>
    </MemberWrap>
  );
}

export default Member;

const MemberWrap = styled.div`
  padding: 20px 0;
`;

const HamburgerWarp = styled.div`
  margin-right: 20px;
  position: relative;
  align-self: flex-end;

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

const MemberTitle = styled.div`
  display: flex;
  flex-flow: column;

  font-family: 'EF_jejudoldam';
`;

const FishBreadTruckWrap = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  padding: 100px 0;
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

const NickNameChangeForm = styled.form`
  font-size: 30px;
  line-height: 1.6;
  text-align: center;

  position: relative;

  .username {
    height: 50px;
    width: auto;
    text-align: center;

    padding: 5px 0;

    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
  }

  input.username {
    height: 50px;
    outline: none;
    border: none;
  }

  .nickNameChangeButton {
    position: absolute;
    right: 10px;
    top: 5px;
  }
`;
