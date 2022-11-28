import DetailModal from '../../components/breadDetail/DetailModal';
import DetailList from '../../components/breadDetail/list/DetailList';
import { modalState } from '../../atoms/fishBreadList';
import { useRecoilValue } from 'recoil';

function List() {
  const isOpened = useRecoilValue(modalState);

  return (
    <>
      <DetailList />
      {isOpened && <DetailModal />}
    </>
  );
}

export default List;
