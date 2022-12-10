import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import * as countFishTruckImages from './countFishTruckImages.json';
import SectionTitle from '../../components/member/SectionTitle';
import ButtonContainer from '../../components/member/ButtonContainer';
import FishBreadTruck from '../../components/member/FishBreadTruck';
import { getUser, hasToken, isTokenExpired, saveUser } from '../../utils/userAuth';
import { getFish, saveFish } from '../../utils/fishCount';
import styled from 'styled-components';

function Member() {
  const { requestApi } = useAxios();
  const navigate = useNavigate();
  const pageUuid = window.location.pathname.slice(1);

  // user={nickname: string, token: string, uuid: string}
  const [user, setUser] = useState(getUser());
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [isMatchUuid, setIsMatchUuid] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);

  const [fishData, setFishData] = useState();
  const [displayFishImage, setDisplayFishImage] = useState('cat_truck_0.png');

  const memberCheck = (isLogin) => {
    const matchedResult = user?.uuid === pageUuid;
    setIsMatchUuid(matchedResult);
    setIsMyPage(isLogin && matchedResult);
  };

  async function logout() {
    try {
      await requestApi('post', 'oauth/logout/kakao');

      // 요청 성공여부와 상관없이 token을 지워야 할 수도 있음
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
  const fetchCount = async (api) => {
    try {
      const response = await requestApi('get', '/fishbread/' + api);
      return response.status === 200 ? response.data : '';
    } catch (error) {
      console.log(error.code);
    }
  };

  // 붕어빵 갯수 보여주기
  const matchCatTruckImage = (fishCount) => {
    // console.log(fishCount);
    if (fishCount < 6) {
      setDisplayFishImage(countFishTruckImages.default[fishCount].imageURL);
    } else {
      setDisplayFishImage('cat_truck_6.png');
    }
  };

  async function fetchFishCountHandler() {
    try {
      const fetchedFish = await fetchCount.call(null, `${pageUuid}`);

      if (fetchedFish?.nickname !== fishData?.nickname || !fishData) {
        saveFish(fetchedFish);
        setFishData(fetchedFish);
        matchCatTruckImage(fetchedFish.unreadCount);
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchFishCountHandler();

    const isLogin = userTokenHandler(user, logout);
    setIsLoggedUser(isLogin);

    if (isLogin) memberCheck(isLogin);

    const preventGoBack = () => {
      history.pushState(null, '', location.href);
      console.log('prevent go back!');
    };

    history.pushState(null, '', location.href);
    window.addEventListener('popstate', preventGoBack);

    return () => window.removeEventListener('popstate', preventGoBack);
  }, [location, matchCatTruckImage, userTokenHandler, setIsLoggedUser]);

  return (
    <>
      <MemberWrap>
        <div className="contents_area">
          {/* 타이틀 */}
          <SectionTitle
            fishData={fishData}
            isMyPage={isMyPage}
            user={user}
            logout={logout}
            saveUser={saveUser}
            isLoggedUser={isLoggedUser}
          />

          {/* 푸드트럭 이미지 & 붕어빵 매대 */}
          <FishBreadTruck
            isMyPage={isMyPage}
            displayFishImage={displayFishImage}
            pageUuid={pageUuid}
          />

          {/* 로그인 여부에 따라 바뀌는 버튼 */}
          <ButtonContainer
            isMyPage={isMyPage}
            isMatchUuid={isMatchUuid}
            isLoggedUser={isLoggedUser}
            myUid={user ? user?.uuid : null}
            fishData={fishData}
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
