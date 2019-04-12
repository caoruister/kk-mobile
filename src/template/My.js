import React, { Component } from 'react';

import { List, Icon } from 'antd-mobile';
import BottomTabBar from '../common/BottomTabBar';
import { WEB_CONTEXT } from '../common/Utils';

import './My.css';

const Item = List.Item;

class My extends React.Component {
  componentDidMount() {
    document.title = '我的';
  }

  render() {
    return (
      <div >
				<div style={{backgroundColor: '#4182e6', height:'100px'}}>
					<div className='circle'></div>
				</div>

				<List>
					<Item
						arrow="horizontal"
						thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
						onClick={() => {}}>我的信息</Item>
				</List>
        <BottomTabBar selectedTab='my'/>
      </div>
    );
  }
}

export default My;
