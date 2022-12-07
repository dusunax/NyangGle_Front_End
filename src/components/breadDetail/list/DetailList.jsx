import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailListItems from './DetailListItems';
import DetailListTaps from './DetailListTaps';
import DetailListButtons from './DetailListButtons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dataList, tapIndexState } from '../../../atoms/fishBreadList';
import { getBreadListData } from '../../../utils/fetchBreadDetail';
import styled from 'styled-components';

function DetailList() {
  const [breadList, setBreadList] = useRecoilState(dataList);
  const setTapIndex = useSetRecoilState(tapIndexState);
  const [pageData, setPageData] = useState();
  const [lastId, setLastId] = useState(0);
  const [prevId, setPrevId] = useState(0);
  const [status, setStatus] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
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
      setLastId(content.at(-1).id);
      setPrevId(content[0].id);
      const dataSet = [];
      const size = 9;
      for (let i = 0; i < content.length; i += size) {
        dataSet.push(content.slice(i, i + size));
      }
      setBreadList(dataSet);
      setPageData({ totalPages, last, first });
      setCurrentIndex(0);
    }
  }, []);

  const onClickLocation = () => {
    navigate(`/${uid}`);
  };

  const onClickTap = (type, index) => {
    if (type === status) return;
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

  useEffect(() => {
    getBreadList(callingType, status, lastId, prevId, currentPage);
  }, [isRefetch]);

  useEffect(() => {
    token ?? redirectNonMemeber();
  }, []);

  return (
    <DetailListWrapper>
      <div>
        <TurnBack onClick={onClickLocation}>돌아가기</TurnBack>
        <DetailListTaps onClickTap={onClickTap} />
        <DetailLists>
          <DetailListItems currentIndex={currentIndex} token={token} />
        </DetailLists>
        {pageData && (
          <DetailListButtons
            currentIndex={currentIndex}
            pageData={pageData}
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        )}
      </div>
    </DetailListWrapper>
  );
}

export default DetailList;

const DetailListWrapper = styled.div`
  padding: 0 10px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailLists = styled.div`
  width: calc(100vw - 20px);
  height: calc(100vh - 262px);
  max-width: 354px;
  max-height: 551px;
  position: relative;
  background: url('/assets/images/breadDetail/mailbox.png') no-repeat center/contain;
`;

const TurnBack = styled.div`
  text-indent: -9999px;
  width: 50px;
  height: 50px;
  background: url('/assets/images/breadDetail/turnBack.png') no-repeat center/cover;
  cursor: pointer;
  margin-bottom: 14px;
`;
