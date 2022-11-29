import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailListItems from './DetailListItems';
import DetailListTaps from './DetailListTaps';
import DetailListButtons from './DetailListButtons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dataList, tapIndexState } from '../../../atoms/fishBreadList';
import { getBreadListData } from '../../../utils/fetchBreadDetail';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';

const BREAD_DATA = {
  content: [
    {
      id: 1,
      Type: '밀가루/팥',
      status: 'UNREAD',
      senderNickname: 'nick1',
    },
    {
      id: 2,
      Type: '밀가루/슈',
      status: 'UNREAD',
      senderNickname: 'nick2',
    },
    {
      id: 3,
      Type: '밀가루/마라',
      status: 'UNREAD',
      senderNickname: 'nick3',
    },
    {
      id: 4,
      Type: '밀가루/민초',
      status: 'UNREAD',
      senderNickname: 'nick4',
    },
    {
      id: 5,
      Type: '고구마/팥',
      status: 'UNREAD',
      senderNickname: 'nick5',
    },
    {
      id: 6,
      Type: '고구마/슈',
      status: 'UNREAD',
      senderNickname: 'nick6',
    },
    {
      id: 7,
      Type: '초코/마라',
      status: 'UNREAD',
      senderNickname: 'nick7',
    },
    {
      id: 8,
      Type: '고구마/민초',
      status: 'UNREAD',
      senderNickname: 'nick8',
    },
    {
      id: 9,
      Type: '녹차/팥',
      status: 'UNREAD',
      senderNickname: 'nick9',
    },
    {
      id: 10,
      Type: '녹차/슈',
      status: 'UNREAD',
      senderNickname: 'nick10',
    },
  ],
  totalPages: 2,
  last: true,
  first: true,
};

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
  const cookies = new Cookies();

  const token = cookies.get('X-NYANG-AUTH-TOKEN');

  const getBreadList = useCallback(async () => {
    console.log('fetching...');
    const { data, callStatus } = await getBreadListData(
      token,
      callingType,
      status,
      lastId,
      prevId,
      currentPage,
    );
    const { content, totalPages, last, first } = data;
    /*const { content, totalPages, last, first } = BREAD_DATA,
      callStatus = 200;*/
    if (callStatus === 200) {
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
    getBreadList();
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
  height: 100%;
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
  background: url('../../../../assets/images/breadDetail/mailbox.png') no-repeat center/contain;
`;

const TurnBack = styled.div`
  text-indent: -9999px;
  width: 50px;
  height: 50px;
  background: url('../../../../assets/images/breadDetail/turnBack.png') no-repeat center/cover;
  cursor: pointer;
  margin-bottom: 14px;
`;
