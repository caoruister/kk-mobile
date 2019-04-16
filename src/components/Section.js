import React from 'react';

import { WhiteSpace, Grid } from 'antd-mobile';

import Swiper from './Swiper';
import Image from './Image';

import { WEB_CONTEXT } from '../common/Utils';

import './Section.css';

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

    constructor(props) {
        super(props);
    }
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

export default Section;
