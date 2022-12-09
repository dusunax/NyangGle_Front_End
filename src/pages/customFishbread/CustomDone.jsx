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
    <Wrapper>
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
    </Wrapper>
  );
}

export default CustomDone;

const Wrapper = styled.div`
  overflow: hidden;
  height: 100vh;
`;

const Header = styled.header`
  padding: 20px;

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

const ContentsArea = styled.div`
  padding: 0 18px;
`;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}

  height: 100vh;
  /* justify-content: space-between; */
`;

const Contents = styled.section`
  flex: 1;
  display: flex;
  bottom: 0;
  flex-direction: column;
  align-items: center;

  overflow: hidden;
  .cat {
    height: 15vh;
    position: absolute;
    top: 42%;

    @media (max-width: 400px) {
      width: 40%;
      top: 35%;
    }
    /* @media (max-width: 350px) {
      top: -80px;
    } */
  }
`;

const FishFrame = styled.section`
  width: 100%;
  background: no-repeat top center / 110%, linear-gradient(transparent 0%, #9e9e9e 60%);
  position: relative;

  flex: 1;
  /* overflow: hidden; */
  bottom: 10%;
  z-index: 9;

  .fishFrame {
    overflow: hidden;
    width: 120%;
    bottom: 0;
  }

  @media (max-width: 600px) {
    top: -15%;
    width: 120%;
    right: 10%;
  }
  @media (max-width: 400px) {
    top: -30%;
    width: 120%;
    right: 10%;

    @media (min-height: 700px) {
      top: -28%;
    }

    @media (min-height: 800px) {
      top: -25%;
    }
  }
`;

const Fish = styled.div`
  ${({ theme }) => theme.flex.col}
  align-items: center;
  overflow: hidden;
  top: 20%;
  /* position: relative; */

  .dough_prev {
    position: absolute;
    width: 120%;
    opacity: 1;
    object-fit: cover;

    @media (max-width: 400px) {
      top: 50%;
    }
    @media (max-width: 350px) {
      top: -80px;
    }
  }
  .dough_next {
    /* overflow: hidden; */
    object-fit: cover;
    width: 120%;
    position: absolute;
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
