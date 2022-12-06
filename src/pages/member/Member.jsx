import { useEffect, useState } from 'react';
import * as countFishTruckImages from './countFishTruckImages.json';
import SectionTitle from '../../components/member/SectionTitle';
import ButtonContainer from '../../components/member/ButtonContainer';
import FishBreadTruck from '../../components/member/FishBreadTruck';
import styled from 'styled-components';

function Member(props) {
  const { countUp, setCountUp } = props;
  // const { requestApi } = useAxios();

  // 사용자 일치 여부 확인
  const [isLoggedUser, setIsLoggedUser] = useState(true);
  const uid = window.location.pathname.slice(1);
  const myUid = JSON.parse(localStorage.getItem('user')).uuid;

  // uid 일치 여부 확인
  const [isMatchUid, setisMatchUid] = useState(false);
  let isMyPage = isLoggedUser && isMatchUid;

  // // 붕어빵 개수 API호출
  // const getFishBreadContents = async () => {
  //   const { data, status } = await requestApi('get', '/fishbread');

  //   if (status >= 200 && status < 400) {
  //     console.log(data);
  //   }
  // };

  // useEffect(() => {
  //   getFishBreadContents();
  // }, []);

  // title이랑 엮여 있어서 여기에 놔둠. 매대의 붕어빵 갯수 관련
  const [fishSizeAll, setFishSizeAll] = useState();
  const [displayFishImage, setDisplayFishImage] = useState('cat_truck_0.png');

  // 붕어빵 갯수 보여주기
  const fetchSizeAll = () => {
    if (countUp < 6) {
      setDisplayFishImage(countFishTruckImages.default[countUp].imageURL);
    } else {
      setDisplayFishImage('cat_truck_6.png');
    }
    setFishSizeAll(countUp);
  };

  useEffect(() => {
    if (uid === myUid) setisMatchUid(true);
    fetchSizeAll();
    location.state !== null && setisMatchUid(true);
  }, [location]);

  return (
    <>
      <MemberWrap>
        <div className="contents_area">
          {/* 타이틀 */}
          <SectionTitle fishSizeAll={fishSizeAll} isMyPage={isMyPage} />

          {/* 푸드트럭 이미지 & 붕어빵 매대 */}
          <FishBreadTruck displayFishImage={displayFishImage} uid={uid} />

          {/* 로그인 여부에 따라 바뀌는 버튼 */}
          <ButtonContainer
            isMyPage={isMyPage}
            myUid={myUid}
            isMatchUid={isMatchUid}
            isLoggedUser={isLoggedUser}
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
