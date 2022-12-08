import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import styled from 'styled-components';

import * as countFishTruckImages from './countFishTruckImages.json';
import SectionTitle from '../../components/member/SectionTitle';
import ButtonContainer from '../../components/member/ButtonContainer';
import FishBreadTruck from '../../components/member/FishBreadTruck';

import { getUser, hasToken, isTokenExpired, saveUser } from '../../utils/userAuth';

function Member() {
  const { requestApi } = useAxios();
  const navigate = useNavigate();
  const pageUuid = window.location.pathname.slice(1);

  // user={nickname: string, token: string, uuid: string}
  const [user, setUser] = useState(getUser());
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [isMatchUuid, setIsMatchUuid] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);

  // title이랑 엮여 있어서 여기에 놔둠. 매대의 붕어빵 갯수 관련
  const [fishSizeAll, setFishSizeAll] = useState();
  const [fishSizeUnread, setFishSizeUnread] = useState();
  const [fishSizeMyUnread, setFishSizeMyUnread] = useState();
  const [displayFishImage, setDisplayFishImage] = useState('cat_truck_0.png');

  const memeberCheck = (isLogin) => {
    const matchedResult = user?.uuid === pageUuid;

    setIsMatchUuid(matchedResult);
    setIsMyPage(isLogin && matchedResult);
  };

  async function logout() {
    try {
      await requestApi('post', 'oauth/logout/kakao');

      // 요청 성공여부와 상관없이 token을 지워야 할 수 있음
      console.log('로그아웃 되었습니다.');
      localStorage.removeItem('user');
    } catch (error) {
      console.log(error);
    } finally {
      navigate('/');
    }
  }

  /** user: User객체, logoutFunc: 로그아웃 기능 */
  const userTokenHandler = (user, logoutFunc) => {
    if (!hasToken(user)) {
      // console.log('로그인하지 않았습니다.');
      return false;
    } else if (isTokenExpired(user?.token)) {
      logoutFunc();
      // console.log('토큰이 만료 되었습니다.');
      return false;
    } else {
      // console.log(`로그인 상태입니다. ${user?.nickname}`);
      return true;
    }
  };

  // this를 쓰고 싶었음
  const fish = {
    api: '/uuid',

    fetchCount: async function () {
      try {
        const response = await requestApi('get', '/fishbread/' + this.api);
        return response.status === 200 ? response.data : '';
      } catch (error) {
        console.log(error.code);
      }
    },
  };

  // 붕어빵 갯수 보여주기
  const matchCatTruckImage = (fishCount) => {
    if (fishCount < 6) {
      setDisplayFishImage(countFishTruckImages.default[fishCount].imageURL);
    } else {
      // 이 부분 교체
      setDisplayFishImage('cat_truck_6.png');
    }
  };

  async function fetchFishCountHandler() {
    if (isMyPage) {
      // 내 페이지에서 붕어빵 갯수값이 없으면 요청
      if (!fishSizeAll) {
        const fetchedCount = await fish.fetchCount.call({ api: `${user?.uuid}/total` });
        setFishSizeAll(fetchedCount);
      }
      if (!fishSizeMyUnread) {
        const fetchedCount = await fish.fetchCount.call({ api: `${user?.uuid}/myunread` });
        setFishSizeMyUnread(fetchedCount);
      }
    }
    if (!fishSizeUnread) {
      const fetchedCount = await fish.fetchCount.call({ api: `${pageUuid}/unread` });
      setFishSizeUnread(fetchedCount);
    }

    // api response 통합하면 여기로 값 return해서 쓰기
    // return {}
  }

  useEffect(() => {
    const fishes = fetchFishCountHandler();
    if (fishes.unread) matchCatTruckImage(fishes.unread);

    const isLogin = userTokenHandler(user, logout);
    setIsLoggedUser(isLogin);

    if (isLogin) memeberCheck(isLogin);
  }, [location, matchCatTruckImage, userTokenHandler, setIsLoggedUser]);

  return (
    <>
      <MemberWrap>
        <div className="contents_area">
          {/* 타이틀 */}
          <SectionTitle
            fishSizeAll={fishSizeAll}
            isMyPage={isMyPage}
            user={user}
            setUser={setUser}
            logout={logout}
            saveUser={saveUser}
          />

          {/* 푸드트럭 이미지 & 붕어빵 매대 */}
          <FishBreadTruck
            isMyPage={isMyPage}
            displayFishImage={displayFishImage}
            pageUuid={pageUuid}
            fishSizeUnread={fishSizeUnread}
            fishSizeMyUnread={fishSizeMyUnread}
          />

          {/* 로그인 여부에 따라 바뀌는 버튼 */}
          <ButtonContainer
            isMyPage={isMyPage}
            isMatchUuid={isMatchUuid}
            isLoggedUser={isLoggedUser}
            myUid={user ? user?.uuid : null}
          />
        </div>
      </MemberWrap>
    </>
  );
}

export default Member;

const MemberWrap = styled.div`
  height: 100vh;

  background: linear-gradient(to bottom, #e3edf2 68%, #000 68%, #000 68.3%, #faeac7 68.3%);

  .contents_area {
    height: 100%;
    max-width: 450px;

    margin: 0 auto;
    padding: 0 32px;

    position: relative;

    display: flex;
    flex-flow: column;
    justify-content: center;
  }
`;
