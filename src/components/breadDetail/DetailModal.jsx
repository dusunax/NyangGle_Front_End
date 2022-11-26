import { useCallback, useEffect, useState } from 'react';

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
