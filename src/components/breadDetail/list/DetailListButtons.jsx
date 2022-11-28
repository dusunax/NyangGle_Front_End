import { dataList } from '../../../atoms/fishBreadList';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

function DetailListButtons({ pageData, currentIndex, onClickNext, onClickPrev }) {
  const breadList = useRecoilValue(dataList);
  const { first, last } = pageData;

  return (
    <ButtonWrapper>
      {(first && currentIndex === 0) || (
        <Button type="button" onClick={onClickPrev} call="prev">
          Prev
        </Button>
      )}
      {(last && currentIndex === breadList.length - 1) || (
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
  margin-top: 24px;
  height: 50px;
`;

const Button = styled.div`
  width: 50px;
  height: 50px;
  text-indent: -9999px;
  position: absolute;
  cursor: pointer;

  ${({ call }) => css`
    //background: url('../../../../public/assets/images/breadDetail/${call}.png') no-repeat center/contain;
    background: url('./assets/images/breadDetail/${call}.png') no-repeat center/contain;
  `}

  ${({ call }) =>
    call === 'next'
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
`;
