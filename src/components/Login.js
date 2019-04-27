import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import { Toast, InputItem, Button, List, WingBlank, Flex, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';
import { login } from '../api/LoginAPI';
import { WEB_CONTEXT } from '../common/Utils';

import loginImg from '../assets/images/login.png';
import mobile from '../assets/images/mobile.png';
import password from '../assets/images/password.png';

function Base64() {
	// private property
	this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

	// public method for encoding
	this.encode = function (input) {
		var output = "";
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
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
		}
		return output;
	}

	// private method for UTF-8 encoding
	this._utf8_encode = function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}
}

class BasicInput extends React.Component {
  state = {
    //username: 'admin@kkdev.com',
    //password: '1',
    username: '',
    password: '',
  }
  componentDidMount() {
  }
  onChangeOfUsername = (value) => {
    this.setState({
      username: value,
    });
  }
  onChangeOfPassword = (value) => {
    this.setState({
      password: value,
    });
  }
  handleOk = ()=> {

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
    let username0 = base64.encode(base64.encode(base64.encode(username) + base64.encode(username) + base64.encode(username) + base64.encode(username) + base64.encode(username)));
    let password0 = base64.encode(base64.encode(password + password + password + password + password + password + password));
    let str1 = base64.encode(username0);
    let str2 = base64.encode(password0);

    let info = {
      str1 : str1,
      str2 : str2
    };
    info = base64.encode(base64.encode(JSON.stringify(info)));
    //
    login(info).then(res => {
      if (res == null) {return;}
      //
			console.log(res);
      if (res.success === true) {
        this.setState({
          username: null,
          password: null,
        });
        //
				window.location.href = WEB_CONTEXT + '/#/Home';
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <WingBlank>
        <List>
          <InputItem
            {...getFieldProps('username')}
            placeholder="请输入用户名"
            onChange={ this.onChangeOfUsername }
            value={this.state.username}
            id='idOfUsername'
          ><img style={{margin:'0 auto', display:'block'}} src={mobile} /></InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="请输入密码"
            onChange={ this.onChangeOfPassword }
            value={this.state.password}
            id='idOfPassword'
          ><img style={{margin:'0 auto', display:'block'}} src={password} /></InputItem>
        </List>
        <Button type='primary' style={{marginTop:'10px'}} onClick={this.handleOk}>登录</Button>

        <WhiteSpace size="md" />
        <Flex justify="between">
          <Link to="/Add/register?notNeedLogin=true" className="inline">注册</Link>
          <Link to="/Home?notNeedLogin=true" className="inline">我是游客</Link>
        </Flex>

      </WingBlank>
    );
  }
}

const BasicInputWrapper = createForm()(BasicInput);

class Login extends React.Component {
  componentDidMount() {
    document.title = '登录';
  }
  render() {
    return (
      <div>
        <div style={{textAlign:'center',padding:'40px'}}>
          <img style={{height:'80px', width:'80px'}} src={loginImg} />
        </div>
        <BasicInputWrapper />
      </div>
    );
  }
}

export default Login;
