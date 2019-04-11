import React from 'react';

import { HashRouter } from 'react-router-dom';
import { Icon, TabBar } from 'antd-mobile';

import iconfontUser from './assets/images/iconfont-user.png';
import iconfontUserActive from './assets/images/iconfont-user-active.png';
import iconfontHome from './assets/images/iconfont-home.png';
import iconfontHomeActive from './assets/images/iconfont-home-active.png';

import BottomTabBar from './common/BottomTabBar';
import { MyRoute } from './common/MyRoute';

import { WEB_CONTEXT } from './common/Utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('__token__');
    if (token == null || token == '') {
      window.location.href = WEB_CONTEXT + '/#/Login';
    } else {

    }
  }

  render() {
    return (
      <HashRouter>
        <MyRoute />
      </HashRouter>
    );
  }
}

export default App;
