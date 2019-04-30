import React, { Component } from 'react';

import { Icon, TabBar } from 'antd-mobile';

import iconfontUser from '../assets/images/iconfont-user.png';
import iconfontUserActive from '../assets/images/iconfont-user-active.png';
import iconfontHome from '../assets/images/iconfont-home.png';
import iconfontHomeActive from '../assets/images/iconfont-home-active.png';

import { WEB_CONTEXT } from '../common/Utils';

import { getTabBar } from '../api/BottomTabBarAPI'

class BottomTabBar extends React.Component {
  _isMounted = false;

  state = {
    selectedTab: this.props.selectedTab || 'home',
    tabBar: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = () => {
    getTabBar({}).then(res => {
      if (res == null || !res) {
        window.location.href = WEB_CONTEXT + '/#/Login';
        return;
      }
      //
      console.log(res);

      if (this._isMounted) {
        this.setState({
          tabBar: res.tabBar || [],
        });
      }
    });
  }

  render() {
    const { tabBar } = this.state;

    let tabBarJSX = tabBar.map(tab=>
        <TabBar.Item
          icon={<img style={{width:'22px', height:'22px'}} src={tab.icon} />}
          selectedIcon={<img style={{width:'22px', height:'22px'}} src={tab.selectedIcon} />}
          title={tab.title}
          key={tab.key}
          selected={this.state.selectedTab === tab.key}
          onPress={() => {
                this.setState({
                  selectedTab: tab.key,
                });

                window.location.href = WEB_CONTEXT + tab.path;
              }}
          >
      </TabBar.Item>);

    return (
      <div style={{ zIndex:2, position: 'fixed', width: '100%', bottom:0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {tabBarJSX}
        </TabBar>
      </div>
    );
  }
}

export default BottomTabBar;
