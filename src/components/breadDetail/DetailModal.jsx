import { useCallback, useEffect, useState } from 'react';

function DetailModal({ data, closeModal, id }) {
  const readingData = data.find((e) => e.id === id);
  const onClickClose = () => closeModal();

  return (
    <div>
      <div onClick={onClickClose}>닫기</div>
      {readingData.message}
      {readingData.id}
    </div>
  );
}

export default DetailModal;
