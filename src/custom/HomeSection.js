import React from 'react';
import { Range, WingBlank, WhiteSpace, NavBar, Icon } from 'antd-mobile';
import { _callInterface } from 'api/CommonAPI';

import input from 'assets/images/home_bg02.png';

const arrow =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_arrow.png';
const search =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_search.png';
const close =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_close.png';
const iconVip =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_icon_vip.png';
const iconSee =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_message.png';
const iconFirst =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_icon.png';
const iconLast =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_icon_down.png';
const tips =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/icon_tips.png';
const tipsLogo =
  process.env.REACT_APP_FILE_URL_PREFIX +
  'file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/icon_tips_logo.png';

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
        backgroundColor: '#464646',
        borderRadius: '19px',
        //opacity: '0.1',
        marginLeft: '23px',
        padding: '0 9px 0 42px',
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
          color: '#fff',
          backgroundColor: '#464646',
          width: '140px'
        },
        closeIcon: {
          width: '24px',
          height: '24px'
        },
        inputIcon: {
          position: 'absolute',
          top: '0',
          left: '0'
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
        borderRadius: '40px',
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
      margin: '20px 20px 0 20px',
      padding: '6px 17px 6px 17px',
      borderRadius: '5px',
      border: 'solid 1px rgb(197, 165, 103, .36)',
      fontSize: '16px',
      color: '#ffe3b4',
      height: '65px',
      //opacity: '.36',
      backgroundColor: 'rgb(0, 0, 0, .36)',
      left: {
        display: 'flex',
        justifyContent: 'space-between',
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
          height: '35px'
          //marginLeft: '37px'
        }
      },
      center: {
        width: '1px',
        height: '65px',
        backgroundColor: '#838596',
        opacity: '0.36',
        marginLeft: '15px',
        marginRight: '15px'
      },
      right: {
        display: 'flex',
        justifyContent: 'space-between',
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
          height: '35px'
          //marginLeft: '37px'
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
    vipCard: '',
    maskCardNo: '',
    showCardNo: false
  };

  componentDidMount() {
    this._isMounted = true;
    let oThis = this;
    //
    var interfaceName = 'getMemberCardInfo'; // 接口名称
    var params = {}; // 向接口提交的参数
    _callInterface(interfaceName, params).then(res => {
      //
      console.log('------------data-------------');
      console.log(res);

      if (res == null) {
        this.props.page.props.history.push('/Login');
        return;
      }

      let cardNo = res.cardNo;
      let maskCardNo = !!cardNo
        ? cardNo.slice(0, 3) + '****' + cardNo.slice(7)
        : '';

      if (oThis._isMounted) {
        oThis.setState({
          cardTypeName: res.cardTypeName,
          cardNo: cardNo,
          maskCardNo: maskCardNo,
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
          <div>海南</div>
          <img src={arrow} style={styles.body.topMenu.locationIcon} />
          <div style={styles.body.topMenu.search}>
            <img src={search} style={styles.body.topMenu.search.searchIcon} />
            <input type="text" style={styles.body.topMenu.search.inputText} />
          </div>
        </div>
        <div style={styles.body.welcome}>
          <div style={styles.body.welcome.title}>
            尊贵的
            <span style={{ color: '#ffe3b4' }}>{this.state.cardTypeName}</span>
            会员
          </div>
          <div style={styles.body.welcome.cardnum}>
            {this.state.showCardNo && <span>{this.state.maskCardNo}</span>}
            {this.state.showCardNo && <span>{this.state.cardNo}</span>}
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
          <a href="/#/Strategy?title=博鳌攻略" style={styles.body.quick.left}>
            <div>
              博鳌<span style={styles.body.quick.left.strategy}>攻略</span>
            </div>
            <img src={tipsLogo} style={styles.body.quick.left.leftIcon} />
          </a>
          <div style={styles.body.quick.center} />
          <a href="/#/Strategy?title=周边攻略" style={styles.body.quick.right}>
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
