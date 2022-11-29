import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Member from './member/Member';
import Login from './login/Index';
import CustomFish from './customFishbread/CustomFish';
import List from './fishBreadList/List';
import KakaoLogin from './login/KakaoLogin';
import { useState } from 'react';

function Router() {
  const [countUp, setCountUp] = useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/:uid" element={<Member countUp={countUp} setCountUp={setCountUp} />} />
        <Route
          path="/customFish"
          element={<CustomFish countUp={countUp} setCountUp={setCountUp} />}
        />
        <Route path="/list/:uid" element={<List />} />
        <Route path="/signin/kakao" element={<KakaoLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
