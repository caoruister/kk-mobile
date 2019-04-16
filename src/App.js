import React from 'react';

import { HashRouter } from 'react-router-dom';
import { LocaleProvider } from 'antd-mobile';

import zhCN from 'antd-mobile/lib/locale-provider/en_US';

import { MyRoute } from './common/MyRoute';

import { WEB_CONTEXT } from './common/Utils';

class App extends React.Component {

  componentDidMount() {
    let token = localStorage.getItem('__token__');
    if (token === null || token === '') {
      window.location.href = WEB_CONTEXT + '/#/Login';
    } else {
      window.location.href = WEB_CONTEXT + '/#/My';
    }
  }

  render() {
    return (
      <LocaleProvider locale={zhCN}>
      <HashRouter>
        <MyRoute />
      </HashRouter>
      </LocaleProvider>
    );
  }
}

export default App;
