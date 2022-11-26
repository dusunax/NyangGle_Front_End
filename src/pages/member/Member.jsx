import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

function Member() {
  const navigate = useNavigate();
  const copyUrlRef = useRef();
  const [isEditMode, setIsEditMode] = useState(false);

  const [displayFish, setDisplayFish] = useState([]);

  // 리코일으로 전역 변수 가져와서 사용
  const [userName, setUserName] = useState('유저 네임');
  const [newUserName, setNewUserName] = useState();
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  // const [isLoggedUser, setIsLoggedUser] = useState(false);
  const uid = window.location.pathname.slice(1);

  // 쿠키에 uid 가져와서
  const [isMatchUid, setisMatchUid] = useState(false);
  const myUid = 'testtest0';
  const isMyPage = isLoggedUser && isMatchUid;

  const copyUrl = () => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사 기능이 지원되지 않는 브라우저입니다.');
    }

    copyUrlRef.current.select();
    document.execCommand('copy');

    alert('복사되었습니다.');
  };

  // 붕어빵 갯수 가져오기
  const fetchSizeAll = async () => {
    try {
      // const countSize = await requestAxios('/??')

      // 붕어빵 갯수 request
      const countSize = 2;
      if (countSize <= 6) {
        setDisplayFish([...new Array(countSize).keys()]);
      } else {
        setDisplayFish([...new Array(6).keys()]);
      }
    } catch (e) {
      console.log(e);
      alert('알 수 없는 에러가 발생했습니다.😭');
      navigate('/');
    }
  };

  const onClickCustomFishButton = () => {
    navigate(`/customFish/${uid}`);
  };

  const onClickGoToListButton = () => {
    navigate(`/list/${uid}`);
  };

  const onClickGoToMyOwnPage = () => {
    navigate(`/member/${myUid}`);
  };

  const onClickGoToLoginPage = () => {
    navigate(`/`);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userName > 10) return;
    let currentName;

    if (newUserName === undefined) {
      currentName = userName;
    } else {
      currentName = newUserName;
    }

    // 닉네임 변경 request
    if (userName !== newUserName) {
      // const payload = { userName: '' };
      // await requestAxios(payload);
      console.log('전송 완료!');
    }

    setUserName(currentName);
    setIsEditMode(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewUserName(value);
  };

  const onClickNickName = () => {
    setIsEditMode(true);
  };

  useEffect(() => {
    if (uid === myUid) setisMatchUid(true);
    fetchSizeAll();
  }, []);

  return (
    <MemberWrap>
      {/* 타이틀 */}

      <MemberTitle>
        <NickNameChangeForm onSubmit={onSubmit} onClick={onClickNickName}>
          {isEditMode ? (
            <input
              className="username"
              defaultValue={userName}
              onChange={onChange}
              maxLength={10}
            />
          ) : (
            <span className="username">{userName}</span>
          )}
          <div className="nickNameChangeButton">🖍</div>
          <br />
          붕어빵이 <span className="sizeAll">{displayFish.length}</span>개 있습니다냥.
        </NickNameChangeForm>
      </MemberTitle>

      {/* 푸드트럭 이미지 & 붕어빵 매대 */}
      <FishBreadTruckWrap>
        {/* url 복사 */}
        <CopyUrlWrap onClick={copyUrl}>
          <input id="copyUrl" type="text" ref={copyUrlRef} defaultValue={window.location.href} />
          <label htmlFor="copyUrl">🔗</label>
        </CopyUrlWrap>

        <FishBreadTruck>
          <img
            src="https://cdn-icons-png.flaticon.com/512/4105/4105446.png"
            alt="임시 이미지"
            style={{ width: '300px' }}
          />

          <FishBreadConatiner
            className={isMyPage ? 'clickable' : ''}
            onClick={isMyPage ? onClickGoToListButton : null}
          >
            {displayFish.map((idx) => (
              <li key={idx + 'fish'}>붕어</li>
            ))}
          </FishBreadConatiner>
        </FishBreadTruck>

        {isMyPage && <button onClick={onClickGoToListButton}>내 봉투 가기</button>}

        {isLoggedUser && !isMatchUid && (
          <>
            <button onClick={onClickGoToMyOwnPage}>내 트럭 가기</button>
            <button onClick={onClickCustomFishButton}>붕어빵 만들기</button>
          </>
        )}

        {!isLoggedUser && (
          <>
            <button onClick={onClickCustomFishButton}>붕어빵 만들기</button>
            <button onClick={onClickGoToLoginPage}>내 봉투 만들기</button>
          </>
        )}
      </FishBreadTruckWrap>
    </MemberWrap>
  );
}

export default Member;

const MemberWrap = styled.div`
  padding: 20px 0;
`;

const FishBreadTruckWrap = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  padding: 100px 0;
`;

const FishBreadTruck = styled.div`
  position: relative;

  margin: 40px 0;
`;

const FishBreadConatiner = styled.ul`
  display: flex;
  width: 100px;
  flex-flow: wrap;

  position: absolute;
  right: 0;
  bottom: 150px;

  &.clickable {
    cursor: pointer;
  }

  li {
    flex: 0 0 50%;
  }
`;

const CopyUrlWrap = styled.div`
  padding: 10px 20px;
  border-radius: 30px;
  border: 1px solid #ddd;

  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;

  input {
    all: unset;
    width: 280px;
    font-size: 18px;

    overflow: hidden;
    white-space: nowrap;
    word-break: keep-all;

    text-overflow: ellipsis;
  }
`;

const MemberTitle = styled.div`
  display: flex;
  justify-content: center;
`;

const NickNameChangeForm = styled.form`
  font-size: 30px;
  line-height: 1.6;
  text-align: center;

  position: relative;

  .username {
    height: 50px;
    width: auto;
    text-align: center;

    padding: 5px 0;

    display: inline-block;
    font-size: inherit;
    font-weight: inherit;
  }

  input.username {
    height: 50px;
    outline: none;
    border: none;
  }

  .nickNameChangeButton {
    position: absolute;
    right: 10px;
    top: 5px;
  }
`;
