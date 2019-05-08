import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Icon, TabBar } from 'antd-mobile';

import iconfontUser from '../assets/images/iconfont-user.png';
import iconfontUserActive from '../assets/images/iconfont-user-active.png';
import iconfontHome from '../assets/images/iconfont-home.png';
import iconfontHomeActive from '../assets/images/iconfont-home-active.png';

import { WEB_CONTEXT, setTitle } from '../common/Utils';

import { getTabBar } from '../api/BottomTabBarAPI';

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
        this.props.history.push('/Login');
        return;
      }
      //
      console.log(res);

      if (this._isMounted) {
        this.setState({
          tabBar: res.tabBar || []
        });

        this.state.tabBar.forEach(tab => {
          let selectedTab = this.state.selectedTab === tab.key;

          if (selectedTab) {
            this.props.page.setState({
              navTitle: tab.title
            });
            setTitle(tab.title, true);
          }
        });
      }
    });
  };

  render() {
    const { tabBar } = this.state;
    let _this = this;

    let tabBarJSX = tabBar.map(tab => {
      let selectedTab = this.state.selectedTab === tab.key;

      let tabBarJSX = (
        <TabBar.Item
          icon={
            <img style={{ width: '22px', height: '22px' }} src={tab.icon} />
          }
          selectedIcon={
            <img
              style={{ width: '22px', height: '22px' }}
              src={tab.selectedIcon}
            />
          }
          title={tab.title}
          key={tab.key}
          selected={selectedTab}
          onPress={() => {
            _this.setState({
              selectedTab: tab.key
            });
            setTitle(tab.title, true);
            _this.props.history.push(tab.path);
          }}
        />
      );

      return tabBarJSX;
    });

    return (
      <div style={{ zIndex: 2, position: 'fixed', width: '100%', bottom: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#4182e6"
          barTintColor="white"
          tabBarPosition="bottom"
        >
          {tabBarJSX}
        </TabBar>
      </div>
    );
  }
}

export default withRouter(BottomTabBar);
