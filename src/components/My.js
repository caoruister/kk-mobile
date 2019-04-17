import React, { Component } from 'react';

import { List, Icon, Button } from 'antd-mobile';
import BottomTabBar from './BottomTabBar';
import { logout } from '../api/LoginAPI';
import { getMy } from '../api/MyAPI';
import { WEB_CONTEXT } from '../common/Utils';

import '../assets/weui.css';

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
			this.getData();
    }
  }
	getData = () => {
		getMy().then(res => {
      if (res == null) {return;}
      //
			console.log(res);
			this.setState({
				list: (res.list == null ? [] : res.list),
				userInfo: (res.userInfo == null ? {} : res.userInfo),
			})
    });
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
		//
		let list = this.state.list;
		let listItems = [];
		for (var i = 0; i < list.length; i++) {
			let item = list[i];
			//
			listItems.push(
				<Item
					arrow="horizontal"
					key={('listItem-' + i)}
					thumb={item.icon}
					onClick={() => {
						window.location.href = WEB_CONTEXT + item.path;
					}}>{item.label}</Item>
			);
		}
    return (
			<div className="page">
				<div style={{backgroundColor: '#4182e6', height:'100px'}}>
					<table border='0'>
					<tbody>
					<tr>
					<td><div className='circle'><img src={ '..' + userInfo.headIcon} mode="scaleToFill"></img></div></td>
					<td>
						<table border='0'>
						<tbody>
						<tr><td className="nickname">{userInfo.name}</td></tr>
						<tr><td className="desc">{userInfo.desc}</td></tr>
						</tbody>
						</table>
					</td>
					</tr>
					</tbody>
					</table>
				</div>

			  <div className="page__bd">
			    <div className="weui-panel">
			      <div className="weui-panel__bd">
			        <div className="weui-grids">
			          <div className="weui-grid">
			            <div className="title">
			              <div className="weui-grid__icon">{userInfo.label1}</div>
			              <div className="weui-grid__label" style={{color:'#f55b34'}}>{userInfo.text1}</div>
			            </div>
			          </div>
			          <div className="weui-grid">
			            <div className="title">
			              <div className="weui-grid__icon">{userInfo.label2}</div>
			              <div className="weui-grid__label" style={{color:'#3d8de9'}}>{userInfo.text2}</div>
			            </div>
			          </div>
			          <div className="weui-grid">
			            <div className="weui-grid__icon">{userInfo.label3}</div>
			            <div className="weui-grid__label" style={{color:'#fea33a'}}>{userInfo.text3}</div>
			          </div>
			        </div>
			      </div>
			    </div>

			    <div className="weui-panel">
			      <div className="weui-panel__bd">
							<List>
								{listItems}
							</List>
			      </div>
			    </div>

					<div>
						<Button style={{marginTop:'10px'}} onClick={this.logout}>退出</Button>
					</div>

					<div>
						<BottomTabBar selectedTab='my'/>
					</div>
			  </div>
			</div>
    );
  }
}

export default My;
