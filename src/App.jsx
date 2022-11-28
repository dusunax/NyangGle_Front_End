import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { useEffect } from 'react';

import Router from './pages/Router';

function App() {
  let vh = 0;

  useEffect(() => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <main>
            <Router />
          </main>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
