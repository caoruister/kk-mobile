import React, { Component } from 'react';

import { Icon, TabBar } from 'antd-mobile';

import iconfontUser from '../assets/images/iconfont-user.png';
import iconfontUserActive from '../assets/images/iconfont-user-active.png';
import iconfontHome from '../assets/images/iconfont-home.png';
import iconfontHomeActive from '../assets/images/iconfont-home-active.png';

import { WEB_CONTEXT } from '../common/Utils';

class BottomTabBar extends React.Component {
  state = {
    selectedTab: null,
  }
  constructor(props) {
    super(props);
    let selectedTab = this.props.selectedTab;
    if (selectedTab == null) {
      selectedTab = 'home';
    }
    this.state = {
      selectedTab: selectedTab,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div style={{ zIndex:2, position: 'fixed', width: '100%', bottom:0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          <TabBar.Item
            icon={<img style={{width:'22px', height:'22px'}} src={iconfontHome} />}
            selectedIcon={<img style={{width:'22px', height:'22px'}} src={iconfontHomeActive} />}
            title="首页"
            key="home"
            selected={this.state.selectedTab === 'home'}
            onPress={() => {
              this.setState({
                selectedTab: 'home',
              });
              window.location.href = WEB_CONTEXT + '/#/Home';
            }}
          >

          </TabBar.Item>
          <TabBar.Item
            icon={<img style={{width:'22px', height:'22px'}} src={iconfontUser} />}
            selectedIcon={<img style={{width:'22px', height:'22px'}} src={iconfontUserActive} />}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {
              this.setState({
                selectedTab: 'my',
              });
               window.location.href = WEB_CONTEXT + '/#/My';
            }}
          >

          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

export default BottomTabBar;
