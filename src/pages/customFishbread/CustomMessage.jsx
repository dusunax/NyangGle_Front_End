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
        }}
      >
        <Content>
          <ReceiveNickname>
            <input className="receiveNickname" name="receiveNickname" value="sooya" disabled />
          </ReceiveNickname>
          <Textbox
            name="message"
            onChange={onChangeMessage}
            value={inputs.message}
            maxLength="500"
            placeholder="내용을 입력하세요"
          />
          <SenderNickname>
            <input
              className="senderNickname"
              name="senderNickname"
              onChange={onChangeMessage}
              placeholder="익명"
              value={inputs.senderNickname}
              maxLength="6"
            />
          </SenderNickname>
        </Content>
      </Paper>
    </Wrapper>
  );
}

export default CustomMessage;

const Wrapper = styled.section`
  ${({ theme }) => theme.flex.col}

  display: flex;
  position: relative;
  /* border: 3px solid black; */
  position: absolute;
  left: 0;
  bottom: 0;

  /* height: 70vh; */
  /* object-fit: cover; */
  @media (max-width: 1200px) {
  }
  @media (max-width: 900px) {
  }
  @media (max-width: 600px) {
  }
  @media (max-width: 400px) {
    position: absolute;
    left: 0;
    bottom: 0;
  }
  @media (max-width: 350px) {
    /* top: -80px; */
  }
  @media (max-height: 900px) {
    bottom: -20px;
  }
  @media (max-height: 700px) {
    bottom: -30px;
  }
`;

const Paper = styled.div`
  width: 700px;
  height: 1000px;
  z-index: 3;
  /* object-fit: cover; */
  /* margin: 0; */
  /* border: 3px solid black; */

  background-size: cover;
  display: flex;
  margin-top: -70px;
  text-align: center;
  /* justify-content: center; */

  @media (max-width: 1200px) {
    width: 600px;
    height: 800px;
  }
  @media (max-width: 700px) {
    width: 550px;
    height: 750px;
  }
  @media (max-width: 600px) {
    width: 450px;
    height: 650px;
  }
  @media (max-width: 450px) {
    width: 350px;
    height: 500px;
  }
  @media (max-width: 370px) {
    width: 320px;
    height: 400px;
  }
  @media (max-height: 700px) {
    width: 290px;
    height: 400px;
  }
`;

const Content = styled.div`
  margin: 80px 20px;
  display: flex;
  flex-direction: row;

  /* position: absolute; */
  flex-wrap: wrap;
  /* z-index: 1; */

  input {
    background: transparent;
    border: none;
    height: 50px;
    /* margin: 0 0 10px 60px; */
    /* padding-top: 10px; */
    /* outline: none; */
    font-size: 30px;
    position: absolute;
  }

  @media (max-width: 600px) {
    margin: 0;
  }
  @media (max-width: 400px) {
    /* width: 100%; */
    input {
      position: fixed;
      /* margin: 0 0 10px 60px; */
      font-size: 25px;
      height: 30px;
    }
  }
  @media (max-width: 350px) {
    bottom: 10px;
  }
`;

const Textbox = styled.textarea`
  width: 90%;
  height: 70%;
  resize: none;
  background: none;
  border: none;
  font-size: 35px;
  position: absolute;
  top: 80px;
  right: 30px;

  margin-top: 10px;
  /* border: 3px solid black; */

  @media (max-width: 1200px) {
    top: 50px;
    height: 540px;
  }
  @media (max-width: 900px) {
  }
  @media (max-width: 600px) {
  }
  @media (max-width: 400px) {
    width: 90%;
    height: 70%;
    top: 30px;
    right: 15px;
    font-size: 20px;
    /* top: -100px; */
  }
  @media (max-width: 350px) {
    /* top: -80px; */
  }
`;

const ReceiveNickname = styled.div`
  .receiveNickname {
    /* float: left; */
    width: 210px;
    margin-left: 120px;
    /* border: 3px solid black; */
  }

  @media (max-width: 1200px) {
    .receiveNickname {
      width: 200px;
      margin: -20px 100px;
    }
  }
  @media (max-width: 900px) {
    .receiveNickname {
      width: 200px;
      margin: -30px 90px;
    }
  }
  @media (max-width: 600px) {
    .receiveNickname {
      width: 100px;
      margin: 30px 100px;
    }
  }
  @media (max-width: 400px) {
    .receiveNickname {
      width: 100px;
      margin: 30px 70px;
      font-size: 25px;
    }
  }
  @media (max-width: 350px) {
    /* bottom: 10px; */
  }
`;
const SenderNickname = styled.div`
  /* overflow: hidden; */
  /* float: left; */
  .senderNickname {
    /* float: right; */
    /* transition: right; */
    left: 450px;
    /* clear: right; */
    width: 210px;
    bottom: 130px;
    margin-left: 0;
    /* border: 3px solid black; */
  }

  @media (max-width: 1200px) {
    .receiveNickname {
      left: 200px;
      bottom: 70px;
      /* right: -200px; */
      /* left: 370px; */
      /* position: relative; */
    }
  }

  @media (max-width: 600px) {
    .receiveNickname {
      width: 100px;
      margin: 0;
    }
  }
  @media (max-width: 400px) {
    .senderNickname {
      left: 200px;
    }
  }
`;
