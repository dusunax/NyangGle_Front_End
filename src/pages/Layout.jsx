import styled from 'styled-components';

function Layout({ children }) {
  const goToMain = () => {
    location.replace('/');
  };

  return (
    <StLayout>
      <h1 className="site_title" onClick={goToMain}>
        냥냥편지
        <div className="logo">
          <img src="/assets/images/logos/main_title.png" alt="냥냥편지" />
          <img
            src="/assets/images/logos/logo_title.png"
            alt="따끈따끈 붕어빵"
            className="fish_img"
          />
        </div>
      </h1>
      <div className="contents_area">{children}</div>
    </StLayout>
  );
}

export default Layout;

const StLayout = styled.main`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  .site_title {
    line-height: 0;
    margin: 30px 0;

    text-indent: -9999px;

    cursor: pointer;

    .logo {
      text-indent: 0px;
      height: 40px;

      display: flex;
      gap: 12px;
      align-items: center;

      img {
        height: 100%;
      }

      .fish_img {
        height: 65%;
      }
    }
  }

  & > .contents_area {
    width: 100%;
    max-width: 550px;
    height: calc(100% - 15vh);

    margin-bottom: 5vh;

    border-radius: 40px;
    border: 12px solid #fff;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);

    position: relative;

    overflow: hidden;
  }

  @media (min-width: 1000px) {
    & > .contents_area {
      max-width: 390px;
    }
    .site_title {
      position: fixed;
      left: 50%;
      top: 10px;
      z-index: -9;
      transform: translateX(calc(-100% - 220px));

      .logo {
        height: 50px;
      }
    }
  }

  // 전체 화면
  @media (max-width: 500px) {
    & > .contents_area {
      height: 100%;

      border: none;
      margin: 0;
      border-radius: 0px;
    }
    .site_title {
      display: none;
    }
  }
`;
