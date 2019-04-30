import React from 'react';
import { Link } from "react-router-dom";

import {Grid, WhiteSpace, Flex} from 'antd-mobile';

import BottomTabBar from './BottomTabBar';
import Swiper from './Swiper';

import { WEB_CONTEXT } from '../common/Utils';

import { getHome } from '../api/HomeAPI'

function GridItems(props) {
    return <Grid data={props.data}
                 columnNum={props.columnNum}
                 square={false}
                 hasLine={false}
                 renderItem={dataItem => (
                                             <Link to={dataItem.path} className='am-grid-item-inner-content'>
                                              <img src={dataItem.icon} alt="" className='am-grid-icon' style={{width:'60px',height:'60px'}}/>
                                              <div className='am-grid-text'>
                                                <span>{dataItem.label}</span>
                                              </div>
                                            </Link>
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
                { this.props.title && <div className="sub-title">{this.props.title}</div>}
                {template}
                <WhiteSpace size="sm" />
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

        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData = () => {
        getHome({
            pageName: 'HOME'
        }).then(res => {
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
                <BottomTabBar selectedTab='home' history={this.props.history}/>
            </div>
        );
    }
}

export default Home;
