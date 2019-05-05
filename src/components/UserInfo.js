import React from 'react';

import { Grid } from 'antd-mobile';

import { WEB_CONTEXT, FILE_URL_PREFIX } from '../common/Utils';

class UserInfo extends React.Component {
  render() {
    const { userInfo, stats } = this.props;

    let renderItem = dataItem => {
      return (
        <div className="am-grid-item-inner-content">
          <div className="am-grid-text">
            <span style={{ fontSize: '14px', color: '#d9d9d9' }}>
              {dataItem.label}
            </span>
          </div>
          <div className="am-grid-text">
            <span style={dataItem.style}>{dataItem.text}</span>
          </div>
        </div>
      );
    };

    return (
      <div>
        <div className="userinfo">
          <div className="userinfo-avatar">
            <img
              src={FILE_URL_PREFIX + userInfo.headIcon[0].thumbnail_url}
              mode="scaleToFill"
            />
          </div>

          <div className="userinfo-nickname">
            <div className="nickname">{userInfo.name}</div>
            <div className="desc">{userInfo.desc}</div>
          </div>

          <div className="userinfo-barcode">
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
