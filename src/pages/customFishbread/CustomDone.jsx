import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CustomDone({ uuid, dough }) {
  const navigate = useNavigate();
  const [doughImg, setDoughImg] = useState('');

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
    doughs.forEach((doughs) => {
      if (doughs.label === dough) {
        setDoughImg(doughs.img);
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => navigate(`/${uuid}`), 3000);
  }, []);

  return (
    <Wrapper>
      <Header>
        <p className="message">노릇노릇해지고 있다냥</p>
      </Header>
      <Main>
        {/* <div className="cat_area"> */}
        <img src="/assets/custommessage/cat4.svg" className="cat" />
        {/* </div> */}
        <Fish>
          <div className="prev_area">
            <img
              src={`/assets/images/customDone/${doughImg}1.svg`}
              alt="반죽"
              className="dough_prev"
              id="dough_prev"
            />
          </div>
          <div className="next_area">
            <img
              src={`/assets/images/customDone/${doughImg}2.svg`}
              alt="반죽"
              className="dough_next"
              id="dough_next"
            />
          </div>
        </Fish>
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
    margin: 30px 0 0;
    padding: 30px;
    background-color: #eee;
    border-radius: 14px;
    text-align: center;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;

    word-break: keep-all;
  }
`;

const Main = styled.main`
  /* height: 100vh; */
  ${({ theme }) => theme.flex.col}
  height: 100%;
  padding: 25px 0 0;
  position: relative;

  .cat {
    height: 15%;
  }
`;

const Fish = styled.div`
  flex: 1;

  background: linear-gradient(#ffffff 5%, #9e9e9e 50%);

  img {
    width: 120%;
    position: absolute;
    transform: translateX(-10%);
  }

  .prev_area {
    opacity: 1;
  }

  .next_area {
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
