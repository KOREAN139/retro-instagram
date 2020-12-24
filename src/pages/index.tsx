/** @jsx jsx */
import Footer from '@components/footer';
import MenuBar from '@components/menu-bar';
import TitleBar from '@components/title-bar';
import { css, Global, jsx } from '@emotion/react';
import Routes from '@pages/routes';
import backgroundPattern from '@static/background-pattern.png';
import cursor from '@static/cursor.png';
import downArrowIcon from '@static/down-arrow-icon.png';
import downArrowInactiveIcon from '@static/down-arrow-icon-inactive.png';
import fontEOT from '@static/fonts/W95FARegular.eot';
import fontSVG from '@static/fonts/W95FARegular.svg';
import fontTTF from '@static/fonts/W95FARegular.ttf';
import fontWOFF from '@static/fonts/W95FARegular.woff';
import upArrowIcon from '@static/up-arrow-icon.png';
import upArrowInactiveIcon from '@static/up-arrow-icon-inactive.png';
import { configureStore, history } from '@store';
import { defaultBoxShadow } from '@styles/mixins';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Provider } from 'react-redux';

const store = configureStore();

const globalStyle = css`
  @font-face {
    font-family: W95FA;
    font-style: normal;
    font-weight: normal;
    src: url(${fontEOT});
    src: url(${fontEOT}) format('embedded-opentype'),
      url(${fontWOFF}) format('woff'), url(${fontTTF}) format('truetype'),
      url(${fontSVG}) format('svg');
  }

  body {
    ${defaultBoxShadow(1.6)}

    width: 308px;
    height: 556px;
    margin: 0;
    padding: 6px;
    font-family: W95FA;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-user-select: none;

    cursor: url(${cursor}), auto;

    background-image: url(${backgroundPattern});
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  ::-webkit-scrollbar {
    width: 18px;
  }

  ::-webkit-scrollbar-track {
    background-color: white;
    background-image: linear-gradient(45deg, #bdbdbd 25%, transparent 25%),
      linear-gradient(-45deg, #bdbdbd 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #bdbdbd 75%),
      linear-gradient(-45deg, transparent 75%, #bdbdbd 75%);
    background-size: 2px 2px;
  }

  ::-webkit-scrollbar-thumb {
    ${defaultBoxShadow()}

    background-image: url(${backgroundPattern});
  }

  ::-webkit-scrollbar-button:start:decrement {
    ${defaultBoxShadow()}

    display: block;
    height: 18px;
    background-image: url(${upArrowIcon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 7px 7px;
  }

  ::-webkit-scrollbar-button:end:increment {
    ${defaultBoxShadow()}

    display: block;
    height: 18px;
    background-image: url(${downArrowIcon});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 7px 7px;
  }

  ::-webkit-scrollbar-button:start:disabled {
    background-image: url(${upArrowInactiveIcon});
  }

  ::-webkit-scrollbar-button:end:disabled {
    background-image: url(${downArrowInactiveIcon});
  }
`;

const RootPage = () => (
  <React.Fragment>
    <Global styles={globalStyle} />
    <Provider store={store}>
      <TitleBar displayIcon location='Root' />
      <MenuBar />
      <ConnectedRouter history={history}>
        <Routes />
        <Footer />
      </ConnectedRouter>
    </Provider>
  </React.Fragment>
);

export default RootPage;
