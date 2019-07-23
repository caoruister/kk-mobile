import React from 'react';
import { Calendar, List, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import BottomTabBar from 'components/BottomTabBar';

import backgroundIcon from 'assets/images/my_bg_pic.png';
import avatarIcon from 'assets/images/default_avatar.png';

var styles = {
  body: {
    header: {
      icon: {
        width: '100%'
      },
      avatar: {
        icon: {}
      }
    },

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
            <img src={backgroundIcon} style={styles.body.header.icon} />
            <div style={styles.body.header.avatar}>
              <img src={avatarIcon} style={styles.body.header.avatar.icon} />
              <div>尊贵的唐先生</div>
            </div>
            <div style={styles.body.header.card} />
          </div>
          <div style={styles.body.list} />
        </div>
        <BottomTabBar selectedTab="a1" page={this} />
      </div>
    );
  }
}

export default UserInfo;
