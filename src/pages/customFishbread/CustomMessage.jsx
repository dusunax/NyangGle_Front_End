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
              value="sooya"
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
                width: '80px',
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
  font-size: 20px;

  margin-bottom: 10vh;
`;

const Content = styled.div`
  margin: 30px 20px;
  flex-direction: column;
  font-size: 20px;
  input {
    background: transparent;
    border: none;
    margin: 0 0 10px 60px;
    padding-top: 10px;
    outline: none;
    font-size: '20px';
  }
`;

const Textbox = styled.textarea`
  width: 95%;
  height: 270px;
  resize: none;
  background: none;
  /* border: 3px solid; */
  border: none;
  font-size: 20px;
`;
