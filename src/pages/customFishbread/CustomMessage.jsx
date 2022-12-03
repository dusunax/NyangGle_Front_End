import { waitForNone } from 'recoil';
import styled from 'styled-components';
import CustomDone from './CustomDone';
import { useState, useEffect, useMemo } from 'react';

function CustomMessage({ inputs, onChangeMessage, onClickedSave }) {
  const [imgs, setImgs] = useState('flour');

  const doughs = [
    {
      label: '밀가루',
      img: 'flour',
    },
    {
      label: '초코',
      img: 'choco',
    },
    {
      label: '고구마',
      img: 'sweetpotato',
    },
    {
      label: '녹차',
      img: 'green',
    },
  ];

  useEffect(() => {
    doughs.map((dough) => {
      if (dough.label === inputs.dough) {
        console.log(dough.label);
        setImgs(dough.img);
        console.log(dough.img);
      }
    });
  }, []);

  return (
    <div>
      {/* <Content value={inputs.message} readOnly /> */}

      <section style={{ display: 'flex', padding: '10px', position: 'relative' }}>
        <Paper
          style={{
            backgroundImage: `url("/assets/custommessage/${imgs}.svg")`,
          }}
        >
          <Content>
            <input
              className="receiveNickname"
              name="receiveNickname"
              value="소금빵"
              style={{ float: 'left' }}
              disabled
            />
            <Textbox
              name="message"
              onChange={onChangeMessage}
              value={inputs.message}
              maxLength="500"
            />
            <input
              name="senderNickname"
              onChange={onChangeMessage}
              placeholder="익명"
              value={inputs.senderNickname}
              maxLength="6"
              style={{
                float: 'right',
                width: '90px',
              }}
            />
          </Content>
        </Paper>
      </section>
      {/* <button onClick={onClickedSave}>확인</button> */}
    </div>
  );
}

export default CustomMessage;

const Paper = styled.div`
  background-size: cover;
  display: flex;
  width: 300px;
  height: 400px;
  bottom: 30vh;
  margin: auto;
  margin-top: -50px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  margin-bottom: 10vh;
`;

const Content = styled.div`
  flex-direction: column;
  font-size: 20px;
  width: 90%;
  height: 90%;
  input {
    background: transparent;
    border: none;
    margin: 0 0 10px 54px;
    padding-top: 6px;
    outline: none;
    font-size: 20px;
  }
`;

const Textbox = styled.textarea`
  width: 95%;
  margin-top: 8px;
  height: 260px;
  resize: none;
  background: none;
  /* border: 3px solid; */
  border: none;
  font-size: 20px;
`;
