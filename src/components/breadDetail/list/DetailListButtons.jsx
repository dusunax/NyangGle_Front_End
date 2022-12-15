import { dataList, currentIndexState } from '../../../atoms/fishBreadList';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

function DetailListButtons({ pageData, onClickNext, onClickPrev }) {
  const currentIndex = useRecoilValue(currentIndexState);
  const breadList = useRecoilValue(dataList);
  const { first, last } = pageData;

  return (
    <ButtonWrapper>
      {(first && currentIndex === 0) || (
        <Button type="button" onClick={onClickPrev} call="prev">
          Prev
        </Button>
      )}
      {!(last && currentIndex === breadList.length - 1) && breadList.length !== 0 && (
        <Button type="button" onClick={onClickNext} call="next">
          Next
        </Button>
      )}
    </ButtonWrapper>
  );
}

export default DetailListButtons;

const ButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  text-indent: -9999px;
  position: absolute;
  cursor: pointer;

  ${({ call }) => css`
    background: url('../../../../assets/images/breadDetail/${call}.png') no-repeat center / 38px;
  `}

  ${({ call }) =>
    call === 'next'
      ? css`
          background-position: 12px center;
          right: 0;
        `
      : css`
          background-position: 0px center;
          left: 0;
        `}
`;
