import React from 'react';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch} from 'antd-mobile';
import { createForm } from 'rc-form';

import { getAdd } from '../api/AddAPI';
import { WEB_CONTEXT } from '../common/Utils';

import './Add.css';

class SectionItems extends React.Component {
    state = {
        objid: '',
        layoutid: '',
        fieldValues: {}
    }
    onChangeOfValue(fieldid, value) {
        console.log(fieldid + ':' + value);
        let fieldValues = this.state.fieldValues;
        fieldValues[fieldid] = value;
        this.setState(fieldValues);
    }
    render() {

        const files = [{
            url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
            id: '2121',
        }];

        const { getFieldProps } = this.props.form;

        return this.props.sections.map((section, idx1)=>
                <List key={section.key+idx1} renderHeader={section.title}>
                    {
                        section.fields.map((field, idx2)=> {
                            if (field.type === 'S') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid)}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="text"
                                    maxLength={field.length}
                                    id={field.fieldid}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'N') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid)}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="tel"
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'H') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid)}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="phone"
                                    maxLength={field.length}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'enc') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid)}
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
                                        initialValue: this.state.fieldValues[field.fieldid]
                                    })}
                                    key={field.fieldid+idx2} extra="请选择" data={data} cols={1} className="forss">
                                    <List.Item arrow="horizontal">{field.label}</List.Item>
                                </Picker>
                            } else if (field.type === 'D') {
                                return <DatePicker
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: this.state.fieldValues[field.fieldid]
                                    })}
                                    mode="date"
                                    key={field.fieldid+idx2} extra="请选择"
                                    onChange={this.onChangeOfValue.bind(this, field.fieldid)}
                                    >
                                    <List.Item arrow="horizontal">{field.label}</List.Item>
                                </DatePicker>
                            } else if (field.type === 'X') {
                                let textareaField = <div key={field.fieldid+idx2}>
                                    <List.Item
                                        >{field.label}</List.Item>
                                    <TextareaItem
                                        {...getFieldProps(field.fieldid)}
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
                                     {
                                     ...getFieldProps(field.fieldid, {
                                        initialValue: this.state.fieldValues[field.fieldid]
                                     })}
                                    checked={field.value}
                                    onChange={this.onChangeOfValue.bind(this, field.fieldid)}
                                  />}
                                    >{field.label}</List.Item>

                            } else if (field.type === 'IMG') {

                                let imageField = <div key={field.fieldid+idx2}>
                                    <List.Item
                                        >{field.label}</List.Item>
                                    <ImagePicker
                                        {
                                            ...getFieldProps(field.fieldid, {
                                                initialValue: this.state.fieldValues[field.fieldid]
                                            })}
                                        files={this.state.fieldValues[field.fieldid]}
                                        onChange={this.onChangeOfValue.bind(this, field.fieldid)}
                                        onImageClick={(index, fs) => console.log(index, fs)}
                                        selectable={files.length < 7}
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
        let oThis = this;
        this.props.form.validateFields((err, values) => {
            console.log('接收到的表单的值为: ', values);
            console.log(err);
            if (!err) {
                values.objid = this.state.objid;
                values.layoutid = this.state.layoutid;
                //
                /*
                let objName = oThis.props.match.params.objName;
                if (objName == 'Attachment') { // 添加附件
                    values.recordId = oThis.props.match.params.valueOfLookupField;
                }
                //
                let valueStringMap = this.state.valueStringMap;
                for (var key in values) {
                    console.log(key + ': ' + (key in valueStringMap));
                    if (key in valueStringMap) {
                        values[key] = valueStringMap[key];
                    }
                    //
                    let tempValue = values[key];
                    if (typeof(tempValue) == 'undefined') { // 如果不处理 值为 undefined 的情况，则 输入框中 清空值时，会导致 不提交 该字段的值（应该提交 空值）
                        values[key] = null;
                    }
                }*/
                //
                //saveRecord(values).then(res => {
                //    if (res == null) {return;}
                //    //
                //    if (res) {
                //        if (res.errorMsg) {
                //            this.setState({
                //                errorMsg: res.errorMsg,
                //            });
                //        } else {
                //            this.props.history.goBack();
                //        }
                //    }
                //});
            }
        });
    }
    render() {
        let buttons = '';
        if (this.props.buttons.length === 0) {
            buttons = <Button type="primary" onClick={this.save}>确认</Button>
        } else {
            buttons = this.props.buttons.map((button, idx)=><Button key={button.id+idx} type="primary" inline size="small" style={{ marginRight: '4px' }} data-method-name={ button.methodName } onClick={this.onClickOfButton}>{ button.text }</Button>)
        }

        return buttons;
    }

}

class BasicForm extends React.Component {
    state = {
        "sections": [],
        "buttons": [],
        "layoutid": '',
        "objLabel": '',
        "objid": '',
        "id": ''
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        getAdd({
            objid: '2C904B7269D8FEA60169E250612C00FF',
            notNeedLogin: true
        }).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }
            //
            console.log(res);

            this.setState({
                "sections": res.sections || [],
                "buttons": res.buttons || [],
                "layoutid": res.layoutid,
                "objLabel": res.objLabel,
                "objid": res.objid
            });
        });
    }
    render() {

        const {sections, buttons} = this.state;
        return (
            <div>
                <SectionItems sections={sections} form={this.props.form}/>
                <WingBlank>
                    <ButtonItems buttons={buttons} form={this.props.form}/>
                </WingBlank>
            </div>
        );
    }
}

const BasicFormWrapper = createForm()(BasicForm);

class Add extends React.Component {

    componentDidMount() {
        document.title = '新增';

        //debugger
        let token = localStorage.getItem('__token__');
        if (token === null || token === '') {
            window.location.href = WEB_CONTEXT + '/#/Login';
        } else {
            // this.getData(token);

        }
    }
    render() {

        return (
            <div style={{paddingBottom:'80px'}}>
                <BasicFormWrapper/>
            </div>
        );
    }
}

export default Add;