import React from 'react';

import { List, Icon, Button } from 'antd-mobile';
import Section from './Section';
import BottomTabBar from './BottomTabBar';
import { WEB_CONTEXT } from '../common/Utils';

import './Home.css';

class Home extends React.Component {
    state = {
        "items": [
            {
                "templateType": "swiper",
                "columnCount": 4,
                "hideSectionTitle": true,
                "show": true,
                "data": [
                    {
                        "imageUrl": "http://e.hiphotos.baidu.com/image/pic/item/eaf81a4c510fd9f993009d8c282dd42a2934a4c4.jpg",
                        "path": "/pages/webview/webview",
                        "webviewUrl": "https://www.smglpt.com/xcx2c/h5/h5-1.html"
                    },
                    {
                        "imageUrl": "http://attachments.gfan.net.cn/forum/201605/09/0032210gp8dk27z5t5dd0r.jpg",
                        "path": "/pages/webview/webview",
                        "webviewUrl": "https://www.smglpt.com/xcx2c/h5/h5-2.html"
                    }
                ]
            },
            {
                "templateType": "topItems",
                "columnCount": 3,
                "hideSectionTitle": true,
                "show": true,
                "data": [
                    {
                        "path": "/pages/webview/webview",
                        "webviewUrl": "https://www.smglpt.com/xcx2c/h5/h5-2.html",
                        "icon": "/assets/images/yellow/1_03-07.png",
                        "label": "睡眠常识"
                    },
                    {
                        "path": "/pages/webview/webview",
                        "webviewUrl": "https://www.smglpt.com/xcx2c/h5/h5-2.html",
                        "icon": "/assets/images/yellow/1_03-05.png",
                        "label": "睡眠新知"
                    },
                    {
                        "path": "/pages/add/add?layoutid=2C904B726986BDF70169A45EA3020375&objid=2C904B726986BDF70169A45E9CCE0368&notNeedLogin=true&title=自我评估",
                        "icon": "/assets/images/yellow/1_03-04.png",
                        "label": "自我评估"
                    }
                ]
            },
            {
                "templateType": "topItems",
                "columnCount": 4,
                "hideSectionTitle": true,
                "show": true,
                "data": [
                    {
                        "path": "/pages/view/view?layoutid=2C904B72692E41DB01692E4649D90055&objid=2C904B72686017330168605160FA0106&id=2C904B726860173301687DCD190102D3&notNeedLogin=true",
                        "icon": "http://www.smglpt.com/file/file?getthumb=D23881EA61C73BF20161C73BF2100012/2019/02/27/2C904B72692E422B01692E422B2B0000.jpg",
                        "label": "诊断设备"
                    },
                    {
                        "path": "/pages/view/view?layoutid=2C904B7269711BF3016971B5F64C00AB&objid=2C904B72686017330168605160FA0106&id=2C904B7268B173D10168CCDFADAD0331&notNeedLogin=true",
                        "icon": "http://www.smglpt.com/file/file?getthumb=D23881EA61C73BF20161C73BF2100012/2019/02/27/2C904B72692E422B01692E4260550002.jpg",
                        "label": "治疗设备"
                    },
                    {
                        "path": "/pages/view/view?layoutid=2C904B7269711BF3016971B6CC2500BB&objid=2C904B72686017330168605160FA0106&id=2C904B7268B173D10168CCE526F10332&notNeedLogin=true&title=绿色通道",
                        "icon": "http://www.smglpt.com/file/file?getthumb=D23881EA61C73BF20161C73BF2100012/2019/02/27/2C904B72692E422B01692E427BD60004.jpg",
                        "label": "绿色通道"
                    },
                    {
                        "path": "/pages/list/list?objid=2C904B72686017330168605160FA0106&notNeedLogin=true&title=配件耗材",
                        "icon": "http://www.smglpt.com/file/file?getfile=D23881EA61C73BF20161C73BF2100012/2019/02/18/2C904B7268FE62600168FE659E62000A.jpg",
                        "label": "配件耗材"
                    }
                ]
            },
            {
                "templateType": "topItems",
                "columnCount": 4,
                "hideSectionTitle": true,
                "show": true,
                "data": [
                    {
                        "path": "/pages/list/list?objid=2C904B72686017330168797345410283&title=我的订单&CONDITION_zfzt=all&MEMBER_FIELD_NAME=yhxm",
                        "icon": "/assets/images/yellow/1_03-05.png",
                        "label": "我的订单"
                    },
                    {
                        "path": "/pages/list/list?objid=2C904B726979BB9F016979D87EF100CF&title=我的设备&CONDITION_cplx=all&MEMBER_FIELD_NAME=yhxm",
                        "icon": "/assets/images/yellow/1_03-06.png",
                        "label": "我的设备"
                    },
                    {
                        "path": "/pages/list/list?objid=2C904B726979BB9F016979D87EF100CF&title=设备续租&CONDITION_cplx=呼吸机&layoutidOfViewPage=2C904B72697B849701697B9911450053&MEMBER_FIELD_NAME=yhxm",
                        "icon": "/assets/images/yellow/1_03-07.png",
                        "label": "设备续租"
                    },
                    {
                        "path": "/pages/list/list?objid=2C904B72686017330168797345410283&title=退款申请&CONDITION_zfzt=已支付&MEMBER_FIELD_NAME=yhxm",
                        "icon": "/assets/images/yellow/1_03-08.png",
                        "label": "退款申请"
                    }
                ]
            }
        ]
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
        const {items} = this.state;

        const sections = items.map((section) =>
            <Section data={section} />
        );

        return (
            <div>
                <div>
                    {sections}
                    {sections}
                    {sections}
                    <Section/>
                </div>
                <BottomTabBar selectedTab='home'/>
            </div>
        );
    }
}

export default Home;
