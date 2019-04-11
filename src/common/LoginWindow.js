import React from 'react';
import { Modal, Button, Input, Icon } from 'antd';
import { login } from '../controller/Login';
import cookie from 'react-cookies'
import { WEB_CONTEXT } from './Utils';

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

class LoginWindow extends React.Component {
  state = {
    username: '', // 'zxm@qq.com',
    password: '', // '1',
    visible: false,
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  onChangeOfUsername = (e)=> {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeOfPassword = (e)=> {
    this.setState({
      password: e.target.value,
    });
  }
  onPressEnterOfUsername = (e)=> {
    let username = e.target.value;
    if (username == null || username === '') {
      alert('请输入用户名');
      document.getElementById('idOfUsername').focus();
      return;
    } else {
      document.getElementById('idOfPassword').focus();
      document.getElementById('idOfPassword').select();
    }
  }
  onPressEnterOfPassword = (e)=> {
    let password = e.target.value;
    if (password == null || password === '') {
      alert('请输入密码');
      document.getElementById('idOfPassword').focus();
      return;
    } else {
      this.handleOk();
    }
  }
  handleOk = ()=> {
    let username = this.state.username;
    let password = this.state.password;
    if (username == null || username === '') {
      alert('请输入用户名');
      document.getElementById('idOfUsername').focus();
      return;
    }
    if (password == null || password === '') {
      alert('请输入密码');
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
          visible: false,
          username: null,
          password: null,
        });
        //
        if (this.props.callbackOnSuccess) {
          this.props.callbackOnSuccess();
        }
				//
				if (window.localStorage) {
          localStorage.removeItem("__SystemSettingMenusAllowed__");
        }
				//
				let defaultMenu = res.defaultMenu;
				if (defaultMenu != null && defaultMenu.url != null && defaultMenu.url != '') {
        	window.location.href = WEB_CONTEXT + defaultMenu.url;
					cookie.save('__clickedMenuItemId__', defaultMenu.menuItemId, { path: '/' });
					cookie.save('__defaultUrl__', WEB_CONTEXT + defaultMenu.url, { path: '/' });
				} else {
        	window.location.href = WEB_CONTEXT + '/#/Home';
					cookie.save('__clickedMenuItemId__', 'Menu.Item.Home', { path: '/' });
					cookie.save('__defaultUrl__', WEB_CONTEXT + '/#/Home', { path: '/' });
				}
        window.location.reload();
      }
    });
  }
  render() {
    let oThis = this;
    window.showLoginWindow = function() {
			document.title = '登录';
			//
      oThis.setState({
        visible: true,
      });
    }
    //
    return (
      <Modal
            title='登录'
            width={300}
            maskStyle={{background: '#2A94D6'}}
            visible={this.state.visible}
            onCancel={this.hideModal}
            closable={false}
            footer={[
              <Button key="ok" onClick={this.handleOk}>登录</Button>,
            ]}
            onOk={this.handleOk}
            maskClosable={false}
          >
          <table width="98%">
          <tbody>
          <tr height='40px'>
            <td><Input id='idOfUsername' onPressEnter={ this.onPressEnterOfUsername } value={this.state.username} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" onChange={ this.onChangeOfUsername } /></td>
          </tr>
          <tr height='40px'>
            <td><Input id='idOfPassword' onPressEnter={ this.onPressEnterOfPassword } value={this.state.password} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" onChange={ this.onChangeOfPassword } /></td>
          </tr>
          </tbody>
          </table>
      </Modal>
    );
  }
}

export default LoginWindow;
