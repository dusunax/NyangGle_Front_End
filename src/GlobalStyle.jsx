import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #f9f9f9;
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
