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

  setTimeout(() => navigate('/U184bdf21eb90001'), 3000);

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
  overflow: hidden;
  top: 20px;
  /* position: relative; */

  .dough_prev {
    overflow-x: hidden;
    overflow-y: hidden;
    position: absolute;
    /* top: 120px; */
    /* bottom: -13vw; */
    width: 1000px;
    /* height: 300px */
    opacity: 1;
    object-fit: cover;
  }
  .dough_next {
    overflow-x: hidden;
    overflow-y: hidden;
    overflow: hidden;
    object-fit: cover;
    width: 1000px;
    /* top: 120px; */
    position: absolute;
    /* bottom: -13vw; */
    opacity: 0;
    animation: fadeIn 2s 0.2s forwards;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const FishFrame = styled.section`
  width: 100%;
  /* height: 60vh; */
  background: no-repeat top center / 110%, linear-gradient(transparent 0%, #9e9e9e 60%);
  position: relative;

  flex: 1;
  /* background: linear-gradient(0, #8c8c8c, transparent); */
  overflow: hidden;
  bottom: 6vw;
  z-index: 9;
  .fishFrame {
    overflow: hidden;
    width: 120%;
    bottom: 0;
  }
`;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}

  height: 100vh;
  /* justify-content: space-between; */
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
  display: flex;
  bottom: 0;
  /* justify-content: flex-end;
  align-items: center;
  position: relative; */
  flex-direction: column;
  align-items: center;
  /* position: relative; */
  overflow: hidden;
  .cat {
    /* width: 70%; */
    /* max-width: 188px; */
    height: 15vh;
    position: absolute;
    top: 600px;

    @media (max-width: 400px) {
      width: 40%;
      top: -100px;
    }
    @media (max-width: 350px) {
      top: -80px;
    }
  }
`;
