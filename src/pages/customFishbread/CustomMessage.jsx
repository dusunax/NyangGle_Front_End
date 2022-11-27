import styled from 'styled-components';
import CustomDone from './CustomDone';

function CustomMessage({ inputs, onChangeMessage, onClickedSave }) {
  return (
    <div>
      <Content name="message" onChange={onChangeMessage} value={inputs.message} />
      <input
        name="senderNickname"
        onChange={onChangeMessage}
        placeholder="익명"
        value={inputs.senderNickname}
      />

      <Content value={inputs.message} readOnly />

      <button onClick={onClickedSave}>확인</button>
    </div>
  );
}

export default CustomMessage;

const Content = styled.textarea`
  width: 100px;
  resize: none;
`;
