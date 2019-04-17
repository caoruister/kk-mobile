import React from 'react';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch} from 'antd-mobile';
import { createForm } from 'rc-form';

import { getEdit } from '../api/EditAPI';
import { WEB_CONTEXT } from '../common/Utils';

import './Edit.css';

class SectionItems extends React.Component {
    state = {
        fieldValues: {}
    }
    onChangeOfValue(field, value) {
        console.log(field.fieldid + ':' + value);
        field.value = value;
        this.setState({});
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
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="text"
                                    maxLength={field.length}
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    id={field.fieldid}
                                    >{field.label}</InputItem>
                            } else if (field.type === 'N') {
                                return <InputItem
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    key={field.fieldid+idx2}
                                    placeholder={'请输入'+field.label}
                                    type="tel"
                                    value={field.value}
                                    onChange={this.onChangeOfValue.bind(this, field)}
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
                                    onChange={this.onChangeOfValue.bind(this, field)}
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
                                    onChange={this.onChangeOfValue.bind(this, field)}
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
                                    onChange={this.onChangeOfValue.bind(this, field)}
                                    key={field.fieldid+idx2} extra="请选择" data={data} cols={1}>
                                    <List.Item arrow="horizontal">{field.label}</List.Item>
                                </Picker>
                            } else if (field.type === 'D') {
                                return <DatePicker
                                    {...getFieldProps(field.fieldid, {
                                        initialValue: field.value
                                    })}
                                    mode="date"
                                    key={field.fieldid+idx2} extra="请选择"
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
                                        key={field.fieldid+idx2}
                                        onChange={this.onChangeOfValue.bind(this, field)}
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
                                /*

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
                                return imageField*/
                            }
                        })
                    }
                </List>
        )
    }
}

class ButtonItems extends React.Component {
    state = {
        objid: '',
        layoutid: '',
    }
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
        sections: [],
        buttons: [],
        layoutid: '',
        objLabel: '',
        objid: '',
        id: '',
        fieldValues: {}
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        getEdit({
            id: this.props.match.params.id,
            objid: this.props.match.params.objid,
        }).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }

            //
            console.log(res);

            let fieldValues = {};
            let sections = res.sections;
            for (var i = 0; i < sections.length; i++) {
                let section = sections[i];
                let fields = section.fields;
                for (var k = 0; k < fields.length; k++) {
                    let field = fields[k];
                    if (field.type === "D" && field.value) {
                        let dateStr = field.value.replace(/-/g,"/");
                        field.value = new Date(dateStr);
                    } else if (field.type === "L") {
                        field.value = [field.value];
                    }
                }
            }

            this.setState({
                sections: res.sections || [],
                buttons: res.buttons || [],
                layoutid: res.layoutid,
                objLabel: res.objLabel,
                objid: res.objid,
                id: res.id,
                fieldValues: fieldValues
            });
        });
    }
    render() {

        const {sections, buttons} = this.state;
        return (
            <form>
                <SectionItems sections={sections} form={this.props.form}/>
                <WingBlank>
                    <ButtonItems buttons={buttons} form={this.props.form}/>
                </WingBlank>
            </form>
        );
    }
}

const BasicFormWrapper = createForm()(BasicForm);

class Edit extends React.Component {

    componentDidMount() {
        document.title = '编辑';

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

export default Edit;
