import { useEffect, useState } from 'react';
import styled from 'styled-components';

const typeObj = {
  밀가루: '1',
  고구마: '2',
  녹차: '3',
  초코: '4',
  팥: 'a',
  슈크림: 'b',
  마라: 'c',
  민초: 'd',
};

function DetailListItem({ data, onClickBread }) {
  const [breadType, setBreadType] = useState('bread1');
  const { fishId, type, status, senderNickname } = data;
  let [dough, sediment] = type.split('/');

  const replaceType = () => {
    Object.keys(typeObj).forEach((e) => {
      if (e === dough) dough = typeObj[e];
      if (e === sediment) sediment = typeObj[e];
    });
  };

  const setImageSrc = () => {
    status === 'UNREAD' && setBreadType(`bread${dough}`);
    status === 'READ' && setBreadType(`bread${dough}-${sediment}`);
  };

  useEffect(() => {
    replaceType();
    setImageSrc();
  });

  return (
    <ItemWrapper>
      <ItemNickname>{senderNickname}</ItemNickname>
      <ItemImage
        src={`../../../../assets/images/breadDetail/${breadType}.png`}
        onClick={() => onClickBread(fishId)}
      />
    </ItemWrapper>
  );
}

export default DetailListItem;

const ItemWrapper = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8%;
`;

const ItemNickname = styled.p`
  width: 100%;
  height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: #fff;
  border: 1.5px solid #000;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'kotra';
`;

const ItemImage = styled.img`
  width: 84%;
`;
