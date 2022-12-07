import { dataList, readingDataList, modalState, idState } from '../../../atoms/fishBreadList';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { getBreadDetailData } from '../../../utils/fetchBreadDetail';
import styled from 'styled-components';
import DetailListItem from './DetailListItem';

function DetailListItems({ currentIndex, token }) {
  const [breadList, setBreadList] = useRecoilState(dataList);
  const [readingData, setReadingData] = useRecoilState(readingDataList);
  const [isOpened, setIsOpened] = useRecoilState(modalState);
  const setReadingId = useSetRecoilState(idState);

  const getBreadDetail = useCallback(async (fishId) => {
    const { data, status } = await getBreadDetailData(fishId, token);
    console.log(data)
    if (status === 200) {
      setReadingData((state) => [...state, { ...data }]);
    }
  }, []);

  const onClickBread = (fishId) => {
    if (isOpened) return;
    setIsOpened(true);
    setReadingId(fishId);
    let currentList = [...breadList[currentIndex]].map((e) =>
      e.fishId === fishId ? { ...e, status: 'READ' } : e,
    );
    let totalList = [...breadList];
    totalList[currentIndex] = currentList;
    setBreadList(totalList);
    const hasReadingData = readingData.find((e) => e.fishId === fishId);
    hasReadingData ?? getBreadDetail(fishId);
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
