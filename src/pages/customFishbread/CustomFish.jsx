import CustomMessage from './CustomMessage';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import CustomDone from './CustomDone';

function CustomFish() {
  const tabs = ['customFish', 'customMessage'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [inputs, setInputs] = useState({
    dough: '밀가루',
    sediment: '',
    nickname: '',
    content: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const { requestApi } = useAxios();

  const navigate = useNavigate();

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

  const exitCustomPage = () => {
    if (window.confirm('붕어빵 만들기를 취소하시겠습니까?')) {
      navigate('/');
    }
  };

  const onClickedSave = async () => {
    if (inputs.content === '') {
      alert('내용을 입력해주세요');
      return;
    }

    setIsLoading(true);

    const { status, data } = await requestApi('post', '', {
      ...inputs,
      nickname: inputs.nickname ? inputs.nickname : '익명',
    });

    if (status === 201) {
      navigate('/');
    } else {
      // error 처리
    }
  };

  const onClickReset = () => {
    setInputs({ dough: '밀가루', sediment: '', nickname: '', content: '' });
  };

  console.log(inputs);

  return isLoading ? (
    <CustomDone />
  ) : (
    <div>
      {activeTab === tabs[0] && (
        <>
          <button onClick={exitCustomPage}>이전</button>
          <button type="button" onClick={() => setActiveTab(tabs[1])}>
            다음
          </button>
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
          <button onClick={onClickReset}>refresh</button>
          {sediments.map((sediment) => (
            <button
              type="button"
              key={sediment}
              onClick={() => onClcikCustom('sediment', sediment)}
            >
              {sediment}
            </button>
          ))}
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

const doughs = ['밀가루', '민트', '녹차'];
const sediments = ['팥', '슈크림', '치즈김치'];
