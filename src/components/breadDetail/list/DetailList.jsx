import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailListItems from './DetailListItems';
import DetailListTaps from './DetailListTaps';
import DetailListButtons from './DetailListButtons';
import useAxios from '../../../hooks/useAxios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { dataList } from '../../../atoms/fishBreadList';

const BREAD_DATA = {
  content: [
    {
      id: 1,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick1',
    },
    {
      id: 2,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick2',
    },
    {
      id: 3,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick3',
    },
    {
      id: 4,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick4',
    },
    {
      id: 5,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick5',
    },
    {
      id: 6,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick6',
    },
    {
      id: 7,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick7',
    },
    {
      id: 8,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick8',
    },
    {
      id: 9,
      Type: '팥/앙금',
      status: 'UNREAD',
      senderNickname: 'nick9',
    },
    {
      id: 10,
      Type: '팥/앙금',
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
  const [pageData, setPageData] = useState();
  const [lastId, setLastId] = useState();
  const [prevId, setPrevId] = useState();
  const [status, setStatus] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [callingType, setCallingType] = useState();
  const [isRefetch, setIsRefetch] = useState(false);
  const navigate = useNavigate();
  const { requestApi } = useAxios();
  const { uid } = useParams();

  const baseUrl = 'url';

  const getBreadList = useCallback(async () => {
    let url = '';
    if (callingType === 'Next') {
      if (status === 'All') {
        url = `${baseUrl}?id=${lastId}&page=${currentPage}&callType=next`;
      }
      if (status === 'Read') {
        url = `${baseUrl}?id=${lastId}&page=${currentPage}&callType=next&status=READ`;
      }
      if (status === 'UnRead') {
        url = `${baseUrl}?id=${lastId}&page=${currentPage}&callType=next&status=UNREAD`;
      }
    }
    if (callingType === 'Prev') {
      if (status === 'All') {
        url = `${baseUrl}?id=${prevId}&page=${currentPage}&callType=prev`;
      }
      if (status === 'Read') {
        url = `${baseUrl}?id=${prevId}&page=${currentPage}&callType=prev&status=READ`;
      }
      if (status === 'UnRead') {
        url = `${baseUrl}?id=${prevId}&page=${currentPage}&callType=prev&status=UNREAD`;
      }
    }
    /*const { data, status } = await requestApi('get', url, {
      withCredentials: true,
      headers: {
        'X-NYANG-AUTH-TOKEN': '',
      },
    });
    const { content, totalPages, number, last, first } = data;*/
    const { content, totalPages, number, last, first } = BREAD_DATA,
      status = 200;
    if (status === 200) {
      setLastId(content.at(-1).id);
      setPrevId(content[0].id);
      const dataSet = [];
      const size = 9;
      for (let i = 0; i < content.length; i += size) {
        dataSet.push(content.slice(i, i + size));
      }
      setBreadList(dataSet);
      setPageData({ totalPages, number, last, first });
      setCurrentIndex(0);
    }
  }, []);

  const onClickLocation = () => {
    navigate(`/${uid}`);
  };

  const onClickTap = (type) => {
    if (type === status) return;
    setStatus(type);
    setIsRefetch((state) => !state);
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

  useEffect(() => {
    getBreadList();
  }, [isRefetch]);

  return (
    <div>
      <div onClick={onClickLocation}>돌아가기</div>
      <DetailListTaps onClickTap={onClickTap} />
      <DetailListItems currentIndex={currentIndex} baseUrl={baseUrl} />
      {pageData && (
        <DetailListButtons
          currentIndex={currentIndex}
          pageData={pageData}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      )}
    </div>
  );
}

export default DetailList;
