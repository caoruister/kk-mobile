import React from 'react';

import { WhiteSpace, Grid } from 'antd-mobile';

import Swiper from './Swiper';
import Image from './Image';

import { WEB_CONTEXT } from '../common/Utils';

import './Section.css';

function FieldItems(props) {
    return props.data.map((field, idx)=><Image key={field.fieldid+idx} field={field}/>);
}

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

        this.state = {
            "templateType": "topItems",
            "columnCount": 4,
            "hideSectionTitle": false,
            "sectionTitle": "常见应用",
            "show": true,
            "data": [
                {
                    "path": "/#/My",
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
    }
    componentDidMount() {
        let token = localStorage.getItem('__token__');
        if (token === null || token === '') {
            window.location.href = WEB_CONTEXT + '/#/Login';
        } else {
            // this.getData(token);
        }
    }

    render() {
        //debugger
        //const {templateType,show,hideSectionTitle,columnCount,data} = this.props.sectionData;

        let template = null;
        if (this.props.type === 'topItems') {
            template = <GridItems data={this.props.data} columnNum={this.props.columnNum}/>;
        } else if (this.props.type === 'swiper') {
            template = <Swiper data={this.props.data}/>;
        } else if (this.props.type === 'fieldItems') {
            template = <FieldItems data={this.props.data}/>
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
