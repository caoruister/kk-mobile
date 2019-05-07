import React, { Component } from 'react';

import { List, Icon, Button, WingBlank, WhiteSpace, Grid } from 'antd-mobile';

import BottomTabBar from './BottomTabBar';
import MessagesSection from './MessagesSection';
import UserInfo from './UserInfo';

import { logout } from '../api/LoginAPI';
import { getMy } from '../api/MyAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX, isWeiXinEnv } from '../common/Utils';

const Item = List.Item;

class My extends React.Component {
  _isMounted = false;

  state = {
    list: [],
    userInfo: {
      headIcon: [
        {
          thumbnail_url: ''
        }
      ]
    },

    stats: Array.from(new Array(3)).map((_val, i) => ({
      label: '统计' + i,
      text: `32${i}`,
      style: { color: '#fea33a', fontSize: '36px' }
    }))
  };

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = () => {
    getMy().then(res => {
      if (res == null || !res) {
        window.location.href = WEB_CONTEXT + '/#/Login';
        return;
      }
      //
      console.log(res);

      if (this._isMounted) {
        this.setState({
          list: res.list == null ? [] : res.list,
          userInfo: res.userInfo == null ? {} : res.userInfo
        });
      }
    });
  };

  logout = () => {
    logout().then(res => {
      if (res == null || !res) {
        window.location.href = WEB_CONTEXT + '/#/Login';
        return;
      }
      //
      console.log(res);
    });
    //
    localStorage.removeItem('__token__');
    localStorage.removeItem('__token__userName');
    localStorage.removeItem('__orgid__');
    window.location.href = WEB_CONTEXT + '/#/Login';
  };

  render() {
    const { userInfo, list, stats } = this.state;
    //
    return (
      <div style={{ paddingBottom: '80px' }}>
        <UserInfo userInfo={userInfo} stats={stats} />

        <WhiteSpace size="lg" />
        <MessagesSection data={list} />

        <WhiteSpace size="lg" />
        <WingBlank>
          <Button
            type="primary"
            style={{ background: '#4182e6' }}
            onClick={this.logout}
          >
            退出
          </Button>
        </WingBlank>

        <BottomTabBar selectedTab="my" page={this} />
      </div>
    );
  }
}

export default My;
