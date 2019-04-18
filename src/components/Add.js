import React from 'react';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch, Flex} from 'antd-mobile';
import { createForm } from 'rc-form';

import { getAdd, saveAdd, uploadFile } from '../api/AddAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX, formatTime } from '../common/Utils';

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
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'L') {
                                let data = field.options.map((option)=> {
                                    return {"label": option.text, "value": option.value}
                                });

                                return <Picker
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2} extra={'请选择'+field.label} data={data} cols={1} className="forss">
                                    <List.Item arrow="horizontal">{field.label}</List.Item>
                                </Picker>
                            } else if (field.type === 'D') {
                                return <DatePicker
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    mode="date"
                                    key={field.fieldid+idx2} extra={'请选择'+field.label}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    >
                                    <List.Item arrow="horizontal">{field.label}</List.Item>
                                </DatePicker>
                            } else if (field.type === 'X') {
                                let textareaField = <div key={field.fieldid+idx2}>
                                    <List.Item
                                        >{field.label}</List.Item>
                                    <TextareaItem
                                        {...getFieldProps(field.fieldid, {
                                            initialValue: field.value
                                        })}
                                        placeholder={'请输入'+field.label}
                                        key={field.fieldid+idx2}
                                        rows={5}
                                        count={100}
                                        />
                                </div>

                                return textareaField
                            } else if (field.type === 'A') {

                            } else if (field.type === 'B') {
                                return <List.Item
                                    key={field.fieldid+idx2}
                                    extra={<Switch
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    checked={field.value}
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
                            }
                        })
                    }
                </List>
        )
    }
}

class ButtonItems extends React.Component {
    save = (e) => {
        this.setState({
            errorMsg: '',
        });
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('接收到的表单的值为: ', values);
            console.log(err);
            if (!err) {
                values.objid = this.props.objid;
                values.layoutid = this.props.layoutid;
                //

                for (var key in values) {
                    //
                    let tempValue = values[key];
                    if (typeof(tempValue) == 'undefined') { // 如果不处理 值为 undefined 的情况，则 输入框中 清空值时，会导致 不提交 该字段的值（应该提交 空值）
                        values[key] = null;
                    } else if (Array.isArray(tempValue)) {
                        //noop
                    }

                    let field = this.props.fieldMap[key];
                    if (field && field.type === 'IMG') {
                        values[key] = JSON.stringify(tempValue);
                    } else if (field && field.type === 'D') {
                        values[key] = formatTime(tempValue).split(' ')[0];
                    }
                }

                console.log('saveAdd:' + values);
                //
                saveAdd(values).then(res => {
                    if (res == null) {return;}
                    //
                    if (res) {
                        if (res.errorMsg) {
                            this.setState({
                                errorMsg: res.errorMsg,
                            });
                        } else {
                            //this.props.history.goBack();
                            window.location.href = WEB_CONTEXT + '/#/List/' + this.props.objid;
                        }
                    }
                });
            }
        });
    }

    render() {
        let buttons = '';
        if (this.props.buttons.length === 0) {
            buttons = this.props.buttons.map((button, idx)=><Flex.Item key={button.id+idx}><Button type="primary" style={{ marginRight: '4px' }} data-method-name={ button.methodName } onClick={this.onClickOfButton}>{ button.text }</Button></Flex.Item>)
        } else {
            buttons = <Flex.Item><Button type="primary" style={{ marginRight: '4px' }} onClick={this.save}>确认</Button></Flex.Item>
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
        const {sections, buttons, objid, layoutid, fieldMap} = this.props.state0;
        return (
            <form>
                <SectionItems sections={sections} form={this.props.form}/>
                <ButtonItems buttons={buttons} objid={objid} layoutid={layoutid} fieldMap={fieldMap} form={this.props.form}/>
            </form>
        );
    }
}

const BasicFormWrapper = createForm()(BasicForm);

class Add extends React.Component {
    _isMounted = false;

    state = {
        sections: [],
        buttons: [],
        layoutid: '',
        objLabel: '',
        objid: '',
        id: '',
        fieldMap: {}
    }

    componentDidMount() {
        this._isMounted = true;
        document.title = '新增';

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

    getData = () => {

        getAdd({
            objid: this.props.match.params.objid,
            notNeedLogin: true
        }).then(res => {
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
                    this.state.fieldMap[field.fieldid] = field;
                    if (field.type === "D") {
                        field.value = new Date();
                    } else if (field.type === "L") {
                        field.value = [];
                    } else if (field.type === "IMG") {
                        field.value = [];
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
            }
        });
    }
    render() {
        return (
            <div style={{paddingBottom:'80px'}}>
                <BasicFormWrapper state0={this.state}/>
            </div>
        );
    }
}

export default Add;
