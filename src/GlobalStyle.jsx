import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;

    /* -webkit-tap-highlight-color:rgba(255,255,255,0);
	  user-select: none; */
  }

  body {
    background-color: #f9f9f9;
    
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ol, ul {
    list-style-type: none;
  }

  main {
    max-width: 768px;
    min-height: 100vh;
    margin: auto;
    background-color: #fff;
  }
`;

export default GlobalStyle;
