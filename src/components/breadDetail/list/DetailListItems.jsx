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

  const getBreadDetail = useCallback(async (id) => {
    const { data, status } = await getBreadDetailData(id, token);
    if (status === 200) {
      setReadingData((state) => [
        ...state,
        {
          id,
          ...data,
        },
      ]);
    }
  }, []);

  const onClickBread = (id) => {
    if (isOpened) return;
    setIsOpened(true);
    setReadingId(id);
    let currentList = [...breadList[currentIndex]].map((e) =>
      e.id === id ? { ...e, status: 'READ' } : e,
    );
    let totalList = [...breadList];
    totalList[currentIndex] = currentList;
    setBreadList(totalList);
    const hasReadingData = readingData.find((e) => e.id === id);
    hasReadingData ?? getBreadDetail(id);
  };

  return (
    <DetailListItemsWrapper>
      <DetailListItemsContainer>
        {breadList[currentIndex]?.map((e) => {
          const { id, Type, status, senderNickname } = e;
          return (
            <DetailListItem
              key={e.id}
              onClickBread={onClickBread}
              data={{ id, Type, status, senderNickname }}
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
