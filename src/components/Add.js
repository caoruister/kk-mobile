import React from 'react';
import qs from 'qs';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch, Flex, PickerView, Radio, NavBar, Icon} from 'antd-mobile';
import { createForm } from 'rc-form';

import Lookup from './Lookup';
import ButtonSection from './ButtonSection';
import Sections from './Sections';

import { getAdd, saveAdd, uploadFile } from '../api/AddAPI';
import { _callInterface } from '../api/CommonAPI';

import { WEB_CONTEXT, FILE_URL_PREFIX, formatDate, formatTime } from '../common/Utils';

import '../assets/weui.css';

class Add extends React.Component {
    _isMounted = false;

    state = {
        sections: [],
        buttons: [],
        layoutid: '',
        layoutName: '',
        objLabel: '',
        objid: '',
        id: '',
        fieldIdMap: {},
        fieldNameMap: {},
        lookupModal: false,
        currentLookupField: {},
        navTitle: ''
    }

    componentDidMount() {
        this._isMounted = true;

        //debugger
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

    showLookupModal(field) {
        //console.log(field);
        if (field.readOnly) {
            return;
        }

        this.setState({
            lookupModal: true,
            currentLookupField: field
        });
    }

    selectLookup(field) {
        //console.log(record);

        this.state.currentLookupField.value.id = this.state.currentLookupField.lookupObjShowedFieldid;
        this.state.currentLookupField.value.name = field.name;

        this.setState({
            lookupModal: false,
        });
    }

    getFieldValue = (fieldName) => {
        return this.state.fieldNameMap[fieldName] && this.state.fieldNameMap[fieldName].value;
    }

    setFieldValue = (fieldName, value) => {
        this.state.fieldNameMap[fieldName] && (this.state.fieldNameMap[fieldName].value =  value) && this.setState({});
    }

    callInterface = (apiName, data, callback)=> {
        _callInterface(apiName, data).then((res)=>{
            !!callback && callback(res);
        });
    }

    getData = () => {

        let layoutid = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).layoutid;
        let notNeedLogin = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).notNeedLogin;
        let title = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).title;

        let params = {
            objid: this.props.match.params.objid,
            notNeedLogin: notNeedLogin,
            layoutid: layoutid,
        };

        getAdd(params).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
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

                    if (field.type === "D" || field.type === "F") {
                        field.value = new Date();
                    } else if (field.type === "L") {
                        field.value = [];
                    } else if (field.type === "IMG") {
                        field.value = [];
                    } else if (field.type === "Y") {
                        field.value = {
                            id: field.lookupObjShowedFieldid,
                            name: ''
                        };
                    }
                }
            }

            if (this._isMounted) {
                this.setState({
                    sections: res.sections || [],
                    buttons: res.buttons || [],
                    layoutid: res.layoutid,
                    layoutName: res.layoutName,
                    objLabel: res.objLabel,
                    objid: res.objid,
                    navTitle: title || res.layoutName
                });

                document.title = this.state.navTitle;

                //used in onload method
                let page = this;
                let onLoadMethod = res.events && res.events.onLoad;
                console.log(onLoadMethod);
                !!onLoadMethod && eval(onLoadMethod);
            }
        });
    }

    save = (callback) => {
        this.setState({
            errorMsg: '',
        });
        //e.preventDefault();
        //debugger
        this.props.form.validateFields((err, values) => {
            console.log('接收到的表单的值为: ', values);
            console.log(err);
            if (!err) {

                //
                let fieldValue = {};
                fieldValue.objid = this.state.objid;
                fieldValue.layoutid = this.state.layoutid;

                for (var key in values) {
                    //
                    let tempValue = values[key];
                    if (typeof(tempValue) == 'undefined') { // 如果不处理 值为 undefined 的情况，则 输入框中 清空值时，会导致 不提交 该字段的值（应该提交 空值）
                        fieldValue[key] = null;
                    } else {
                        //
                        let field = this.state.fieldIdMap[key];

                        if (field.type === 'IMG') {
                            fieldValue[key] = JSON.stringify(tempValue);
                        } else if (field.type === 'D') {
                            fieldValue[key] = formatDate(tempValue);
                        } else if (field.type === 'F') {
                            fieldValue[key] = formatTime(tempValue);
                        } else if (field.type === 'L') {
                            fieldValue[key] = tempValue.length > 0 ? tempValue[0] : null
                        } else {
                            fieldValue[key] = tempValue;
                        }
                    }
                }

                console.log('saveAdd:');
                console.log(fieldValue);
                //
                return saveAdd(fieldValue).then(res => {
                    if (res == null) {return;}
                    //
                    if (res) {
                        if (res.errorMsg) {
                            this.setState({
                                errorMsg: res.errorMsg,
                            });
                        } else {
                            let navigateBackDelta = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).navigateBackDelta;
                            let back = ~navigateBackDelta+1;
                            console.log('goback:' + back);

                            !!callback ? callback(res.id) : this.props.history.go(back !== 0 ? back : -1);
                            //window.location.href = WEB_CONTEXT + '/#/List/' + this.props.objid;
                        }
                    }
                });
            }
        });
    }

    render() {
        let {lookupModal, currentLookupField, sections, buttons, navTitle} = this.state;

        return (
            <div>
                <div>
                    {lookupModal && <Lookup objid={currentLookupField.lookupObjid} lookupObjShowedFieldid={currentLookupField.lookupObjShowedFieldid} selectLookup={record=>this.selectLookup(record)}/>}
                </div>
                <NavBar
                    mode="dark"
                    leftContent={[
                    <Icon key="0" type="left" size="lg"/>,
                  ]}
                    onLeftClick={() => this.props.history.goBack()}
                    >{navTitle}</NavBar>
                <div style={{paddingBottom:'80px'}} ref={ node => this.contentNode = node }>
                    <div className={lookupModal ? 'hide' : 'show'} >
                        <form>
                            <Sections sections={sections} showLookupModal={field=>this.showLookupModal(field)} form={this.props.form}/>
                            <ButtonSection buttons={buttons} page={this} useDefault={true}/>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default createForm()(Add);
