import React, { Component } from 'react';

import { List, Icon, Button, WingBlank, WhiteSpace, Grid } from 'antd-mobile';
import BottomTabBar from './BottomTabBar';
import { logout } from '../api/LoginAPI';
import { getMy } from '../api/MyAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX } from '../common/Utils';

import '../assets/weui.css';

const Item = List.Item;

class My extends React.Component {
    _isMounted = false;

    state = {
        list: [],
        userInfo: {
            headIcon: [
                {
                    thumbnail_url: ''
                }
            ]
        },

        stats: Array.from(new Array(3)).map((_val, i) => ({
            label: '统计'+i,
            text: `32${i}`,
            style: {color:'#fea33a',fontSize:'36px'}
        }))
    }

    componentDidMount() {
        document.title = '我的';
        this._isMounted = true;

        let token = localStorage.getItem('__token__');
        if (token === null || token === '') {
            window.location.href = WEB_CONTEXT + '/#/Login';
        } else {
            this.getData();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData = () => {
        getMy().then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }
            //
            console.log(res);

            if (this._isMounted) {
                this.setState({
                    list: (res.list == null ? [] : res.list),
                    userInfo: (res.userInfo == null ? {} : res.userInfo),
                })
            }
        });
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
    }

    render() {
        const {userInfo, list, stats} = this.state;
        //
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
            <div style={{paddingBottom:'80px'}}>
                <div className="userinfo">
                    <div className='userinfo-avatar'>
                        <img src={ FILE_URL_PREFIX + this.state.userInfo.headIcon[0].thumbnail_url }
                             mode="scaleToFill"></img>
                    </div>

                    <div className="userinfo-nickname">
                        <div className="nickname">{userInfo.name}</div>
                        <div className="desc">{userInfo.desc}</div>
                    </div>

                    <div className="userinfo-barcode">
                        <img src={ FILE_URL_PREFIX  } mode="scaleToFill"></img>
                    </div>

                </div>

                <Grid data={stats}
                      columnNum={3}
                      renderItem={dataItem => (
                                             <div className='am-grid-item-inner-content'>
                                                  <div className='am-grid-text'>
                                                    <span style={{fontSize:'14px', color:'#d9d9d9'}}>{dataItem.label}</span>
                                                  </div>
                                                  <div className='am-grid-text'>
                                                    <span style={dataItem.style}>{dataItem.text}</span>
                                                  </div>
                                              </div>
                                          )}
                    />

                <WhiteSpace size="lg" />
                <List>
                    {listItems}
                </List>

                <WhiteSpace size="lg" />
                <WingBlank>
                    <Button type="primary" onClick={this.logout}>退出</Button>
                </WingBlank>

                <div>
                    <BottomTabBar selectedTab='my'/>
                </div>
            </div>
        );
    }
}

export default My;
