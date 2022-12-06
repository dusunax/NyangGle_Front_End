import React from 'react';
import { useRedirectPage } from '../../hooks/useRedirectPage';
import styled from 'styled-components';

function FishBreadTruck({ displayFishImage, uid }) {
  const [setPage] = useRedirectPage();
  return (
    <FishBreadTruckWrap>
      <FishBreadTruckBox>
        <img
          src={`./assets/images/member/${displayFishImage}`}
          alt="고양이 트럭이다냥"
          className={'catTruck clickable'}
          onClick={setPage.bind(this, `/list/${uid}`)}
        />
      </FishBreadTruckBox>
    </FishBreadTruckWrap>
  );
}

export default FishBreadTruck;

const FishBreadTruckWrap = styled.div`
  width: 100%;
  height: 50%;
  position: relative;

  margin-bottom: 2%;
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
`;
