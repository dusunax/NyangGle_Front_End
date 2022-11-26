import CustomMessage from './CustomMessage';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function CustomFish() {
  const tabs = ['customFish', 'customMessage'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [inputs, setInputs] = useState({
    dough: '',
    sediment: '',
    nickname: '',
    content: '',
  });

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

  return (
    <div>
      {activeTab === tabs[0] && (
        <>
          <Link to="/">이전</Link>
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
      {activeTab === tabs[1] && <CustomMessage inputs={inputs} onChangeMessage={onChangeMessage} />}
    </div>
  );
}

export default CustomFish;

const doughs = ['밀가루', '민트', '녹차'];
const sediments = ['팥', '슈크림', '치즈김치'];
