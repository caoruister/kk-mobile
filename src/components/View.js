import React from 'react';
import qs from 'qs';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch, Flex, NavBar, Icon} from 'antd-mobile';

import { getView } from '../api/ViewAPI';
import { _callInterface } from '../api/CommonAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX } from '../common/Utils';

import '../assets/weui.css';

class SectionItems extends React.Component {

    render() {

        return this.props.sections.map((section, idx1)=>
                <List key={section.key+idx1} renderHeader={section.title}>
                    {
                        section.fields.map((field, idx2)=> {
                            if (field.type === 'B') {
                                return <List.Item key={field.fieldid+idx2} extra={field.value}>{field.label}</List.Item>
                            } else if (field.type === 'IMG') {
                                return <List.Item key={field.fieldid+idx2} extra={<img src={FILE_URL_PREFIX + field.value[0].thumbnail_url} alt=''/>}>
                                            {field.label}
                                        </List.Item>
                            } else if (field.type === 'X') {
                                return <div key={field.fieldid+idx2}>
                                            <List.Item
                                                extra={field.value}
                                                >{field.label}</List.Item>

                                        </div>
                            } else {
                                return <List.Item key={field.fieldid+idx2} extra={field.value || field.value2}>{field.label}</List.Item>
                            }
                        })
                    }
                </List>
        )
    }
}

class ButtonItems extends React.Component {

    onClickHandler(onClick) {
        let page = this.props.page;
        console.log(onClick);

        //debugger
        eval(onClick);
    }

    render() {
        let buttons = '';
        if (this.props.buttons.length !== 0) {
            buttons = this.props.buttons.map((button, idx)=><Flex.Item key={button.id+idx}><Button type="primary" style={{ marginRight: '4px' }} onClick={()=>{this.onClickHandler(button.events.onClick)}}>{ button.text }</Button></Flex.Item>)
        }

        return (
            <WingBlank>
                <Flex>
                    {buttons}
                </Flex>
            </WingBlank>
        )
    }

}

class View extends React.Component {
    _isMounted = false;

    state = {
        sections: [],
        buttons: [],
        layoutid: '',
        objLabel: '',
        objid: '',
        id: '',
        fieldIdMap: {},
        fieldNameMap: {},
    }

    componentDidMount() {
        this._isMounted = true;
        document.title = '查看';

        //debugger
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

    componentDidUpdate (prevProps) {
        //debugger
        // 上面步骤3，通过参数更新数据
        //let oldId = prevProps.params.invoiceId
        //let newId = this.props.params.invoiceId
        //if (newId !== oldId)
        //    this.fetchInvoice()
    }

    callInterface = (apiName, data, callback)=> {
        _callInterface(apiName, data).then((res)=>{
            !!callback && callback(res);
        });
    }

    getFieldValue = (fieldName) => {
        return this.state.fieldNameMap[fieldName] && this.state.fieldNameMap[fieldName].value;
    }

    setFieldValue = (fieldName, value) => {
        this.state.fieldNameMap[fieldName] && (this.state.fieldNameMap[fieldName].value =  value) && this.setState({});
    }

    getId = () => {
        return this.state.id;
    }

    getData = () => {
        //console.log(this.props)

        let layoutid = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).layoutid;
        let notNeedLogin = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).notNeedLogin;
        let title = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).title;

        let params = {
            id: this.props.match.params.id,
            objid: this.props.match.params.objid,
            notNeedLogin: notNeedLogin,
            layoutid: layoutid,
        };

        getView(params).then(res => {
            if (res == null || !res) {
                //window.location.href = WEB_CONTEXT + '/#/Login';
                this.props.history.push('/Login', null);
                return;
            }
            //
            console.log(res);

            let sections = res.sections;
            for (var i = 0; i < sections.length; i++) {
                let section = sections[i];
                let fields = section.fields;
                for (var k = 0; k < fields.length; k++) {
                    let field = fields[k];
                    this.state.fieldIdMap[field.fieldid] = field;
                    this.state.fieldNameMap[field.name] = field;
                }
            }

            if (this._isMounted) {
                this.setState({
                    sections: res.sections || [],
                    buttons: res.buttons || [],
                    layoutid: res.layoutid,
                    objLabel: res.objLabel,
                    objid: res.objid,
                    id: res.id
                });

                document.title = title || this.state.objLabel;

                //used in onLoad method
                let page = this;
                let onLoadMethodName = res.onLoadMethodName;
                console.log(onLoadMethodName);
                !!onLoadMethodName && eval(onLoadMethodName);
            }
        });
    }

    render() {
        const {sections, buttons} = this.state;

        return (
            <div style={{paddingBottom:'80px'}}>
                <NavBar
                    mode="dark"
                    leftContent={[
                    <Icon key="0" type="left"/>,
                  ]}
                    onLeftClick={() => this.props.history.goBack()}
                    ></NavBar>
                <SectionItems sections={sections}/>
                <ButtonItems buttons={buttons} page={this}/>
            </div>
        );
    }
}

export default View;
