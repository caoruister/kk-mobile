import React from 'react';

import { List, Icon, Button } from 'antd-mobile';
import Section from './Section';
import BottomTabBar from './BottomTabBar';
import { WEB_CONTEXT } from '../common/Utils';

import './Home.css';

class Home extends React.Component {
    state = {
        list: [],
        userInfo: {},
    }
    componentDidMount() {
        document.title = '首页';

        let token = localStorage.getItem('__token__');
        if (token === null || token === '') {
            window.location.href = WEB_CONTEXT + '/#/Login';
        } else {
            // this.getData(token);
        }
    }
    render() {
        return (
            <div>
                <Section/>
                <BottomTabBar selectedTab='home'/>
            </div>
        );
    }
}

export default Home;
