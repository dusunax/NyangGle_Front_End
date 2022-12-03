import DetailModal from '../../components/breadDetail/DetailModal';
import DetailList from '../../components/breadDetail/list/DetailList';
import { modalState } from '../../atoms/fishBreadList';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

function List() {
  const isOpened = useRecoilValue(modalState);
  const [modalFishData, setModalFishData] = useState({});

  return (
    <>
      <DetailList setModalFishData={setModalFishData} />
      {isOpened && <DetailModal modalFishData={modalFishData} />}
    </>
  );
}

export default List;
