import { dataList, readingDataList, modalState, idState, currentIndexState } from '../../../atoms/fishBreadList';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { useCallback } from 'react';
import { getBreadDetailData } from '../../../utils/fetchBreadDetail';
import styled from 'styled-components';
import DetailListItem from './DetailListItem';

function DetailListItems({ token }) {
  const currentIndex = useRecoilValue(currentIndexState);
  const [breadList, setBreadList] = useRecoilState(dataList);
  const [readingData, setReadingData] = useRecoilState(readingDataList);
  const [isOpened, setIsOpened] = useRecoilState(modalState);
  const setReadingId = useSetRecoilState(idState);

  const getBreadDetail = useCallback(async (fishId) => {
    const { data, status } = await getBreadDetailData(fishId, token);
    if (status === 200) {
      setIsOpened(true);
      setReadingData((state) => [...state, { ...data }]);
    } else {
      alert('붕어빵을 가져오는데 실패했습니다...');
    }
  }, []);

  const onClickBread = (fishId) => {
    if (isOpened) return;
    setReadingId(fishId);
    let currentList = [...breadList[currentIndex]].map((e) =>
      e.fishId === fishId ? { ...e, status: 'READ' } : e,
    );
    let totalList = [...breadList];
    totalList[currentIndex] = currentList;
    setBreadList(totalList);
    const hasReadingData = readingData.find((e) => e.id === fishId);
    hasReadingData ? setIsOpened(true) : getBreadDetail(fishId);
  };

  return (
    <DetailListItemsWrapper>
      <DetailListItemsContainer>
        {breadList[currentIndex]?.map((e) => {
          const { fishId, type, status, senderNickname } = e;
          return (
            <DetailListItem
              key={fishId}
              onClickBread={onClickBread}
              data={{ fishId, type, status, senderNickname }}
            />
          );
        })}
      </DetailListItemsContainer>
    </DetailListItemsWrapper>
  );
}

export default DetailListItems;

const DetailListItemsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 76%;
  height: 69%;
  min-width: 32vh;
  max-width: 34vh;
`;

const DetailListItemsContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 100%;
  height: 100%;
  gap: 10% 1%;
`;
