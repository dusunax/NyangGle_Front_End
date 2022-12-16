import styled from 'styled-components';
import DetailListTap from './DetailListTap';

function DetailListTaps({ onClickTap }) {
  const tapList = [
    ['전체 붕어빵', 'All'],
    ['읽은 붕어빵', 'Read'],
    ['안읽은 붕어빵', 'UnRead'],
  ];

  return (
    <DetailListTapsWrapper>
      {tapList.map((e, i) => (
        <DetailListTap
          key={`tap${i + 1}`}
          sort={e[0]}
          index={i}
          onClickTap={onClickTap}
          type={e[1]}
        />
      ))}
    </DetailListTapsWrapper>
  );
}

export default DetailListTaps;

const DetailListTapsWrapper = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;

  padding-bottom: 7%;
`;
