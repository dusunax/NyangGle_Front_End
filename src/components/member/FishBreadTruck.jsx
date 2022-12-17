import React from 'react';
import { useRedirectPage } from '../../hooks/useRedirectPage';
import styled from 'styled-components';

function FishBreadTruck({ displayFishImage, isMyPage, pageUuid }) {
  const [setPage] = useRedirectPage();
  return (
    <FishBreadTruckWrap>
      <FishBreadTruckBox>
        <img
          src={`/assets/images/member/catTruck/${displayFishImage}`}
          alt="고양이 트럭이다냥"
          className={isMyPage ? 'catTruck clickable' : 'catTruck '}
          onClick={isMyPage ? setPage.bind(this, `/list/${pageUuid}`) : null}
        />
      </FishBreadTruckBox>
    </FishBreadTruckWrap>
  );
}

export default React.memo(FishBreadTruck);

const FishBreadTruckWrap = styled.section`
  width: 100%;
  height: 47%;
  position: relative;

  margin-bottom: 4%;
`;

const FishBreadTruckBox = styled.div`
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
  .clickable {
    cursor: pointer;
  }
`;
