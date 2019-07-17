import React from 'react';
import { Range, WingBlank, WhiteSpace, NavBar, Icon } from 'antd-mobile';

import cat from '../assets/images/cat.jpg';

var styles = {
  body: {
    fontSize: '18px',
    color: '#fff',
    roomImg: {
      width: '100%',
      height: '215px'
    },
    detail: {
      padding: '16px 16px 16px 16px',
      backgroundColor: '#fff',

      style: {
        fontSize: '18px',
        color: '#36333a',
        display: 'flex',
        alignItems: 'center'
      },
      address: {
        fontSize: '15px',
        color: '#36333a',
        marginTop: '15px'
      },
      tags: {
        fontSize: '12px',
        color: '#006934',
        marginTop: '15px',
        display: 'flex',
        alignItems: 'center',
        tag: {
          border: '1px solid #f7f7f7',
          borderRadius: '13px',
          padding: '10px 10px',
          marginRight: '12px'
        }
      }
    },
    checkin: {},
    numbers: {},
    remark: {},
    introduce: {},
    actions: {}
  }
};

class ReserveRoom extends React.Component {
  render() {
    return (
      <div style={styles.body}>
        <img src={cat} style={styles.body.roomImg} />
        <div style={styles.body.detail}>
          <div style={styles.body.detail.style}>
            <div>海南 白金湾养生谷公寓 一房一厅</div>
          </div>
          <div style={styles.body.detail.address}>
            <div>海南省琼海市博鳌镇滨海大道东侧 鹏欣 白金湾</div>
          </div>
          <div style={styles.body.detail.tags}>
            <div style={styles.body.detail.tags.tag}>会员尊享</div>
            <div style={styles.body.detail.tags.tag}>约52~66m²</div>
          </div>
        </div>
        <div style={styles.body.checkin} />
        <div style={styles.body.numbers} />
        <div style={styles.body.remark} />
        <div style={styles.body.introduce} />
        <div style={styles.body.actions} />
      </div>
    );
  }
}

export default ReserveRoom;
