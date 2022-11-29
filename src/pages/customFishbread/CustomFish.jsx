import CustomMessage from './CustomMessage';
import CustomDone from './CustomDone';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import styled from 'styled-components';

function CustomFish() {
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
    if (!!!inputs.message) {
      setMessage('내용을 입력해 주라냥');
      return;
    }

    const { status } = await requestApi('post', `/fishbread/U18414f5037a0001`, {
      message: inputs.message,
      type: `${inputs.dough}/${inputs.sediment}`,
      senderIp: inputs.senderIp,
      senderNickname: inputs.senderNickname ? inputs.senderNickname : '익명',
    });

    if (status === 201) {
      setIsDone(true);
    }
  };

  /**
   * @param {'붕어빵 커스텀' | '메세지 작성'} tab
   * @param {'prev' | 'next'} direction
   */

  // 화살표 선택 시
  const onClickNav = (tab, direction) => {
    if (tab === '붕어빵 커스텀') {
      if (direction === 'prev') {
        if (window.confirm('붕어빵 만들기를 취소하시겠습니까?')) {
          navigate('/');
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
        console.log('다음')
        onClickSave();
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
        senderIp: data.ip,
      }));
    }
  };

  useEffect(() => {
    getSenderIp();
  }, []);

  console.log(inputs);

  return isDone ? (
    <CustomDone />
  ) : (
    <Main>
      <Header>
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
      </Header>
      <Contents>
        <img src={`/assets/customfish/${imgs.cat}.svg`} alt="고양이" className="cat" />
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

const FishFrame = styled.section`
  flex: 1;
  width: 100%;
  background: linear-gradient(#fff, #8c8c8c);

  .dough,
  .sediment {
    position: absolute;
    transform: translate(5px, 31vh);
    z-index: 9;
  }

  .dough {
    width: 16vh;
  }

  .fishFrame {
    width: 100%;
    transform: translate(0, 110px);
  }
`;

const Fish = styled.div`
  ${({ theme }) => theme.flex.col}
  align-items: center;
  justify-content: center;
`;

const Types = styled.section`
  width: calc(100% - 40px);
  ${({ theme }) => theme.flex.row}
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0);

  article {
    width: calc(50vw);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 10px;
    background-color: #fff;
    border: 2px solid #191919;
    border-radius: 15px;

    button {
      ${({ theme }) => theme.flex.col}
      align-items: center;
      background: none;
      border: none;

      img {
        margin-bottom: 5px;
      }
    }

    &:first-child {
      margin-right: 10px;
    }
  }
`;
