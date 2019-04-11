import React, { Component } from 'react';

import { InputItem, Button, List } from 'antd-mobile';
import { createForm } from 'rc-form';

import login from './assets/images/login.png';
import mobile from './assets/images/mobile.png';
import password from './assets/images/password.png';

import './App.css';

class BasicInput extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handleChange = (value) => {
    console.log(value);
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps('username')}
            placeholder="请输入用户名"
            onChange={ this.handleChange }
          ><img className="weui-grid__icon" src={mobile} /></InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="请输入密码"
             onChange={ this.handleChange }
          ><img className="weui-grid__icon" src={password} /></InputItem>
        </List>
      </div>
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
      <div className="page">
        <div className="page__hd" style={{textAlign:'center'}}>
          <img className="weui-grid__icon" style={{height:'80px', width:'80px'}} src={login} />
        </div>
        <div className="page__bd page__bd_spacing">
            <BasicInputWrapper />
            <Button type='primary' style={{marginTop:'10px'}}>登 录</Button>
        </div>
      </div>
    );
  }
}

export default Login;
