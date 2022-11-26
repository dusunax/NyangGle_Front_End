import styled from 'styled-components';
import CustomDone from './CustomDone';

function CustomMessage({ inputs, onChangeMessage, onClickedSave }) {
  return (
    <div>
      <Content name="content" onChange={onChangeMessage} value={inputs.content} />
      <input
        name="nickname"
        onChange={onChangeMessage}
        placeholder="익명"
        value={inputs.nickname}
      />

      <Content value={inputs.content} readOnly />

      <button onClick={onClickedSave}>확인</button>
    </div>
  );
}

export default CustomMessage;

const Content = styled.textarea`
  width: 100px;
  resize: none;
`;
