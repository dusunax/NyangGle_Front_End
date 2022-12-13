import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';

import SectionTitle from '../../components/member/SectionTitle';
import ButtonContainer from '../../components/member/ButtonContainer';
import FishBreadTruck from '../../components/member/FishBreadTruck';
import { getUser, hasToken, isTokenExpired, saveUser } from '../../utils/userAuth';
import styled from 'styled-components';

import { fishCartState } from '../../atoms/fishCartData';
import { useRecoilState } from 'recoil';

function Member() {
  const { requestApi } = useAxios();
  const navigate = useNavigate();
  const pageUuid = window.location.pathname.slice(1);

  /** fishCart = {
    totalCount: number,
    unreadCount: number,
    nickname: string,
    uuid: null | string } */
  const [fishCart, setFishCart] = useRecoilState(fishCartState);

  /** user = {nickname: string, token: string, uuid: string} */
  const [user, setUser] = useState(getUser());
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [isMatchUuid, setIsMatchUuid] = useState(false);
  const [isMyPage, setIsMyPage] = useState(false);

  const [displayFishImage, setDisplayFishImage] = useState('cat_truck_0.png');

  /** 로그인 여부, 내 페이지 여부를 확인해서 state에 저장합니다. */
  const memberCheck = (isLogin) => {
    const matchedResult = user?.uuid === pageUuid;
    setIsMatchUuid(matchedResult);
    setIsMyPage(isLogin && matchedResult);
  };

  async function logout() {
    try {
      await requestApi('post', 'oauth/logout/kakao');

      localStorage.removeItem('user');
    } catch (error) {
      console.log(error);
      localStorage.removeItem('user');
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

  /** 붕어빵 갯수를 요청합니다.(갯수 타입, id에 따라 재사용 용도) */
  const fetchCount = async (id) => {
    try {
      const response = await requestApi('get', '/fishbread/' + id);
      return response.status === 200 ? response.data : '';
    } catch (error) {
      console.log(error);
    }
  };

  /** 붕어빵 갯수를 트럭에 보여줍니다. */
  const matchCatTruckImage = (fishCount) => {
    // console.log(fishCount);
    if (fishCount < 6) {
      setDisplayFishImage(`cat_truck_${fishCount}.png`);
    } else {
      setDisplayFishImage('cat_truck_6.png');
    }
  };

  /** 붕어빵 갯수를 요청하는 Handler입니다. */
  async function fetchFishCountHandler() {
    try {
      const fetchedFish = await fetchCount.call(null, `${pageUuid}`);
      // console.log('요청을 보냈습니다.');

      setFishCart({
        totalCount: fetchedFish.totalCount,
        unreadCount: fetchedFish.unreadCount,
        nickname: fetchedFish.nickname,
        uuid: pageUuid,
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchFishCountHandler();
  }, []);

  useEffect(() => {
    if (fishCart?.uuid !== null) {
      matchCatTruckImage(fishCart.unreadCount);
    }
    // console.log('리랜더링 되었습니다.');

    // 로그인 확인
    const isLogin = userTokenHandler(user, logout);
    setIsLoggedUser(isLogin);

    if (isLogin) memberCheck(isLogin);

    // 새로고침 & 뒤로가기
    const preventGoBack = () => {
      history.pushState({ prevFish: fishCart }, '', location.href);
      setFishCart(...history.state.prevFish);
    };

    window.addEventListener('popstate', preventGoBack);

    return () => window.removeEventListener('popstate', preventGoBack);
  }, [fishCart, location.href]);

  return (
    <>
      <MemberWrap>
        <div className="contents_area">
          {/* 타이틀 */}
          <SectionTitle
            fishData={fishCart}
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
            fishData={fishCart}
          />
        </div>
      </MemberWrap>
    </>
  );
}

export default Member;

const MemberWrap = styled.div`
  height: 100%;

  background: linear-gradient(to bottom, #e3edf2 68%, #000 68%, #000 68.3%, #faeac7 68.3%);

  .contents_area {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: center;
    height: 100%;
    /* max-width: 450px; */
    margin: 0 auto;
    padding: 0 32px;
  }
`;
