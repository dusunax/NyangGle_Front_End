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
    <Wrapper style={{ display: 'flex', position: 'relative' }}>
      <Paper
        style={{
          backgroundImage: `url("/assets/custommessage/${imgs}.svg")`,
          zIndex: '3',
          objectFit: 'cover',
          margin: '0',
        }}
      >
        <Content>
          <input
            className="receiveNickname"
            name="receiveNickname"
            value="sooya"
            style={{ float: 'left', marginLeft: '100px' }}
            disabled
          />
          <Textbox
            name="message"
            onChange={onChangeMessage}
            value={inputs.message}
            maxLength="500"
            style={{ marginTop: '10px' }}
          />
          <input
            name="senderNickname"
            onChange={onChangeMessage}
            placeholder="익명"
            value={inputs.senderNickname}
            maxLength="6"
            style={{
              float: 'right',
              width: '120px',
              marginLeft: '0',
            }}
          />
        </Content>
      </Paper>
    </Wrapper>
  );
}

export default CustomMessage;

const Wrapper = styled.section`
  ${({ theme }) => theme.flex.col}

  height: 70vh;
  /* justify-content: space-between; */
  object-fit: cover;
`;

const Paper = styled.div`
  background-size: cover;
  display: flex;
  width: 470px;
  height: 610px;
  margin: auto;
  margin-top: -50px;
  text-align: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 10vh;
`;

const Content = styled.div`
  margin: 30px 20px;
  bottom: 100px;
  flex-direction: column;
  font-size: 20px;
  input {
    background: transparent;
    border: none;
    margin: 0 0 10px 60px;
    padding-top: 10px;
    outline: none;
    font-size: 30px;
  }
`;

const Textbox = styled.textarea`
  width: 95%;
  height: 435px;
  resize: none;
  background: none;
  border: none;
  font-size: 30px;
`;
