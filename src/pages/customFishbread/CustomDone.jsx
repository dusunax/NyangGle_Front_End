import { useEffect, useState } from 'react';
import styled from 'styled-components';

function CustomDone({ dough }) {
  console.log(dough);

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
    doughs.map((doughs) => {
      if (doughs.label === dough) {
        console.log(doughs.label);
        setImgs(doughs.img);
        console.log(doughs.img);
      }
    });
  }, []);

  return (
    <div>
      <Header>
        <p className="message">노릇노릇해지고 있다냥</p>
      </Header>
      <Main>
        <Contents>
          <img src="/assets/custommessage/cat4.svg" className="cat" />
        </Contents>
        <FishFrame>
          <Fish>
            <img
              src={`/assets/custommessage/${imgs}1.svg`}
              alt="반죽"
              className="dough_prev"
              id="dough_prev"
            />
            <img
              src={`/assets/custommessage/${imgs}12.svg`}
              alt="반죽"
              className="dough_next"
              id="dough_prev"
            />
          </Fish>

          <img src="/assets/custommessage/frame.svg" className="fishFrame" />
        </FishFrame>
      </Main>
    </div>
  );
}

export default CustomDone;

const Fish = styled.div`
  ${({ theme }) => theme.flex.col}
  align-items: center;
  justify-content: center;

  .dough_prev {
    position: absolute;
    transform: translate(5px, 31vh);
    opacity: 1;
    animation: fadeout 2s 0.2s forwards;
    z-index: 9;
  }
  .dough_next {
    position: absolute;
    transform: translate(5px, 31vh);
    opacity: 1;
    animation: fadeIn 2s 0.2s forwards;
    z-index: 9;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const FishFrame = styled.section`
  flex: 1;
  width: 100%;
  background: linear-gradient(#fff, #8c8c8c);

  .fishFrame {
    position: absolute;
    width: 768px;
    transform: translate(0, 110px);
  }
`;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}
`;

const Header = styled.header`
  padding: 20px;

  .btns {
    ${({ theme }) => theme.flex.row}
    align-items: center;
    justify-content: space-between;
  }

  .message {
    margin: 30px 0;
    padding: 30px;
    background-color: #eee;
    border-radius: 15px;
    text-align: center;
  }
`;

const Contents = styled.section`
  flex: 1;
  ${({ theme }) => theme.flex.col}
  align-items: center;
  position: relative;

  .cat {
    width: 150px;
    position: absolute;
  }
`;
