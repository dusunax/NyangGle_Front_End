import CustomMessage from './CustomMessage';
import CustomDone from './CustomDone';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import styled from 'styled-components';

function CustomFish() {
  const navigate = useNavigate();
  const { requestApi } = useAxios();
  const tabs = ['customFish', 'customMessage'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [inputs, setInputs] = useState({
    dough: '밀가루',
    message: '',
    sediment: '',
    senderIp: '',
    senderNickname: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imgs, setImgs] = useState({
    dough: 'flour',
    cat: '',
    message: 'flour',
    sediment: '',
  });
  const [message, setMessage] = useState('앙금을 고르라냥');

  // 커스텀 반죽/앙금 선택
  const onClcikCustom = (type, value) => {
    if (type === 'dough' && !!!inputs.sediment) {
      setMessage('앙금을 고르라냥');
    } else {
      setMessage('다 골랐으면 편지쓰러 가보자냥');
    }

    setImgs((prev) => ({
      ...prev,
      [type]: value.img,
    }));
    setInputs((prev) => ({
      ...prev,
      [type]: value.label,
    }));
  };

  // 닉네임, 컨텐츠 작성
  const onChangeMessage = (e) => {
    const { value, name } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 뒤로 나가기
  const exitCustomPage = () => {
    if (window.confirm('붕어빵 만들기를 취소하시겠습니까?')) {
      navigate('/');
    }
  };

  // 초기화
  const onClickReset = () => {
    setInputs({ dough: '밀가루', sediment: '', senderNickname: '', message: '' });
  };

  // 저장
  const onClickedSave = async () => {
    if (inputs.content === '') {
      alert('내용을 입력해주세요');
      return;
    }

    setIsLoading(true);

    const { status } = await requestApi('post', `/fishbread/U18414f5037a0001`, {
      message: inputs.message,
      type: `${inputs.dough}/${inputs.sediment}`,
      senderIp: inputs.senderIp,
      senderNickname: inputs.senderNickname ? inputs.senderNickname : '익명',
    });

    if (status === 201) {
      navigate('/');
    }
  };

  // ip 가져오기
  const getIp = async () => {
    const { data, status } = await requestApi('get', 'https://api.ipify.org?format=json');
    if (status >= 200 && status < 400) {
      setInputs((prev) => ({
        ...prev,
        senderIp: data.ip,
      }));
    }
  };

  useEffect(() => {
    getIp();
  }, []);

  return isLoading ? (
    <CustomDone />
  ) : (
    <Main>
      <Header>
        {activeTab === tabs[0] && (
          <>
            <ArrowBtn onClick={exitCustomPage} />
            <Rightbtn
              type="button"
              onClick={() => {
                setActiveTab(tabs[1]);
                setMessage('붕어빵에 전하고 싶은 말을 적어라냥');
              }}
            />
          </>
        )}
        {activeTab === tabs[1] && <ArrowBtn type="button" onClick={() => setActiveTab(tabs[0])} />}
        <h1>{message}</h1>
      </Header>
      <Contents>
        {activeTab === tabs[0] && (
          <div>
            <FishFrame>
              <img src={`/assets/customfish/${imgs.dough}.svg`} alt="반죽" />
              {imgs.sediment && <img src={`/assets/customfish/${imgs.sediment}.svg`} alt="앙금" />}
              <img
                src="/assets/customfish/fishframe.svg"
                // style={{
                //   position: 'absolute',
                //   width: '100%',
                //   left: '0',
                //   top: '50%',
                //   transform: 'translate(0, -25%)',
                //   zIndex: '2',
                // }}
              />
              {/* <img
              src="/assets/customfish/bottom.svg"
              // style={{
              //   position: 'absolute',
              //   width: '100%',
              //   left: '0',
              //   bottom: '0',
              // }}
            /> */}
            </FishFrame>
            <Types>
              <div>
                {doughs.map((dough) => (
                  <button
                    type="button"
                    key={dough.label}
                    onClick={() => onClcikCustom('dough', dough)}
                  >
                    <img src={`/assets/customfish/d_${dough.img}.svg`} />
                    {dough.label}
                  </button>
                ))}
              </div>
              <div>
                {/* <button onClick={onClickReset}>reset</button> */}
                {sediments.map((sediment) => (
                  <button
                    type="button"
                    key={sediment.label}
                    onClick={() => onClcikCustom('sediment', sediment)}
                  >
                    <img src={`/assets/customfish/s_${sediment.img}.svg`} />
                    {sediment.label}
                  </button>
                ))}
              </div>
            </Types>
          </div>
        )}
        {activeTab === tabs[1] && (
          <CustomMessage
            inputs={inputs}
            onChangeMessage={onChangeMessage}
            onClickedSave={onClickedSave}
          />
        )}
      </Contents>
    </Main>
  );
}

export default CustomFish;

const doughs = [
  {
    label: '밀가루 반죽',
    img: 'flour',
  },
  {
    label: '초코 반죽',
    img: 'choco',
  },
  {
    label: '고구마 반죽',
    img: 'sweetpotato',
  },
  {
    label: '녹차 반죽',
    img: 'greentea',
  },
];
const sediments = [
  {
    label: '팥 앙금',
    img: 'redbeen',
  },
  {
    label: '슈크림 앙금',
    img: 'custard',
  },
  {
    label: '마라 앙금',
    img: 'mara',
  },
  {
    label: '민초 앙금',
    img: 'mincho',
  },
];

const ArrowBtn = styled.button`
  background: none;
  background: url('/assets/customfish/leftBtn.svg') no-repeat;
  background-size: contain;
  width: 36.25px;
  height: 32.25px;
  border: none;
`;

const Rightbtn = styled(ArrowBtn)`
  background-image: url('/assets/customfish/rightBtn.svg');
`;

const Fishframe = styled.div`
  background-image: url('/assets/customfish/fishframe.svg');
  height: 395px;
  width: 395px;
`;

const Palette = styled.div`
  background-image: url('/assets/customfish/palette.svg');
  height: 395px;
  width: 395px;
`;

const Types = styled.section`
  display: flex;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    background-color: #fff;
    border: 1px solid #191919;
    padding: 10px;

    button {
      display: flex;
      flex-direction: column;
      background: none;
      border: none;
    }
  }
`;

const FishFrame = styled.section``;

const Main = styled.main``;

const Header = styled.header``;

const Contents = styled.section``;
