import styled from 'styled-components';
import CustomMessage from './CustomMessage';
import CustomDone from './CustomDone';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { useRecoilValue } from 'recoil';
import { fishCartState } from '../../atoms/fishCartData';

function CustomFish({ countUp, setCountUp }) {
  const navigate = useNavigate();
  // 받는 사람
  const recipient = useRecoilValue(fishCartState);
  const { requestApi } = useAxios();
  const tabs = ['커스텀', '메세지', '완성'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [inputs, setInputs] = useState({
    dough: '밀가루',
    message: '',
    recipientNickname: recipient.nickname,
    sediment: '',
    senderNickname: '',
  });
  const [imgs, setImgs] = useState({
    dough: 'flour',
    cat: 'cat1',
    message: 'flour',
    sediment: '',
  });
  const [message, setMessage] = useState('앙금을 고르라냥');

  // 저장
  const onClickSave = async () => {
    if (!!!inputs.message) {
      setMessage('내용을 입력해 주라냥');
      return;
    }

    const { status } = await requestApi('post', `/fishbread/${recipient.uuid}`, {
      message: inputs.message,
      type: `${inputs.dough}/${inputs.sediment}`,
      senderNickname: inputs.senderNickname ? inputs.senderNickname : '익명',
    });

    if (status >= 200 && status < 400) {
      setCountUp(countUp + 1);
      setActiveTab(tabs[2]);
    }
  };

  /**
   * @param {'커스텀' | '메세지'} tab
   * @param {'prev' | 'next'} direction
   */

  // 화살표 선택 시
  const onClickNav = (tab, direction) => {
    // 커스텀 페이지 이전 버튼 클릭 시
    if (tab === '커스텀' && direction === 'prev') {
      if (window.confirm('붕어빵 만들기를 취소하시겠습니까?')) {
        navigate(`/${recipient.uuid}`);
      }
    }

    // 커스텀 페이지 다음 버튼 클릭 시
    if (tab === '커스텀' && direction === 'next') {
      if (!!!inputs.sediment) {
        setMessage('앙금 먼저 고르라냥!');
        return;
      }
      setActiveTab(tabs[1]);
      setMessage('붕어빵에 전하고 싶은 말을 적으라냥');
      setImgs((prev) => ({
        ...prev,
        cat: 'cat3',
      }));
    }

    // 메세지 페이지 이전 버튼 클릭 시
    if (tab === '메세지' && direction === 'prev') {
      setActiveTab(tabs[0]);
    }

    // 메세지 페이지 다음 버튼 클릭 시
    if (tab === '메세지' && direction === 'next') {
      if (!!!inputs.message) {
        setMessage('메세지 작성을 해달라냥');
        return;
      }
      onClickSave();
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

  // 닉네임, 메세지 작성 시
  const onChangeMessage = (e) => {
    const { value, name } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return activeTab === tabs[2] ? (
    <CustomDone dough={inputs.dough} />
  ) : (
    <Main>
      <Header>
        <ContentsArea>
          {tabs.map((tab, idx) => {
            if (activeTab === tab) {
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
        <img src={`/assets/customfish/${imgs.cat}.svg`} alt="고양이" className="cat" />
        {imgs.sediment && (
          <img src={`/assets/customfish/${imgs.sediment}.svg`} alt="앙금" className="sediment" />
        )}
        {activeTab === tabs[0] && (
          <FishFrame>
            <img src={`/assets/customfish/${imgs.dough}.svg`} alt="반죽" className="dough" />
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
        {activeTab === tabs[1] && (
          <CustomMessage inputs={inputs} onChangeMessage={onChangeMessage} />
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
    padding: 15px;
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
  flex-direction: column;
  align-items: center;

  .cat {
    height: 15%;
  }

  .dough {
    height: 100%;
  }

  .sediment {
    height: 11%;
    position: absolute;
    bottom: 30%;
  }

  @media (min-width: 500px) and (max-width: 1000px) {
    .dough {
      height: 90%;
    }
  }
  @media (max-width: 500px) {
    .sediment {
      bottom: 42%;
    }
  }
`;

const FishFrame = styled.section``;

const Types = styled.section`
  ${({ theme }) => theme.flex.row}
  width: 100%;
  padding: 0 10px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);

  article {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 5px;
    padding: 5px;
    background-color: #fff;
    border: 2px solid #191919;
    border-radius: 15px;
    grid-template-columns: 1fr 1fr;

    @media (max-width: 600px) {
      bottom: 30%;
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
