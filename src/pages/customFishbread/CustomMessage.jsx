import { waitForNone } from 'recoil';
import styled from 'styled-components';
import CustomDone from './CustomDone';
import { useState, useEffect, useMemo } from 'react';

function CustomMessage({ inputs, onChangeMessage }) {
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
    <Wrapper>
      <Paper
        style={{
          backgroundImage: `url("/assets/custommessage/${imgs}.svg")`,
        }}
      >
        <input
          className="receiveNickname"
          name="receiveNickname"
          value={inputs.recipientNickname}
          disabled
        />
        <textarea
          name="message"
          className="message"
          onChange={onChangeMessage}
          value={inputs.message}
          maxLength="500"
          placeholder="내용을 입력하세요"
        />
        <input
          className="senderNickname"
          name="senderNickname"
          onChange={onChangeMessage}
          placeholder="익명"
          value={inputs.senderNickname}
          maxLength="6"
        />
      </Paper>
    </Wrapper>
  );
}

export default CustomMessage;

const Wrapper = styled.section`
  ${({ theme }) => theme.flex.col}

  display: flex;
  position: relative;
  left: 0;
  bottom: 0;

  /* object-fit: cover; */
  @media (max-width: 600px) {
    bottom: -30px;
  }
  @media (max-width: 400px) {
    bottom: -25px;
  }
  @media (max-width: 300px) {
    bottom: -40px;
  }
`;

const Paper = styled.div`
  width: 350px;
  height: 490px;
  display: flex;
  justify-content: space-between;
  padding: 10% 10%;
  flex-direction: column;
  position: relative;
  font-size: 20px;
  background-size: cover;

  margin-top: -15%;
  text-align: center;

  @media (max-width: 999px) {
    width: 470px;
    height: 650px;
  }
  @media (max-width: 600px) {
    width: 460px;
    height: 650px;
  }
  @media (max-width: 450px) {
    width: 400px;
    height: 550px;
  }

  @media (max-width: 400px) {
    width: 380px;
    height: 550px;
    @media (min-height: 800px) {
      height: 530px;
    }
  }
  @media (max-width: 370px) {
    width: 320px;
    height: 420px;
  }
  @media (max-height: 700px) {
    width: 300px;
    height: 400px;
  }

  .receiveNickname {
    line-height: 10px;
    background: none;
    border: none;
    padding-left: 50px;
    align-items: flex-start;
    font-size: 25px;
  }

  .message {
    border: none;
    font-size: 25px;
    resize: none;
    width: 95%;
    height: 75%;
    background: none;
  }

  .senderNickname {
    border: none;
    position: relative;
    font-size: 25px;
    align-self: flex-end;
    background: none;
    width: 100px;
    left: 2%;
    bottom: 10%;

    @media (min-height: 600px) {
      top: -3%;
      left: 10%;
    }
    @media (min-height: 700px) {
      top: 0%;
      left: 10%;
    }
    @media (min-height: 700px) {
      top: -5%;
      left: 10%;
    }
    @media (min-height: 900px) {
      top: -5%;
      left: 10%;
    }
  }
`;
