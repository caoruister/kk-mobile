import React from 'react';
import qs from 'qs';
import { Result, Icon, Button, WingBlank, WhiteSpace } from 'antd-mobile';

import CustomNavBar from 'components/CustomNavBar';

import cat from 'assets/images/cat.jpg';

var styles = {
  body: {
    resultIcon: {
      fill: '#cc9e48',
      width: '60px',
      height: '60px'
    },
    primaryButton: {
      backgroundColor: '#cc9e48',
      borderRadius: '5px',
      fontSize: '19px',
      color: '#fff',
      height: '60px',
      lineHeight: '60px'
    },
    defaultButton: {
      backgroundColor: '#fff',
      border: 'solid 1px #cc9e48',
      borderRadius: '5px',
      fontSize: '19px',
      color: '#cc9e48',
      height: '60px',
      lineHeight: '60px'
    }
  }
};

class ReserveSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  viewReservation = () => {
    let id = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).id;
    this.props.history.push('/ViewReserve?id=' + id);
  };

  backHome = () => {
    this.props.history.push('/Home');
  };

  render() {
    return (
      <div>
        <CustomNavBar navTitle="预定成功" />
        <div style={styles.body}>
          <Result
            img={
              <Icon
                type="check-circle"
                className="spe"
                style={styles.body.resultIcon}
              />
            }
            title="预定成功"
            message="请保持手机畅通，您将收到手机短信确认消息。"
          />

          <WhiteSpace />
          <WingBlank>
            <Button
              style={styles.body.primaryButton}
              onClick={this.viewReservation}
            >
              查看订单
            </Button>
            <WhiteSpace />
            <Button style={styles.body.defaultButton} onClick={this.backHome}>
              回首页
            </Button>
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default ReserveSuccess;
