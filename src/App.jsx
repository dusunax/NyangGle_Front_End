import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { useEffect } from 'react';
import Router from './pages/Router';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <CookiesProvider>
            <main>
              <Router />
            </main>
          </CookiesProvider>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
