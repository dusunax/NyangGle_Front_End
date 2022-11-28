function DetailListTaps({ onClickTap }) {
  const tapList = [
    ['전체 붕어빵', 'All'],
    ['안읽은 붕어빵', 'UnRead'],
    ['읽은 붕어빵', 'Read'],
  ];

  return (
    <ul style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
      {tapList.map((e, i) => (
        <li key={`tap${i + 1}`} onClick={() => onClickTap(e[1])}>
          {e[0]}
        </li>
      ))}
    </ul>
  );
}

export default DetailListTaps;
