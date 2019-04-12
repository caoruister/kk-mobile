import React, { Component } from 'react';

import { List, Icon, Button } from 'antd-mobile';
import BottomTabBar from './BottomTabBar';
import { logout } from '../api/LoginAPI';
import { WEB_CONTEXT } from '../common/Utils';

import './My.css';

const Item = List.Item;

class My extends React.Component {
	state = {
    list: [],
		userInfo: {},
	}
  componentDidMount() {
    document.title = '我的';

		let token = localStorage.getItem('__token__');
    if (token == null || token == '') {
      window.location.href = WEB_CONTEXT + '/#/Login';
    } else {
			// this.getData(token);
    }
  }
	logout = () => {
		logout().then(res => {
      if (res == null) {return;}
      //
			console.log(res);
    });
		//
		localStorage.removeItem('__token__');
		localStorage.removeItem('__token__userName');
		window.location.href = WEB_CONTEXT + '/#/Login';
	}
  render() {
		let userInfo = this.state.userInfo;

    return (
      <div className="">
				<div style={{backgroundColor: '#4182e6', height:'100px'}}>
					<table border='0'>
					<tbody>
					<tr>
					<td><div className='circle'></div></td>
					<td>
						<table border='0'>
						<tbody>
						<tr><td>{userInfo.label1}</td></tr>
						<tr><td>{userInfo.label1}</td></tr>
						</tbody>
						</table>
					</td>
					</tr>
					</tbody>
					</table>
				</div>

				<div>
					<List>
						<Item
							arrow="horizontal"
							thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
							onClick={() => {}}>我的信息</Item>
						<Item
							arrow="horizontal"
							thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
							onClick={() => {}}>我的建立</Item>
						<Item
							arrow="horizontal"
							thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
							onClick={() => {}}>我的投递</Item>
					</List>
				</div>

				<div>
					<Button style={{marginTop:'10px'}} onClick={this.logout}>退出</Button>
				</div>

				<div>
					<BottomTabBar selectedTab='my'/>
				</div>
      </div>
    );
  }
}

export default My;
