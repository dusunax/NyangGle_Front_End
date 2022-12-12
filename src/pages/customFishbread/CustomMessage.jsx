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

  @media (max-height: 1200px) {
    @media (max-width: 900px) {
      top: 5%;
      width: 370px;
      height: 480px;
    }
  }
  @media (max-height: 1000px) {
    width: 340px;
    height: 440px;
  }
  @media (max-height: 900px) {
    width: 320px;
    height: 420px;
  }
  @media (max-height: 800px) {
    width: 230px;
    height: 300px;
    @media (max-width: 400px) {
      width: 270px;
      height: 350px;
    }
  }
  @media (max-height: 700px) {
    width: 190px;
    height: 250px;
    @media (max-width: 700px) {
      width: 270px;
      height: 360px;
      top: -7%;
    }
  }
  @media (max-height: 600px) {
    width: 150px;
    height: 200px;
  }

  .receiveNickname {
    line-height: 10px;
    background: none;
    border: none;
    padding-left: 50px;
    align-items: flex-start;
    color: black !important;
    font-size: 20px;

    @media (min-height: 600px) {
      padding-left: 18px;
      font-size: 15px;
      @media (max-width: 700px) {
        padding-left: 20%;
      }
    }
    @media (min-height: 700px) {
      padding-left: 30px;
      font-size: 15px;
    }
    @media (min-height: 800px) {
      padding-left: 40px;
      font-size: 18px;
    }
  }

  .message {
    border: none;
    font-size: 20px;
    resize: none;
    width: 95%;
    height: 75%;
    background: none;
    @media (min-height: 600px) {
      font-size: 15px;
    }
  }

  .senderNickname {
    border: none;
    position: relative;
    font-size: 20px;
    align-self: flex-end;
    background: none;
    width: 120px;
    left: 2%;
    bottom: 10%;

    @media (max-width: 400px) {
      font-size: 18px;
      @media (min-height: 800px) {
        top: -6%;
        left: 2%;
        font-size: 18px;
      }
    }

    @media (min-height: 600px) {
      top: -1%;
      left: 50%;
      font-size: 15px;
      @media (max-width: 400px) {
        left: 35%;
      }
    }
    @media (min-height: 700px) {
      top: 2%;
      left: 32%;
      @media (max-width: 400px) {
        top: -3%;
      }
    }
    @media (min-height: 800px) {
      top: -6%;
      left: 15%;
      font-size: 18px;
      @media (max-width: 450px) {
        top: -3%;
      }
    }
    @media (min-height: 900px) {
      top: -6%;
      left: 10%;
      @media (max-width: 450px) {
        top: -3%;
        left: 13%;
      }
    }
  }
`;
