import React from 'react';

import {Grid, WhiteSpace, Card} from 'antd-mobile';

import BottomTabBar from './BottomTabBar';
import Swiper from './Swiper';

import { WEB_CONTEXT } from '../common/Utils';

import { getHome } from '../api/HomeAPI'

import '../assets/weui.css';

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

class SectionItems extends React.Component {
    render() {
        return this.props.sections.map((section, idx) =>
                <Section key={section.templateType+idx} type={section.templateType} showSection={section.show} title={section.sectionTitle} showTitle={!section.hideSectionTitle} columnNum={section.columnCount}  data={section.data} />
        );
    }
}

class Section extends React.Component {

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
                <Card>
                    {this.props.showTitle && <Card.Header
                        title={this.props.title}
                        />}
                    <Card.Body>
                        {template}
                    </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
            </div>

        );
    }
}

class Home extends React.Component {
    _isMounted = false;

    state = {
        items: []
    }

    componentDidMount() {
        document.title = '首页';
        this._isMounted = true;

        let token = localStorage.getItem('__token__');
        if (token === null || token === '') {
            window.location.href = WEB_CONTEXT + '/#/Login';
        } else {
             this.getData(token);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData = () => {
        getHome({}).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }
            //
            console.log(res);

            if (this._isMounted) {
                this.setState({
                    items: res.items || [],
                });
            }
        });
    }
    render() {
        const {items} = this.state;

        return (
            <div>
                <div style={{paddingBottom:'80px'}}>
                    <SectionItems sections={items}/>
                </div>
                <BottomTabBar selectedTab='home'/>
            </div>
        );
    }
}

export default Home;
