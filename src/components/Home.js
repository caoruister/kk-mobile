import React from 'react';

import {Grid, WhiteSpace} from 'antd-mobile';

import BottomTabBar from './BottomTabBar';
import Swiper from './Swiper';

import { WEB_CONTEXT } from '../common/Utils';

import { getHome } from '../api/HomeAPI'

import './Home.css';

function GridItems(props) {
    return <Grid data={props.data}
                 columnNum={props.columnNum}
                 renderItem={dataItem => (
                                             <a href={dataItem.path} className='am-grid-item-inner-content'>
                                              <img src={dataItem.icon} alt="" className='am-grid-icon'/>
                                              <div className='am-grid-text'>
                                                <span>{dataItem.label}</span>
                                              </div>
                                            </a>
                                          )}
        />
}

class Section extends React.Component {

    componentDidMount() {
    }

    render() {
        //debugger
        //const {templateType,show,hideSectionTitle,columnCount,data} = this.props.sectionData;

        let template = null;
        if (this.props.type === 'topItems') {
            template = <GridItems data={this.props.data} columnNum={this.props.columnNum}/>;
        } else if (this.props.type === 'swiper') {
            template = <Swiper data={this.props.data}/>;
        }

        return (
            this.props.showSection &&
            <div>
                <div className="weui-panel">
                    {this.props.showTitle && <div className="weui-panel__hd">{this.props.title}</div>}
                    <div className="weui-panel__bd">
                        {template}
                    </div>
                </div>
                <WhiteSpace size="lg" />
            </div>
        );
    }
}

class Home extends React.Component {
    state = {
        items: []
    }
    componentDidMount() {
        document.title = '首页';

        let token = localStorage.getItem('__token__');
        if (token === null || token === '') {
            window.location.href = WEB_CONTEXT + '/#/Login';
        } else {
             this.getData(token);
        }
    }
    getData = () => {
        getHome({}).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }
            //
            console.log(res);

            this.setState({
                items: res.items || [],
            });
        });
    }
    render() {
        const {items} = this.state;

        const sections = items.map((section, idx) =>
            <Section key={section.templateType+idx} type={section.templateType} showSection={section.show} title={section.sectionTitle} showTitle={!section.hideSectionTitle} columnNum={section.columnCount}  data={section.data} />
        );

        return (
            <div>
                <div style={{paddingBottom:'80px'}}>
                    {sections}
                </div>
                <BottomTabBar selectedTab='home'/>
            </div>
        );
    }
}

export default Home;
