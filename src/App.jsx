import { RecoilRoot } from 'recoil';
import { theme } from './theme';
import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';

import { CookiesProvider } from 'react-cookie';

import Router from './pages/Router';
import Layout from './pages/Layout';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <CookiesProvider>
            <Layout>
              <Router />
            </Layout>
          </CookiesProvider>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;
