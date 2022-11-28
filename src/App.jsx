import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import Router from './pages/Router';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
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
