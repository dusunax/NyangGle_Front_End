import { useCallback, useEffect, useState } from 'react';

const BREAD_DATA = {
  Type: '팥/앙금',
  message: 'string',
  createdAt: '',
  senderNickname: 'nick1'
}

function DetailModal({ data, closeModal }) {
    
  const onClickClose = () => closeModal();

  return (
    <div>
      <div onClick={onClickClose}>닫기</div>
      {data.message}
    </div>
  );
}

export default DetailModal;
