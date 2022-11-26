import { RecoilRoot } from 'recoil';
import GlobalStyle from './GlobalStyle';
import Router from './pages/Router';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

function App() {
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
