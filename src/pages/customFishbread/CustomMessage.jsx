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
      <Paper>
        <div className="contents_area">
          <img
            src={`../public/assets/images/customFish/paper/${imgs}.png`}
            alt="편지지"
            className="paper_image"
          />
          <div className="text_contents_area">
            <input
              className="receiveNickname"
              name="receiveNickname"
              value="{inputs.recipientNickname}"
              disabled
            />
            <textarea
              name="message"
              className="message"
              onChange={onChangeMessage}
              value={inputs.message}
              maxLength="300"
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
          </div>
        </div>
      </Paper>
    </Wrapper>
  );
}

export default CustomMessage;

const Wrapper = styled.section`
  ${({ theme }) => theme.flex.col}

  align-self: flex-end;
  width: 100%;
  flex: 1;

  position: relative;
  z-index: 9;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: -20px;
`;

const Paper = styled.div`
  width: 100%;
  flex: 1;

  padding: 0 20px;

  display: flex;
  justify-content: center;

  position: relative;

  font-size: 20px;
  text-align: center;

  .paper_image {
    max-height: 100%;
    max-width: 100%;

    object-fit: contain;
  }

  .contents_area {
    height: 100%;
    position: absolute;

    @media (max-width: 500px) {
      width: 80%;
      height: auto;
    }
  }

  .text_contents_area {
    width: 100%;
    height: 100%;
    padding: 10% 17% 18%;

    position: absolute;
    top: 0;

    display: flex;
    flex-flow: column;
    justify-content: space-between;
    gap: 16px;

    * {
      font-size: 20px;
    }

    @media (max-width: 500px) {
      padding: 10% 14% 17%;
    }
    @media (max-width: 400px) {
      padding: 10% 10% 18%;
    }
  }

  input {
    /* background-color: red !important; */
    text-shadow: -1px 0 #ffefcc, 0 1px #ffefcc, 1px 0 #ffefcc, 0 -1px #ffefcc;
  }
  textarea {
    flex: 1;

    /* background-color: blue !important; */
  }

  .receiveNickname {
    max-width: 180px;
    margin-left: 33px;

    background: none;
    border: none;

    color: black !important;
    font-size: 20px;
  }

  .message {
    border: none;
    resize: none;
    background: none;
  }

  .senderNickname {
    border: none;
    position: relative;
    font-size: 16px;
    align-self: flex-end;
    background: none;

    text-align: right;
    width: 50%;
    max-width: 180px;
  }
`;
