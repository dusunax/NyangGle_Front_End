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
  /* position: absolute; */
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

  /* @media (max-height: 900px) {
    bottom: -20px;
  }
  @media (max-height: 700px) {
    bottom: -30px;
  } */
`;

const Paper = styled.div`
  width: 600px;
  height: 800px;
  z-index: 3;
  object-fit: cover;

  background-size: cover;
  display: flex;
  margin-top: -70px;
  text-align: center;

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
    @media (max-height: 900px) {
      width: 370px;
      height: 500px;
    }
    @media (max-height: 1000px) {
      width: 380px;
      height: 500px;
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

    /* outline: none; */
    font-size: 30px;
    position: absolute;
  }

  @media (max-width: 600px) {
    margin: 0;
  }
  @media (max-width: 400px) {
    /* width: 100%; */
    height: 80%;

    input {
      position: fixed;
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
  top: 10%;
  left: 5%;

  margin-top: 10px;

  /* @media (max-width: 1200px) {
    /* top: 50px; */
  /* height: 540px;
  } */
  @media (max-width: 600px) {
    top: 3%;
    font-size: 20px;
  }

  @media (max-width: 450px) {
    left: 5%;
  }
  @media (max-width: 400px) {
    width: 85%;
    height: 70%;
    top: -2%;
    font-size: 20px;

    @media (min-height: 800px) {
      height: 80%;
    }
    @media (min-height: 900px) {
      font-size: 20px;
    }
  }
  /* @media (max-width: 350px) {
    top: 10px;
    top: -80px;
  } */
`;

const ReceiveNickname = styled.div`
  position: absolute;

  .receiveNickname {
    position: fixed;
    top: 30%;
    left: 43%;
    width: 210px;
    font-size: 30px;
  }

  @media (max-width: 1500px) {
    .receiveNickname {
      left: 41%;
    }
  }
  @media (max-width: 1200px) {
    .receiveNickname {
      left: 38%;
    }
  }
  @media (max-width: 900px) {
    .receiveNickname {
      left: 35%;
    }
  }
  @media (max-width: 600px) {
    .receiveNickname {
      top: 32%;
      left: 32%;
      font-size: 20px;
    }
  }
  @media (max-width: 450px) {
    .receiveNickname {
      top: 35%;
      left: 25%;
      font-size: 20px;
    }
  }
  @media (max-width: 400px) {
    .receiveNickname {
      top: 42%;
      left: 27%;
    }
    @media (min-height: 700px) {
      .receiveNickname {
        top: 43%;
        left: 30%;
      }
    }
    @media (min-height: 800px) {
      .receiveNickname {
        top: 37%;
        left: 25%;
      }
    }
  }
`;

const SenderNickname = styled.div`
  /* overflow: hidden; */
  /* float: left; */
  position: absolute;

  .senderNickname {
    position: fixed;
    /* float: right; */
    /* transition: right; */
    width: 210px;
    left: 55%;
    bottom: 13%;
  }

  @media (max-width: 1400px) {
    .senderNickname {
      left: 60%;
      bottom: 12%;
    }
  }
  @media (max-width: 900px) {
    .senderNickname {
      left: 65%;
    }
  }
  @media (max-width: 700px) {
    .senderNickname {
      left: 63%;
      bottom: 10%;
      font-size: 20px;
    }
  }
  @media (max-width: 600px) {
    .senderNickname {
      left: 65%;
      bottom: 23%;
    }
  }
  @media (max-width: 450px) {
    .senderNickname {
      left: 65%;
      bottom: 23%;
    }
    @media (min-height: 800px) {
      .senderNickname {
        left: 65%;
        bottom: 15%;
      }
    }
    @media (min-height: 900px) {
      .senderNickname {
        left: 65%;
        bottom: 17%;
      }
    }
    @media (min-height: 1000px) {
      .senderNickname {
        left: 65%;
        bottom: 15%;
      }
    }
  }
  @media (max-width: 400px) {
    .senderNickname {
      left: 62%;
      bottom: 9%;
      /* left: 220px;
      width: 300px;
      bottom: 50px; */
      font-size: 20px;
    }

    @media (min-height: 600px) {
      .senderNickname {
        left: 65%;
        bottom: 8%;
      }
    }
    @media (min-height: 800px) {
      .senderNickname {
        left: 65%;
        bottom: 13%;
      }
    }
    @media (min-height: 900px) {
      .senderNickname {
        left: 65%;
        bottom: 15%;
      }
    }
  }
`;
