import React from 'react';

import { List, Icon, Button } from 'antd-mobile';
import { WEB_CONTEXT } from '../common/Utils';

import plusIcon from '../assets/images/plus.png';

import './Section.css';

class Section extends React.Component {
    state = {
        items: [
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
        const items = this.state.items;

        const apps = items.map((item)=>
            <a src={item.path} className='weui-grid' hoverClassName="weui-grid_active">
                <image className="weui-grid__icon" src={item.icon} style={{width:'28px',height:'28px'}} />
                <div className="weui-grid__label">{item.label}</div>
            </a>
        );

        return (
            <div>
                <div className="weui-panel">
                    <div className="weui-panel__hd">{'常用应用'}</div>
                    <div className="weui-panel__bd">
                        <div className="weui-grids">
                            {apps}
                        </div>
                    </div>
                </div>
                <div className="bottom-gap"></div>
            </div>
        );
    }
}

export default Section;
