import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;

    -webkit-tap-highlight-color:rgba(255,255,255,0);
  }

  body, button, input, textarea {
    font-family:'kotra',"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  *::-webkit-scrollbar {
    display: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul {
    list-style-type: none;
  }
`;

export default GlobalStyle;
