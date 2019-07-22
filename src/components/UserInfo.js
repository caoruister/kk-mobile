import React from 'react';

import { Grid, ImagePicker } from 'antd-mobile';

import { WEB_CONTEXT, FILE_URL_PREFIX, _isWeiXinEnv } from '../common/Utils';

import styles from './UserInfo.module.css';

import defaultAvatar from '../assets/images/default_avatar.png';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeOfFileValue = e => {
    if (_isWeiXinEnv()) {
      let that = this;
      //wx.chooseImage({
      //  count: 1, // 默认9
      //  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      //  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      //  success: function(res) {
      //    console.log(res);
      //    let tempFilePath = res.tempFilePaths[0];
      //    that.uploadImg(tempFilePath);
      //  }
      //})
    }
  };

  render() {
    const { userInfo, stats } = this.props;

    let files = [];

    let renderItem = dataItem => {
      return (
        <a className="am-grid-item-inner-content">
          <div className="am-grid-text">
            <span style={{ fontSize: '14px', color: '#d9d9d9' }}>
              {dataItem.label}
            </span>
          </div>
          <div className="am-grid-text">
            <span style={dataItem.style}>{dataItem.text}</span>
          </div>
        </a>
      );
    };

    let avatar = userInfo.headIcon[0].thumbnail_url
      ? FILE_URL_PREFIX + userInfo.headIcon[0].thumbnail_url
      : defaultAvatar;

    return (
      <div>
        <div className={styles.userinfo}>
          <div className={styles.userinfoAvatar}>
            <img
              src={avatar}
              mode="scaleToFill"
              onClick={this.onChangeOfFileValue}
            />
          </div>

          <div className={styles.userinfoNickname}>
            <div className={styles.nickname}>{userInfo.name}</div>
            <div className={styles.desc}>{userInfo.desc}</div>
          </div>

          <div className={styles.userinfoBarcode}>
            <img src={FILE_URL_PREFIX} mode="scaleToFill" />
          </div>
        </div>
        <Grid
          data={stats}
          columnNum={3}
          square={false}
          renderItem={renderItem}
        />
      </div>
    );
  }
}

export default UserInfo;
