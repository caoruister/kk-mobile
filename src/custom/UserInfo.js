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
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '-1',
        cursor: 'zoom-in',
        width: '100%',
        opacity: '1'
      },
      avatar: {
        display: 'flex',
        justifyContent: 'space-start',
        alignItems: 'center',
        margin: '59px 20px 0 20px',
        icon: {
          width: '63px',
          height: '63px'
        },
        name: {
          marginLeft: '20px',
          fontSize: '24px',
          color: '#fff'
        }
      },
      card: {
        margin: '27px 16px 0 16px',
        padding: '20px 19px 26px 19px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        name: {
          fontSize: '19px',
          color: '#cc9e48'
        },
        number: {
          fontSize: '15px',
          color: '#fff'
        }
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
              <div style={styles.body.header.avatar.name}>尊贵的唐先生</div>
            </div>
            <div style={styles.body.header.card}>
              <div style={styles.body.header.card.name}>鹏程卡</div>
              <div style={styles.body.header.card.number}>401****4546</div>
            </div>
          </div>
          <div style={styles.body.list} />
        </div>
        <BottomTabBar selectedTab="a1" page={this} />
      </div>
    );
  }
}

export default UserInfo;
