import styled, { css } from 'styled-components';
import { tapIndexState } from '../../../atoms/fishBreadList';
import { useRecoilValue } from 'recoil';

function DetailListTap({ sort, index, onClickTap, type }) {
  const tapIndex = useRecoilValue(tapIndexState);
  return (
    <TapWrapper>
      <TapContent index={index} tapIndex={tapIndex} onClick={() => onClickTap(type, index)}>
        {sort}
      </TapContent>
      <TapBack index={index} tapIndex={tapIndex} />
    </TapWrapper>
  );
}

export default DetailListTap;

const TapWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TapContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  background-color: #c0c0c0;
  border-radius: 10px;
  border: 2px solid #000;
  color: #fff;
  font-size: 16px;
  letter-spacing: -0.04em;
  font-family: 'kotra';
  cursor: pointer;

  ${({ index, tapIndex }) =>
    index === tapIndex &&
    css`
      background-color: #a54e09;
    `}
`;

const TapBack = styled.div`
  position: absolute;
  top: 4px;
  width: 100%;
  height: 46px;
  background-color: #989898;
  border-radius: 10px;
  border: 2px solid #000;

  ${({ index, tapIndex }) =>
    index === tapIndex &&
    css`
      background-color: #813c05;
    `}
`;
