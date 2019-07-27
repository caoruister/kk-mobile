import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  withRouter
} from 'react-router-dom';

import {
  Toast,
  InputItem,
  Button,
  List,
  WingBlank,
  Flex,
  WhiteSpace
} from 'antd-mobile';
import { createForm } from 'rc-form';
import { login, logout, sendSMS, loginBySMS } from '../api/LoginAPI';
import { WEB_CONTEXT, LOGIN_TYPE } from '../common/Utils';

import 'components/Login.less';

import loginImg from '../assets/images/logo.png';
import mobile from '../assets/images/mobile.png';
import password from '../assets/images/password.png';
import agreeIcon from '../assets/images/icon_choise.png';

var styles = {
  getCode: {
    fontSize: '18px',
    color: '#acacac'
  },
  loginButton: {
    backgroundColor: '#cc9e48',
    borderRadius: '5px',
    marginTop: '44px',
    fontSize: '19px',
    color: '#fff',
    height: '52px',
    lineHeight: '52px'
  },
  agreement: {
    position: 'fixed',
    bottom: '6%',
    left: '0',
    right: '0',
    padding: '0 15px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    icon: {
      width: '18px',
      height: '18px'
    },
    doc: {
      fontSize: '14px',
      color: '#838596',
      marginLeft: '13px',
      link: {
        color: '#838596',
        textDecoration: 'underline'
      }
    }
  }
};

function Base64() {
  // private property
  this._keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  // public method for encoding
  this.encode = function(input) {
    var output = '';
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = this._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output =
        output +
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }
    return output;
  };

  // private method for UTF-8 encoding
  this._utf8_encode = function(string) {
    string = string.replace(/\r\n/g, '\n');
    var utftext = '';
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
}

class BasicInput extends React.Component {
  _isMounted = false;

  state = {
    loginType: LOGIN_TYPE,

    //username: 'admin@kkdev.com',
    //password: '1',
    username: '',
    password: '',

    phoneNum: '',
    smsCode: '',
    time: '获取验证码', //倒计时
    currentTime: 61,
    reGetButtonDisable: false
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  /**
   * 发送验证码
   */
  getCode = () => {
    var that = this;
    if (this.state.reGetButtonDisable) return;

    let phone = this.state.phoneNum;
    if (!phone) {
      Toast.info('请输入11位手机号码');
      document.getElementById('idOfPhoneNum').focus();
      return;
    }

    let params = {
      phone: phone
    };
    sendSMS(params).then(res => {
      console.log(res);
      if (res.success === true) {
        Toast.success('短信发送成功');
        that.setTime();
      }
    });
  };
  setTime = () => {
    var that = this;

    that._isMounted &&
      that.setState({
        reGetButtonDisable: true
      });
    var currentTime = that.state.currentTime;
    let interval = setInterval(function() {
      currentTime--;
      that._isMounted &&
        that.setState({
          time: currentTime + '秒'
        });
      if (currentTime <= 0) {
        clearInterval(interval);

        that._isMounted &&
          that.setState({
            time: '重新获取',
            currentTime: 61,
            reGetButtonDisable: false
          });
      }
    }, 1000);
  };
  onChangeOfUsername = value => {
    this.setState({
      username: value
    });
  };
  onChangeOfPassword = value => {
    this.setState({
      password: value
    });
  };

  onChangeOfPhoneNum = value => {
    this.setState({
      phoneNum: value
    });
  };
  onChangeOfSMSCode = value => {
    this.setState({
      smsCode: value
    });
  };

  handleOk = () => {
    let username = this.state.username;
    let password = this.state.password;
    if (username == null || username === '') {
      Toast.info('请输入用户名');
      document.getElementById('idOfUsername').focus();
      return;
    }
    if (password == null || password === '') {
      Toast.info('请输入密码');
      document.getElementById('idOfPassword').focus();
      return;
    }
    username = username.toString();
    password = password.toString();
    //
    let base64 = new Base64();
    let username0 = base64.encode(
      base64.encode(
        base64.encode(username) +
          base64.encode(username) +
          base64.encode(username) +
          base64.encode(username) +
          base64.encode(username)
      )
    );
    let password0 = base64.encode(
      base64.encode(
        password +
          password +
          password +
          password +
          password +
          password +
          password
      )
    );
    let str1 = base64.encode(username0);
    let str2 = base64.encode(password0);

    let info = {
      str1: str1,
      str2: str2
    };
    info = base64.encode(base64.encode(JSON.stringify(info)));
    //
    login(info).then(res => {
      if (res == null) {
        return;
      }
      //
      console.log(res);
      if (res.success === true) {
        //	window.location.href = WEB_CONTEXT + '/#/My';
        this.props.history.replace('/My');
      }
    });
  };

  handleOkBySMS = () => {
    let phoneNum = this.state.phoneNum;
    let smsCode = this.state.smsCode;
    if (phoneNum == null || phoneNum === '') {
      Toast.info('请输入11位手机号码');
      document.getElementById('idOfPhoneNum').focus();
      return;
    }
    if (smsCode == null || smsCode === '') {
      Toast.info('请输入短信验证码');
      document.getElementById('idOfSMSCode').focus();
      return;
    }

    let params = {
      phone: phoneNum,
      verifyCode: smsCode,
      type: 2 //短信验证码登录
    };
    loginBySMS(params).then(res => {
      if (res == null) {
        return;
      }
      //
      console.log(res);
      if (res.success === true) {
        //	window.location.href = WEB_CONTEXT + '/#/My';
        this.props.history.replace('/Home');
      }
    });
  };
  render() {
    const { getFieldProps } = this.props.form;

    console.log(this.state.loginType);

    return (
      <div>
        {this.state.loginType == 1 && (
          <List>
            <InputItem
              {...getFieldProps('username')}
              placeholder="请输入用户名"
              onChange={this.onChangeOfUsername}
              value={this.state.username}
              id="idOfUsername"
            >
              <img
                style={{ margin: '0 auto', display: 'block' }}
                src={mobile}
              />
            </InputItem>
            <InputItem
              {...getFieldProps('password')}
              type="password"
              placeholder="请输入密码"
              onChange={this.onChangeOfPassword}
              value={this.state.password}
              id="idOfPassword"
            >
              <img
                style={{ margin: '0 auto', display: 'block' }}
                src={password}
              />
            </InputItem>
          </List>
        )}

        {this.state.loginType == 2 && (
          <List>
            <InputItem
              {...getFieldProps('phoneNum')}
              placeholder="11位手机号码"
              type="number"
              maxLength="11"
              onChange={this.onChangeOfPhoneNum}
              value={this.state.phoneNum}
              className="login-input"
              id="idOfPhoneNum"
            >
              <img
                style={{ margin: '0 auto', display: 'block' }}
                src={mobile}
              />
            </InputItem>
            <InputItem
              {...getFieldProps('smsCode')}
              type="number"
              placeholder="短信验证码"
              onChange={this.onChangeOfSMSCode}
              value={this.state.smsCode}
              className="login-input"
              id="idOfSMSCode"
              extra={
                <a
                  disabled={this.state.reGetButtonDisable}
                  onClick={this.getCode}
                  style={styles.getCode}
                >
                  {this.state.time}
                </a>
              }
            >
              <img
                style={{ margin: '0 auto', display: 'block' }}
                src={password}
              />
            </InputItem>
          </List>
        )}

        <WingBlank>
          <Button
            style={styles.loginButton}
            onClick={
              this.state.loginType == 1 ? this.handleOk : this.handleOkBySMS
            }
          >
            登录
          </Button>

          <WhiteSpace size="md" />
          {this.state.loginType == 1 && (
            <Flex justify="between">
              <a href="/#/Add/register?notNeedLogin=true" className="inline">
                注册
              </a>
              <a href="/#/Home?notNeedLogin=true" className="inline">
                我是游客
              </a>
            </Flex>
          )}
        </WingBlank>

        <div style={styles.agreement}>
          <img src={agreeIcon} style={styles.agreement.icon} />
          <div style={styles.agreement.doc}>
            我已阅读并同意
            <a
              href="/#/view/FF8080816BFD6783016BFF3BB1B7024A/FF8080816C19D838016C1D7FF0F50545?notNeedLogin=true"
              style={styles.agreement.doc.link}
            >
              《白金湾会员服务协议》
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const BasicInputWrapper = createForm()(withRouter(BasicInput));

class Login extends React.Component {
  componentDidMount() {
    document.title = '登录';
    this.clearItems();
  }
  clearItems = () => {
    logout();
    //
    localStorage.removeItem('__token__');
    localStorage.removeItem('__token__userName');
    localStorage.removeItem('__orgid__');
  };
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <img style={{ height: '80px', width: '80px' }} src={loginImg} />
        </div>
        <BasicInputWrapper />
      </div>
    );
  }
}

export default Login;
