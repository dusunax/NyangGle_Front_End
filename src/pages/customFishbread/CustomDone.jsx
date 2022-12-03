import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CustomDone({ dough }) {
  const navigate = useNavigate();
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

  // setTimeout(() => navigate('/U184bdf21eb90001'), 3000);

  return (
    <div>
      <Header>
        <ContentsArea>
          <p className="message">노릇노릇해지고 있다냥</p>
        </ContentsArea>
      </Header>
      <Main>
        <Contents>
          <img src="/assets/custommessage/cat4.svg" className="cat" />
        </Contents>
        <FishFrame>
          <img src="/assets/customfish/fishframe.svg" className="fishFrame" />
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
        </FishFrame>
      </Main>
    </div>
  );
}

export default CustomDone;

const ContentsArea = styled.div`
  padding: 0 18px;
`;

const Fish = styled.div`
  ${({ theme }) => theme.flex.col}
  align-items: center;

  .dough_prev {
    position: absolute;
    right: 42.5%;
    width: 250px;
    top: 61.5%;
    opacity: 1;
    animation: fadeout 2s 0.2s forwards;
    z-index: 9;
  }
  .dough_next {
    position: absolute;
    right: 42.5%;
    width: 250px;
    top: 61.5%;
    opacity: 0;
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
  width: 100%;
  height: 60vh;
  /* background: linear-gradient(transparent, #8c8c8c); */
  background: url('./assets/customfish/fishframe_wide.png') no-repeat top center / 110%,
    linear-gradient(transparent 40%, #9e9e9e 40%);
  z-index: 9;
  .fishFrame {
    width: 100%;
    bottom: 0;
    margin-bottom: 10vh;
  }
`;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}
  height: 100vh;
  justify-content: space-between;
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
    border-radius: 14px;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    word-break: keep-all;
  }
`;

const Contents = styled.section`
  flex: 1;
  ${({ theme }) => theme.flex.col}
  justify-content: flex-end;
  align-items: center;
  position: relative;
  .cat {
    /* width: 70%; */
    /* max-width: 188px; */
    position: absolute;
    top: 400px;
    @media (max-width: 400px) {
      width: 40%;
      top: -100px;
    }
    @media (max-width: 350px) {
      top: -80px;
    }
  }
`;
