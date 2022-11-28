import { dataList, readingDataList, modalState, idState } from '../../../atoms/fishBreadList';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { getBreadDetailData } from '../../../utils/fetchBreadDetail';
import styled from 'styled-components';
import DetailListItem from './DetailListItem';

const BREAD_DATA_ID = {
  Type: '팥/앙금',
  message:
    '안녕 냥냥펀치! 나는 냥아치야 차가운 밀가루 반죽에 아주머니는 연신 허연 입김 불어넣으시고 후끈 달아오른 무쇠틀 속으로 붉은 심장을 넣어주신다 어느새 윤기 흐르는 피부로 세상에 나온 손주들 온기도 가시기 전 봉지에 담긴다 오늘은 아주머니도 월척 붕어 몇 마리 낚아',
  createdAt: '',
  senderNickname: 'nick1',
};

function DetailListItems({ currentIndex, baseUrl, token }) {
  const [breadList, setBreadList] = useRecoilState(dataList);
  const [readingData, setReadingData] = useRecoilState(readingDataList);
  const [isOpened, setIsOpened] = useRecoilState(modalState);
  const setReadingId = useSetRecoilState(idState);

  const getBreadDetail = useCallback(async (id) => {
    //const { data, status } = await getBreadDetailData(baseUrl, id, token);
    const data = BREAD_DATA_ID,
      status = 200;
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
    const openedBread = breadList[currentIndex].find((e) => e.id === id);
    console.log(breadList, breadList[currentIndex], openedBread);
    setBreadList((state) => [...state, ]);
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
