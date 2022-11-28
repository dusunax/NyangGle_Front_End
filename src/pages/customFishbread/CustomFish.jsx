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

  // 커스텀 반죽/앙금 선택
  const onClcikCustom = (type, value) => {
    setInputs((prev) => ({
      ...prev,
      [type]: value,
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
    <div>
      {activeTab === tabs[0] && (
        <>
          <Leftbtn onClick={exitCustomPage} />
          <Rightbtn type="button" onClick={() => setActiveTab(tabs[1])} />
        </>
      )}
      {activeTab === tabs[1] && (
        <>
          <button type="button" onClick={() => setActiveTab(tabs[0])}>
            이전
          </button>
        </>
      )}

      {activeTab === tabs[0] && (
        <div>
          {doughs.map((dough) => (
            <button type="button" key={dough} onClick={() => onClcikCustom('dough', dough)}>
              {dough}
            </button>
          ))}
          <button onClick={onClickReset}>reset</button>
          {sediments.map((sediment) => (
            <button
              type="button"
              key={sediment}
              onClick={() => onClcikCustom('sediment', sediment)}
            >
              {sediment}
            </button>
          ))}
          <img
            src="/assets/customfish/fishframe.svg"
            style={{
              position: 'absolute',
              width: '100%',
              left: '0',
              top: '50%',
              transform: 'translate(0, -25%)',
              zIndex: '2',
            }}
          />
          <img
            src="/assets/customfish/bottom.svg"
            style={{
              position: 'absolute',
              width: '100%',
              left: '0',
              bottom: '0',
            }}
          />
        </div>
      )}
      {activeTab === tabs[1] && (
        <CustomMessage
          inputs={inputs}
          onChangeMessage={onChangeMessage}
          onClickedSave={onClickedSave}
        />
      )}
    </div>
  );
}

export default CustomFish;

const doughs = ['밀가루', '초코', '고구마', '녹차'];
const sediments = ['팥', '슈크림', '마라', '민초'];

const Leftbtn = styled.button`
  background: none;
  background: url('/assets/customfish/leftBtn.svg') no-repeat;
  background-size: contain;
  width: 36.25px;
  height: 32.25px;
  border: none;
`;

const Rightbtn = styled.button`
  background-image: url('/assets/customfish/rightBtn.svg');
  width: 36.25px;
  height: 34px;
  border: none;
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
