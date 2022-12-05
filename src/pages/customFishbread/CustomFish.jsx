import CustomMessage from './CustomMessage';
import CustomDone from './CustomDone';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import styled from 'styled-components';
// import img from '../../../public/assets/customfish/';

function CustomFish({ countUp, setCountUp }) {
  const navigate = useNavigate();
  const { requestApi } = useAxios();
  const tabs = ['붕어빵 커스텀', '메세지 작성'];
  const [isActiveTab, setIsActiveTab] = useState(tabs[0]);
  const [message, setMessage] = useState('앙금을 고르라냥');
  const [inputs, setInputs] = useState({
    dough: '밀가루',
    message: '',
    sediment: '',
    senderIp: '',
    senderNickname: '',
  });
  const [imgs, setImgs] = useState({
    dough: 'flour',
    cat: 'cat1',
    message: 'flour',
    sediment: '',
  });
  const [isDone, setIsDone] = useState(false);

  // 저장
  const onClickSave = async () => {
    console.log(!!!inputs.message);
    console.log(inputs.message);

    if (!!!inputs.message) {
      setMessage('내용을 입력해 주라냥');

      return;
    }

    const { status } = await requestApi('post', `/fishbread/U184bdf21eb90001`, {
      message: inputs.message,
      type: `${inputs.dough}/${inputs.sediment}`,
      // senderIp: inputs.senderIp,
      senderNickname: inputs.senderNickname ? inputs.senderNickname : '익명',
    });

    setCountUp(countUp + 1);
    setIsDone(true);
  };

  /**
   * @param {'붕어빵 커스텀' | '메세지 작성'} tab
   * @param {'prev' | 'next'} direction
   */

  // 화살표 선택 시
  const onClickNav = (tab, direction) => {
    console.log(tab === '메시지 작성', direction);
    if (tab === '메세지 작성' && direction === 'next') {
      console.log('넘어가자냥');
      onClickSave();
      // setIsDone(true);
    }

    if (tab === '붕어빵 커스텀') {
      if (direction === 'prev') {
        if (window.confirm('붕어빵 만들기를 취소하시겠습니까?')) {
          navigate('/U184bdf21eb90001');
        }
      } else {
        if (!!!inputs.sediment) {
          setMessage('앙금 먼저 고르라냥!');
          return;
        }
        setIsActiveTab(tabs[1]);
        setMessage('붕어빵에 전하고 싶은 말을 적으라냥');
        setImgs((prev) => ({
          ...prev,
          cat: 'cat3',
        }));
      }
    } else {
      if (direction === 'prev') {
        setIsActiveTab(tabs[0]);
      } else {
        console.log('다음');
      }
    }
  };

  // 반죽/앙금 선택 시
  const onClickType = (type, value) => {
    // 메세지 변경
    if (type === 'dough' && !!!inputs.sediment) {
      setMessage('앙금을 고르라냥');
    } else {
      setMessage('다 골랐으면 편지 쓰러 가보자냥');
    }

    // 이미지 변경
    setImgs((prev) => ({
      ...prev,
      [type]: value.img,
      cat: 'cat2',
    }));

    // inputs 변경
    setInputs((prev) => ({
      ...prev,
      [type]: value.label,
    }));
  };

  // 닉네임, 메세지 작성
  const onChangeMessage = (e) => {
    const { value, name } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ip 가져오기
  const getSenderIp = async () => {
    const { data, status } = await requestApi('get', 'https://api.ipify.org?format=json');

    if (status >= 200 && status < 400) {
      setInputs((prev) => ({
        ...prev,
        // senderIp: data.ip,
      }));
    }
  };

  useEffect(() => {
    getSenderIp();
  }, []);

  console.log(tabs);

  return isDone ? (
    <CustomDone dough={inputs.dough} />
  ) : (
    <Main>
      <Header>
        <ContentsArea>
          {tabs.map((tab, idx) => {
            if (isActiveTab === tab) {
              return (
                <section className="btns" key={tab}>
                  <LeftBtn onClick={() => onClickNav(tabs[idx], 'prev')} />
                  <RightBtn
                    onClick={() => {
                      onClickNav(tab, 'next');
                    }}
                  />
                </section>
              );
            }
          })}
          <p className="message">{message}</p>
        </ContentsArea>
      </Header>
      <Contents>
        <img
          src={`/assets/customfish/${imgs.cat}.svg`}
          alt="고양이"
          className={imgs.cat === 'cat3' ? 'cat heart' : 'cat'}
        />
        {isActiveTab === tabs[0] && (
          <FishFrame>
            <Fish>
              <img src={`/assets/customfish/${imgs.dough}.svg`} alt="반죽" className="dough" />
              {imgs.sediment && (
                <img
                  src={`/assets/customfish/${imgs.sediment}.svg`}
                  alt="앙금"
                  className="sediment"
                />
              )}
            </Fish>
            <img src="/assets/customfish/fishframe.svg" className="fishFrame" />
            <Types>
              <article>
                {doughs.map((dough) => (
                  <button key={dough.label} onClick={() => onClickType('dough', dough)}>
                    <img src={`/assets/customfish/d_${dough.img}.svg`} />
                    {dough.label} 반죽
                  </button>
                ))}
              </article>
              <article>
                {sediments.map((sediment) => (
                  <button key={sediment.label} onClick={() => onClickType('sediment', sediment)}>
                    <img src={`/assets/customfish/s_${sediment.img}.svg`} />
                    {sediment.label} 앙금
                  </button>
                ))}
              </article>
            </Types>
          </FishFrame>
        )}
        {isActiveTab === tabs[1] && (
          <CustomMessage
            inputs={inputs}
            onChangeMessage={onChangeMessage}
            onClickSave={onClickSave}
          />
        )}
      </Contents>
    </Main>
  );
}

export default CustomFish;

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
    img: 'greentea',
  },
];

const sediments = [
  {
    label: '팥',
    img: 'redbeen',
  },
  {
    label: '슈크림',
    img: 'custard',
  },
  {
    label: '마라',
    img: 'mara',
  },
  {
    label: '민초',
    img: 'mincho',
  },
];

const ContentsArea = styled.div`
  padding: 0 18px;
`;

const Main = styled.main`
  ${({ theme }) => theme.flex.col}

  height: 100vh;
  justify-content: space-between;
`;

const LeftBtn = styled.button`
  background: none;
  background: url('/assets/customfish/leftBtn.svg') no-repeat;
  background-size: cover;
  width: 36.25px;
  height: 32.5px;
  border: none;
`;

const RightBtn = styled(LeftBtn)`
  background-image: url('/assets/customfish/rightBtn.svg');
`;

const Header = styled.header`
  padding-top: 20px;

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
  ${({ theme }) => theme.flex.col}

  justify-content: flex-end;
  align-items: center;

  position: relative;

  .cat {
    width: 50%;
    max-width: 188px;
    position: absolute;
    top: -120px;

    @media (max-width: 400px) {
      width: 40%;
      top: -100px;
    }

    @media (max-width: 350px) {
      top: -80px;
    }
  }
  .cat.heart {
    top: -120px;
  }
`;

const FishFrame = styled.section`
  width: 100%;
  /* max-width: 80% */
  height: 60vh;
  /* background: linear-gradient(transparent, #8c8c8c); */
  background: url('/assets/customfish/fishframe_wide.png') no-repeat top center / 110%,
    linear-gradient(transparent 40%, #9e9e9e 40%);

  z-index: 9;

  /* 
  ::after {
    content: '~~';
    background-color: red;
    width: 100%;
    height: 100%;
    position: absolute;
  } */

  .fishFrame {
    width: 100%;
    bottom: 0;

    /* margin-bottom: 10vh; */
  }
`;

const Fish = styled.div`
  ${({ theme }) => theme.flex.col}
  align-items: center;

  img,
  .dough,
  .sediment {
    width: 27%;

    position: absolute;
    top: 15%;
    transform: translateX(6%);
  }

  .sediment {
    width: 12%;
    transform: translate(0%, 44%);
  }

  @media (max-width: 580px) {
    .dough {
      top: 8.5%;
    }
    .sediment {
      width: 12%;
      top: 8.5%;
    }
  }
`;

const Types = styled.section`
  ${({ theme }) => theme.flex.row}
  width: 100%;

  padding: 0 16px;

  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0);

  article {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 10px;
    padding: 10px;
    background-color: #fff;
    border: 2px solid #191919;
    border-radius: 15px;

    @media (max-width: 580px) {
      grid-template-columns: 1fr 1fr;
    }

    button {
      ${({ theme }) => theme.flex.col}
      align-items: center;
      background: none;
      border: none;

      word-break: keep-all;
      font-weight: 600;
      font-size: 12px;

      img {
        margin-bottom: 5px;
      }
    }

    &:first-child {
      margin-right: 10px;
    }
  }
`;
