import styled from 'styled-components';
import CustomDone from './CustomDone';

function CustomMessage({ inputs, onChangeMessage, onClickedSave }) {
  return (
    <div>
      {/* <Content value={inputs.message} readOnly /> */}

      <section>
        <Textbox>
          <input value="sooya" />
          <Content name="message" onChange={onChangeMessage} value={inputs.message} />
          <input
            name="senderNickname"
            onChange={onChangeMessage}
            placeholder="익명"
            value={inputs.senderNickname}
          />
        </Textbox>
      </section>
      <button onClick={onClickedSave}>확인</button>
    </div>
  );
}

export default CustomMessage;

const Content = styled.textarea`
  width: 100px;
  resize: none;
`;

const Textbox = styled.div`
  background-image: url('public/assets/custommessage/flour.svg');
  width: 349px;
  height: 486px;
`;
