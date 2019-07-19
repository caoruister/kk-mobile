import React from 'react';
import { Calendar, List, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import BottomTabBar from 'components/BottomTabBar';

import settingIcon from 'assets/images/my_icon_set.png';

var styles = {
  body: {
    header: {
      setting: {
        height: '265px',
        backgroundColor: '#cc9e48',
        boxShadow: 'inset 0px 4px 18px 0px rgba(66, 43, 0, 0.35)',
        icon: {}
      }
    },
    avatar: {},
    card: {}
  }
};

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div style={styles.body}>
          <div style={styles.body.header}>
            <div style={styles.body.header.setting}>
              <img src={settingIcon} style={styles.body.header.setting.icon} />
            </div>
            <div style={styles.body.header.avatar} />
            <div style={styles.body.header.card} />
          </div>
          <div style={styles.body.list} />
        </div>
        <BottomTabBar selectedTab="my" page={this} />
      </div>
    );
  }
}

export default UserInfo;
