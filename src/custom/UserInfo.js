import React from 'react';
import { List, Button, WhiteSpace, WingBlank } from 'antd-mobile';

import BottomTabBar from 'components/BottomTabBar';

import { logout } from 'api/LoginAPI';
import { _callInterface } from 'api/CommonAPI';
import { WEB_CONTEXT } from 'common/Utils';

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
          height: '63px',
          borderRadius: '50%',
          border: 'solid 1px #e3e3e5'
        },
        name: {
          marginLeft: '20px',
          fontSize: '24px',
          color: '#fff'
        }
      },
      card: {
        margin: '28px 16px 0 16px',
        padding: '24px 19px 26px 19px',
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
    list: {
      marginTop: '5px',
      title: {
        padding: '10px 0 10px 0'
      }
    }
  },

  logout: {
    backgroundColor: '#cc9e48',
    borderRadius: '5px',
    fontSize: '19px',
    color: '#fff'
  }
};

class UserInfo extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      cardNo: '',
      cardTypeName: '',
      name: '',
      avatar: '',
      callNo: '',
      memberId: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    let oThis = this;
    //
    var interfaceName = 'getMyInfo'; // 接口名称
    var params = {}; // 向接口提交的参数
    _callInterface(interfaceName, params).then(res => {
      if (res == null) {
        return;
      }
      //
      console.log('------------data-------------');
      console.log(res);

      if (oThis._isMounted) {
        oThis.setState({
          cardNo: res.cardNo,
          cardTypeName: res.cardTypeName,
          name: res.mName,
          callNo: res.hotline,
          avatar: res.tx,
          memberId: res.memberId
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

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
    return (
      <div>
        <div style={styles.body}>
          <div style={styles.body.header}>
            <img src={backgroundIcon} style={styles.body.header.icon} />
            <div style={styles.body.header.avatar}>
              <img
                src={this.state.avatar}
                style={styles.body.header.avatar.icon}
              />
              <div style={styles.body.header.avatar.name}>
                {this.state.name}
              </div>
            </div>
            <a
              style={styles.body.header.card}
              href={
                '/#/view/FF8080816BDE6699016BE0D6096602FF/' +
                this.state.memberId +
                '?title=会员信息'
              }
            >
              <div style={styles.body.header.card.name}>
                {this.state.cardTypeName}
              </div>
              <div style={styles.body.header.card.number}>
                {this.state.cardNo}
              </div>
            </a>
          </div>
          <div style={styles.body.list}>
            <List.Item
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(
                  '/list/FF8080816BDE6699016BE0F26AB503BD?title=我的预订&MEMBER_FIELD_NAME=mName&VIEW_PAGE=ViewReserve'
                );
              }}
            >
              <div style={styles.body.list.title}>我的预定</div>
            </List.Item>
            <List.Item
              arrow="horizontal"
              onClick={() => {
                this.props.history.push(
                  '/add/FF8080816BDE6699016BE1089D93049B?title=用户反馈'
                );
              }}
            >
              <div style={styles.body.list.title}>用户反馈</div>
            </List.Item>
            <List.Item extra={this.state.callNo} onClick={() => {}}>
              <div style={styles.body.list.title}>在线客服</div>
            </List.Item>
          </div>
        </div>

        <WhiteSpace size="lg" />
        <WingBlank>
          <Button style={styles.logout} onClick={this.logout}>
            退出
          </Button>
        </WingBlank>

        <BottomTabBar selectedTab="a1" page={this} />
      </div>
    );
  }
}

export default UserInfo;
