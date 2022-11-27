import { useCallback, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import DetailModal from '../../components/breadDetail/DetailModal';
import { useNavigate, useParams } from 'react-router-dom';

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

function List() {
  const [breadList, setBreadList] = useState([]);
  const [pageData, setPageData] = useState();
  const [lastId, setLastId] = useState();
  const [prevId, setPrevId] = useState();
  const [status, setStatus] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [callingType, setCallingType] = useState();
  const [isRefetch, setIsRefetch] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [readingData, setReadingData] = useState();
  const { requestApi } = useAxios();
  const navigate = useNavigate();
  const { uid } = useParams();
  const tapList = [
    ['전체 붕어빵', 'All'],
    ['안읽은 붕어빵', 'UNREAD'],
    ['읽은 붕어빵', 'Read'],
  ];

  const getBreadList = useCallback(async () => {
    let url = '';
    if (callingType === 'Next') {
      if (status === 'All') {
        url = `url?id=${lastId}&page=${currentPage}&callType=next`;
      }
      if (status === 'Read') {
        url = `url?id=${lastId}&page=${currentPage}&callType=next&status=READ`;
      }
      if (status === 'UNREAD') {
        url = `url?id=${lastId}&page=${currentPage}&callType=next&status=UNREAD`;
      }
    }
    if (callingType === 'Prev') {
      if (status === 'All') {
        url = `url?id=${prevId}&page=${currentPage}&callType=prev`;
      } 
      if (status === 'Read') {
        url = `url?id=${prevId}&page=${currentPage}&callType=prev&status=READ`;
      }
      if (status === 'UNREAD') {
        url = `url?id=${prevId}&page=${currentPage}&callType=prev&status=UNREAD`;
      }
    }
    //const {data, status} = await requestApi("get", url);
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

  const onClickTap = (type) => {
    if (type === status) return;
    setStatus(type);
    setIsRefetch((state) => !state);
  };

  const onClickBread = (id) => {
    if(isOpened) return;
    setIsOpened(true);
    const readingData = breadList[currentIndex].find((e) => e.id === id);
    setReadingData(readingData);
  };

  const onClickLocation = () => {
    navigate(`/${uid}`)
  }

  const closeModal = () => {
    setIsOpened(false);
  }

  useEffect(() => {
    getBreadList();
  }, [isRefetch]);
  return (
    <>
      <div>
        <div onClick={onClickLocation}>돌아가기</div>
        <ul style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {tapList.map((e, i) => (
            <li key={`tap${i + 1}`} onClick={() => onClickTap(e[1])}>
              {e[0]}
            </li>
          ))}
        </ul>
        <ul>
          {breadList[currentIndex]?.map((e) => (
            <li
              key={e.id}
              onClick={() => onClickBread(e.id)}
            >{`Type:${e.Type} / Statue:${e.status} / Nickname:${e.senderNickname} Id:${e.id}`}</li>
          ))}
        </ul>
        {(pageData?.first && currentIndex === 0) || (
          <button type="button" onClick={onClickPrev}>
            Prev
          </button>
        )}
        {(pageData?.last && currentIndex === breadList?.length - 1) || (
          <button type="button" onClick={onClickNext}>
            Next
          </button>
        )}
      </div>
      {isOpened && <DetailModal data={readingData} closeModal={closeModal}/>}
    </>
  );
}

export default List;
