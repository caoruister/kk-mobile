import React from 'react';
import { Range, WingBlank, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import { _callInterface } from 'api/CommonAPI';

import arrow from '../assets/images/home_arrow.png';
import search from '../assets/images/home_search.png';
import close from '../assets/images/home_close.png';
import iconVip from '../assets/images/home_icon_vip.png';
import iconSee from '../assets/images/home_message.png';
import iconFirst from '../assets/images/home_icon.png';
import iconLast from '../assets/images/home_icon_down.png';
import tips from '../assets/images/icon_tips.png';
import tipsLogo from '../assets/images/icon_tips_logo.png';

var styles = {
  body: {
    fontSize: '18px',
    color: '#fff',
    paddingTop: '21px',
    topMenu: {
      padding: '0 20px 0 20px',
      display: 'flex',
      alignItems: 'center',
      locationIcon: {
        width: '10px',
        height: '8px',
        marginLeft: '10px'
      },
      search: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: '1',
        position: 'relative',
        height: '39px',
        backgroundColor: '#f9f9f9',
        borderRadius: '19px',
        opacity: '0.1',
        marginLeft: '23px',
        padding: '0 9px 0 35px',
        searchIcon: {
          position: 'absolute',
          top: '10px',
          left: '12px',
          width: '20px',
          height: '20px'
        },
        inputText: {
          flex: '1',
          border: 'none',
          fontSize: '16px',
          color: '#838596'
        },
        closeIcon: {
          width: '24px',
          height: '24px'
        }
      }
    },
    welcome: {
      padding: '0 20px 0 20px',
      marginTop: '33px',
      title: {
        fontSize: '24px',
        color: '#fff'
      },
      cardnum: {
        fontSize: '18px',
        color: '#ffe3b4',
        marginTop: '13px',
        view: {
          marginLeft: '11px',
          width: '15px',
          height: '10px'
        }
      },
      desc: {
        fontSize: '16px',
        color: '#fff',
        marginTop: '45px',
        lineHeight: '24px',
        first: {
          display: 'flex',
          justifyContent: 'flex-start',
          firstIcon: {
            width: '13px',
            height: '13px'
          }
        },
        center: {
          textIndent: '35px'
        },
        last: {
          display: 'flex',
          justifyContent: 'flex-end',
          lastIcon: {
            width: '13px',
            height: '13px'
          }
        }
      }
    },
    vip: {
      margin: '22px 20px 0 20px',
      display: 'flex',
      card: {
        padding: '12px 17px 12px 17px',
        fontSize: '17px',
        color: '#ffe3b4',
        border: '1px solid #c5a567',
        borderRadius: '5%',
        display: 'flex',
        alignItems: 'center',
        iconVip: {
          width: '18px',
          height: '17px'
        },
        text: {
          marginLeft: '8px'
        }
      }
    },
    quick: {
      display: 'flex',
      margin: '137px 20px 0 20px',
      padding: '6px 17px 6px 17px',
      borderRadius: '5px',
      border: 'solid 1px #c5a567',
      fontSize: '16px',
      color: '#ffe3b4',
      left: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: '1',
        color: '#ffe3b4',
        strategy: {
          fontSize: '14px',
          color: '#cc9e48',
          marginLeft: '10px'
        },
        leftIcon: {
          width: '35px',
          height: '35px',
          marginLeft: '37px'
        }
      },
      center: {
        width: '1px',
        height: '30px',
        backgroundColor: '#838596',
        opacity: '0.36'
      },
      right: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: '1',
        color: '#ffe3b4',
        strategy: {
          fontSize: '14px',
          color: '#cc9e48',
          marginLeft: '10px'
        },
        rightIcon: {
          width: '35px',
          height: '35px',
          marginLeft: '37px'
        }
      }
    }
  }
};

class HomeSection extends React.Component {
  _isMounted = false;

  state = {
    cardTypeName: '',
    cardNo: '',
    vipCard: ''
  };

  componentDidMount() {
    this._isMounted = true;
    let oThis = this;
    //
    var interfaceName = 'getMemberCardInfo'; // 接口名称
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
          cardTypeName: res.cardTypeName,
          cardNo: res.cardNo,
          vipCard: res.huiYuanQuanYiRooter
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div style={styles.body}>
        <div style={styles.body.topMenu}>
          <div>海南省</div>
          <img src={arrow} style={styles.body.topMenu.locationIcon} />
          <div style={styles.body.topMenu.search}>
            <img src={search} style={styles.body.topMenu.search.searchIcon} />
            <input type="text" style={styles.body.topMenu.search.inputText} />
            <img src={close} style={styles.body.topMenu.search.closeIcon} />
          </div>
        </div>
        <div style={styles.body.welcome}>
          <div style={styles.body.welcome.title}>
            尊贵的
            <span style={{ color: '#ffe3b4' }}>{this.state.cardTypeName}</span>
            会员
          </div>
          <div style={styles.body.welcome.cardnum}>
            <span>{this.state.cardNo}</span>
            <img src={iconSee} style={styles.body.welcome.cardnum.view} />
          </div>
          <div style={styles.body.welcome.desc}>
            <div style={styles.body.welcome.desc.first}>
              <img
                src={iconFirst}
                style={styles.body.welcome.desc.first.firstIcon}
              />
            </div>
            <div style={styles.body.welcome.desc.center}>
              鹏程集团白金湾养生谷为您精心准备了奢华的会员服务。欢迎您即刻开启尊崇会员之旅。
            </div>
            <div style={styles.body.welcome.desc.last}>
              <img
                src={iconLast}
                style={styles.body.welcome.desc.last.lastIcon}
              />
            </div>
          </div>
        </div>
        <div style={styles.body.vip}>
          <a
            href={
              this.state.vipCard
                ? '/#/Dynamic/' + this.state.vipCard
                : 'javascript:;'
            }
            style={styles.body.vip.card}
          >
            <img src={iconVip} style={styles.body.vip.card.iconVip} />
            <span style={styles.body.vip.card.text}>会员权益</span>
          </a>
        </div>
        <div style={styles.body.quick}>
          <a href="/#/Strategy" style={styles.body.quick.left}>
            <div>
              博鳌<span style={styles.body.quick.left.strategy}>攻略</span>
            </div>
            <img src={tipsLogo} style={styles.body.quick.left.leftIcon} />
          </a>
          <div style={styles.body.quick.center} />
          <a href="/#/Strategy" style={styles.body.quick.right}>
            <div>
              周边<span style={styles.body.quick.left.strategy}>攻略</span>
            </div>
            <img src={tips} style={styles.body.quick.right.rightIcon} />
          </a>
        </div>
      </div>
    );
  }
}

export default HomeSection;
