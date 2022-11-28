import { dataList } from '../../../atoms/fishBreadList';
import { useRecoilValue } from 'recoil';

function DetailListButtons({ pageData,currentIndex, onClickNext, onClickPrev }) {
  const breadList = useRecoilValue(dataList);
  const { first, last } = pageData;

  return (
    <div>
      {(first && currentIndex === 0) || (
        <button type="button" onClick={onClickPrev}>
          Prev
        </button>
      )}
      {(last && currentIndex === breadList.length - 1) || (
        <button type="button" onClick={onClickNext}>
          Next
        </button>
      )}
    </div>
  );
}

export default DetailListButtons;
