import React from 'react';
import qs from 'qs';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch, Flex, PickerView, Radio, NavBar, Icon} from 'antd-mobile';
import { createForm } from 'rc-form';

import Lookup from './Lookup';
import { getAdd, saveAdd, uploadFile } from '../api/AddAPI';
import { _callInterface } from '../api/CommonAPI';

import { WEB_CONTEXT, FILE_URL_PREFIX, formatDate, } from '../common/Utils';

import '../assets/weui.css';

class SectionItems extends React.Component {

    onChangeOfValue(field, value) {
        console.log(field.fieldid + ':' + value);
        field.value = value;
        this.setState({});
    }

    onChangeOfFileValue(field, values, operationType) {
        //console.log(operationType);
        //console.log(values);

        if (operationType === 'add'){
            let formdata = new FormData();
            let orgid= localStorage.getItem('__orgid__');
            formdata.append("orgid", orgid);

            values && values.forEach((val, idx)=>{
                formdata.append("file", val.file);
            });

            uploadFile(formdata).then((res) => {

                res && res.map((img, idx)=>{
                    img.url = FILE_URL_PREFIX + img.url;
                    return img;
                });

                field.value = [...field.value, ...res];
                this.setState({});
            });
        } else if (operationType === 'remove') {
            field.value = values;
            this.setState({});
        }
        //console.log(field);
    }

    render() {

        const { getFieldProps } = this.props.form;

        return this.props.sections.map((section, idx1)=>
                <List key={section.key+idx1} renderHeader={section.title}>
                    {
                        section.fields.map((field, idx2)=> {
                            if (field.type === 'S') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="text"
                                    disabled={field.readOnly}
                                    maxLength={field.length}
                                    id={field.fieldid}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'N') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="number"
                                    disabled={field.readOnly}
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'H') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="phone"
                                    disabled={field.readOnly}
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'enc') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="password"
                                    disabled={field.readOnly}
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'L') {
                                let data = field.options.map((option)=> {
                                    return {"label": option.text, "value": option.value}
                                });

                                if (field.edittype === '1') {
                                    return <Picker
                                        {...getFieldProps(field.fieldid, {
                                            initialValue: field.value
                                        })}
                                        disabled={field.readOnly}
                                        key={field.fieldid+idx2} extra={'请选择'+field.label} data={data} cols={1} className="forss">
                                        <List.Item arrow="horizontal">{field.label}</List.Item>
                                    </Picker>
                                } else if (field.edittype === '2') {
                                    return <div key={field.fieldid+idx2}>
                                        <List.Item
                                            {...getFieldProps(field.fieldid, {
                                                initialValue: field.value
                                            })}
                                            >{field.label}</List.Item>
                                        {data.map(i => (
                                            <Radio.RadioItem key={i.value} checked={field.value === i.value} disabled={field.readOnly} onChange={this.onChangeOfValue.bind(this, field, i.value)}>
                                                {i.label}
                                            </Radio.RadioItem>
                                        ))}
                                    </div>
                                }
                            } else if (field.type === 'D') {
                                return <DatePicker
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    mode="date"
                                    disabled={field.readOnly}
                                    key={field.fieldid+idx2} extra={'请选择'+field.label}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    >
                                    <List.Item arrow="horizontal">{field.label}</List.Item>
                                </DatePicker>
                            } else if (field.type === 'X') {

                                return <TextareaItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    title={field.label}
                                    placeholder={'请输入'+field.label}
                                    key={field.fieldid+idx2}
                                    disabled={field.readOnly}
                                    rows={5}
                                    count={100}
                                    />
                            } else if (field.type === 'A') {

                            } else if (field.type === 'B') {
                                return <List.Item
                                    key={field.fieldid+idx2}
                                    extra={<Switch
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    checked={field.value}
                                    disabled={field.readOnly}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                  />}
                                    >{field.label}</List.Item>

                            } else if (field.type === 'IMG') {

                                let imageField = <div key={field.fieldid+idx2}>
                                    <List.Item
                                        >{field.label}</List.Item>
                                    <ImagePicker
                                        {...getFieldProps(field.fieldid, {
                                            initialValue: field.value
                                        })}
                                        files={field.value}
                                        onChange={this.onChangeOfFileValue.bind(this, field)}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={field.length < 7}
                                        multiple={false}
                                        />
                                </div>;
                                return imageField
                            } else if (field.type === 'Y') {
                                return <List.Item
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    extra={field.value.name}
                                    disabled={field.readOnly}
                                    arrow="horizontal" onClick={()=>{this.props.showLookupModal(field)}}
                                    >{field.label}</List.Item>
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
            buttons = this.props.buttons.map((button, idx)=><Flex.Item key={button.id+idx}><Button type="primary" style={{ marginRight: '4px' }} data-method-name={ button.methodName } onClick={()=>{this.onClickHandler(button.events.onClick)}}>{ button.text }</Button></Flex.Item>)
        } else {
            buttons = <Flex.Item><Button type="primary" style={{ marginRight: '4px' }} onClick={()=>{this.props.page.save()}}>确认</Button></Flex.Item>
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

class BasicForm extends React.Component {
    render() {
        const {sections, buttons, objid, layoutid, fieldIdMap} = this.props.state0;
        return (
            <form>
                <SectionItems sections={sections} showLookupModal={this.props.showLookupModal} form={this.props.form}/>
                <ButtonItems buttons={buttons} objid={objid} layoutid={layoutid} fieldIdMap={fieldIdMap} form={this.props.form} page={this.props.page}/>
            </form>
        );
    }
}

//const BasicFormWrapper = createForm()(BasicForm);

class Add extends React.Component {
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
        lookupModal: false,
        currentLookupField: {},
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

                    if (field.type === "D") {
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
                    objLabel: res.objLabel,
                    objid: res.objid
                });

                document.title = title || this.state.objLabel;

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
                values.objid = this.state.objid;
                values.layoutid = this.state.layoutid;
                //

                for (var key in values) {
                    //
                    let tempValue = values[key];
                    if (typeof(tempValue) == 'undefined') { // 如果不处理 值为 undefined 的情况，则 输入框中 清空值时，会导致 不提交 该字段的值（应该提交 空值）
                        values[key] = null;
                    } else if (Array.isArray(tempValue)) {
                        //noop
                    }

                    let field = this.state.fieldIdMap[key];
                    if (field && field.type === 'IMG') {
                        values[key] = JSON.stringify(tempValue);
                    } else if (field && field.type === 'D') {
                        values[key] = formatDate(tempValue);
                    }
                }

                console.log('saveAdd:');
                console.log(values);
                //
                return saveAdd(values).then(res => {
                    if (res == null) {return;}
                    //
                    if (res) {
                        if (res.errorMsg) {
                            this.setState({
                                errorMsg: res.errorMsg,
                            });
                        } else {
                            !!callback ? callback(res.id) : this.props.history.goBack();
                            //window.location.href = WEB_CONTEXT + '/#/List/' + this.props.objid;
                        }
                    }
                });
            }
        });
    }

    render() {
        let {lookupModal, currentLookupField, sections, buttons} = this.state;

        return (
            <div>
                <div>
                    {lookupModal && <Lookup objid={currentLookupField.lookupObjid} lookupObjShowedFieldid={currentLookupField.lookupObjShowedFieldid} selectLookup={record=>this.selectLookup(record)}/>}
                </div>
                <NavBar
                    mode="dark"
                    leftContent="Back"
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                  ]}
                    >NavBar</NavBar>
                <div style={{paddingBottom:'80px'}} ref={ node => this.contentNode = node }>
                    <div className={lookupModal ? 'hide' : 'show'} >
                        <form>
                            <SectionItems sections={sections} showLookupModal={field=>this.showLookupModal(field)} form={this.props.form}/>
                            <ButtonItems buttons={buttons} page={this}/>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}

export default createForm()(Add);
