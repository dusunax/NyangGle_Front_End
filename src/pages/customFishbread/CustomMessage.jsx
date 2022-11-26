import styled from 'styled-components';
import CustomDone from './CustomDone';

function CustomMessage({ inputs, onChangeMessage }) {
  return (
    <div>
      <Content name="content" onChange={onChangeMessage} />
      <input name="nickname" onChange={onChangeMessage} />

      <Content value={inputs.content} readOnly />
    </div>
  );
}

export default CustomMessage;

const Content = styled.textarea`
  width: 100px;
  resize: none;
`;
