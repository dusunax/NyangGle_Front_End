import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailListItems from './DetailListItems';
import DetailListTaps from './DetailListTaps';
import DetailListButtons from './DetailListButtons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dataList, tapIndexState, currentIndexState } from '../../../atoms/fishBreadList';
import { getBreadListData, getUserData } from '../../../utils/fetchBreadDetail';
import styled from 'styled-components';
import { fishCartState } from '../../../atoms/fishCartData';

function DetailList() {
  const [breadList, setBreadList] = useRecoilState(dataList);
  const [fishCart, setFishCart] = useRecoilState(fishCartState);
  const setTapIndex = useSetRecoilState(tapIndexState);
  const [pageData, setPageData] = useState();
  const [lastId, setLastId] = useState(0);
  const [prevId, setPrevId] = useState(0);
  const [status, setStatus] = useState('All');
  const [currentIndex, setCurrentIndex] = useRecoilState(currentIndexState);
  const [currentPage, setCurrentPage] = useState(1);
  const [callingType, setCallingType] = useState();
  const [isRefetch, setIsRefetch] = useState(false);
  const navigate = useNavigate();
  const { uid } = useParams();

  const userData = JSON.parse(localStorage.getItem('user'));
  const { token } = userData ? userData : { token: null };

  const getBreadList = useCallback(async (callingType, callStatus, lastId, prevId, currentPage) => {
    console.log('fetching...');
    if (token === null) return;
    const { data, status } = await getBreadListData(
      token,
      callingType,
      callStatus,
      lastId,
      prevId,
      currentPage,
    );
    const { content, totalPages, last, first } = data;
    if (status === 200) {
      content.length && setLastId(content?.at(-1).fishId);
      content.length && setPrevId(content[0]?.fishId);
      const dataSet = [];
      const size = 9;
      for (let i = 0; i < content.length; i += size) {
        dataSet.push(content.slice(i, i + size));
      }
      setBreadList(dataSet);
      setPageData({ totalPages, last, first });
      if (callingType !== 'Prev') {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(dataSet.length - 1);
      }
    }
  }, []);

  const onClickLocation = () => {
    navigate(`/${uid}`);
  };

  const onClickTap = (type, index) => {
    if (type === status) return;
    setCallingType(0);
    setStatus(type);
    setCurrentPage(1);
    setIsRefetch((state) => !state);
    setTapIndex(index);
  };

  const onClickNext = () => {
    if (currentIndex < breadList.length - 1) {
      setCurrentIndex((state) => state + 1);
    }
    if (currentIndex === breadList.length - 1 && !pageData.last) {
      setCallingType('Next');
      setCurrentPage((state) => state + 1);
      setIsRefetch((state) => !state);
    }
  };

  const onClickPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((state) => state - 1);
    }
    if (currentIndex === 0 && !pageData.first) {
      setCallingType('Prev');
      setCurrentPage((state) => state - 1);
      setIsRefetch((state) => !state);
    }
  };

  const redirectNonMemeber = () => {
    alert('로그인이 필요합니다.');
    navigate('/');
  };

  const getUser = async () => {
    if (token === null) return;
    const { data, status } = await getUserData(uid);
    if (status === 200) {
      const { nickname, totalCount, unreadCount } = data;
      setFishCart({ nickname, totalCount, unreadCount, uuid: uid });
    }
  };

  useEffect(() => {
    getBreadList(callingType, status, lastId, prevId, currentPage);
  }, [isRefetch]);

  useEffect(() => {
    token ?? redirectNonMemeber();
    fishCart.uuid ?? getUser();
  }, []);

  return (
    <Wrapper>
      <DetailListWrapper>
        <div className="contents_area">
          <TurnBack onClick={onClickLocation}>돌아가기</TurnBack>
          <DetailListTaps onClickTap={onClickTap} />
          <DetailLists>
            <img src="/assets/images/breadDetail/mailbox.png" alt="" />
            <DetailListItems token={token} />
          </DetailLists>
          {pageData ? (
            <DetailListButtons
              pageData={pageData}
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
            />
          ) : (
            <ButtonArea />
          )}
        </div>
      </DetailListWrapper>
    </Wrapper>
  );
}

export default DetailList;

const Wrapper = styled.div`
  display: contents;
`;

const DetailListWrapper = styled.div`
  height: 100%;
  margin: 0 auto;

  @media screen and (min-width: 1000px) {
    padding: 2% 32px;
  }

  padding: 2% 120px;

  @media screen and (max-width: 800px) {
    padding: 2% 50px;
  }
  @media screen and (max-width: 500px) {
    padding: 2% 32px;
  }

  .contents_area {
    height: 100%;
    max-width: 350px;
    margin: 0 auto;

    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    gap: 14px;
  }
`;

const DetailLists = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 100%;
  }
`;

const TurnBack = styled.div`
  align-self: flex-start;

  text-indent: -9999px;
  width: 50px;
  height: 50px;
  background: url('/assets/images/breadDetail/turnBack.png') no-repeat 0px center / 38px;
  cursor: pointer;
`;

const ButtonArea = styled.div`
  width: 100%;
  height: 50px;
`;
