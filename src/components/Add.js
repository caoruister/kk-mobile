import React from 'react';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch} from 'antd-mobile';
import { createForm } from 'rc-form';

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
        //this.props.form.setFieldsValue(value);
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

                                //console.log(data);
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
                                    checked={this.state.fieldValues[field.fieldid]}
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
        return this.props.buttons.map((button, idx)=>
                <Button key={button.id} type="primary" inline size="small" style={{ marginRight: '4px' }} data-method-name={ button.methodName } onClick={this.save}>{ button.text }</Button>
        )
    }

}

class BasicInput extends React.Component {
    state = {
        "sections": [
        {
            "defaultHideInDetailPage": false,
            "defaultHideInEditPage": false,
            "icon": null,
            "name": null,
            "title": "基本信息",
            "fields": [
                {
                    "length": "255",
                    "name": "name",
                    "readOnly": true,
                    "label": "编号",
                    "type": "V",
                    "key": "2C904B7269D8FEA60169E25061A80100",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25061A80100",
                    "hideLabel": false
                },
                {
                    "length": "100",
                    "name": "wb",
                    "readOnly": false,
                    "label": "文本",
                    "type": "S",
                    "key": "2C904B7269D8FEA60169E2521FB7012D",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2521FB7012D",
                    "hideLabel": false
                },
                {
                    "decimalPlaces": 0,
                    "length": "10",
                    "name": "sz",
                    "readOnly": false,
                    "label": "数字",
                    "type": "N",
                    "key": "2C904B7269D8FEA60169E25239FB0138",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25239FB0138",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "rq",
                    "readOnly": false,
                    "label": "日期",
                    "type": "D",
                    "key": "2C904B7269D8FEA60169E25253580143",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25253580143",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "rqsj",
                    "readOnly": false,
                    "label": "日期/时间",
                    "type": "F",
                    "key": "2C904B7269D8FEA60169E2526ADB014E",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2526ADB014E",
                    "hideLabel": false
                },
                {
                    "length": "1000",
                    "name": "wbq",
                    "readOnly": false,
                    "label": "文本区",
                    "type": "X",
                    "key": "2C904B7269D8FEA60169E25286970159",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25286970159",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "xxlbxllb",
                    "options": [
                        {
                            "text": "　",
                            "value": ""
                        },
                        {
                            "text": "A",
                            "value": "A"
                        },
                        {
                            "text": "B",
                            "value": "B"
                        },
                        {
                            "text": "C",
                            "value": "C"
                        },
                        {
                            "text": "D",
                            "value": "D"
                        }
                    ],
                    "readOnly": false,
                    "label": "选项列表（下拉列表）",
                    "type": "L",
                    "key": "2C904B7269D8FEA60169E252C3420164",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E252C3420164",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "xxlbdxklb",
                    "options": [
                        {
                            "text": "　",
                            "value": ""
                        },
                        {
                            "text": "A",
                            "value": "A"
                        },
                        {
                            "text": "B",
                            "value": "B"
                        },
                        {
                            "text": "C",
                            "value": "C"
                        }
                    ],
                    "readOnly": false,
                    "label": "选项列表（单选框列表）",
                    "type": "L",
                    "key": "2C904B7269D8FEA60169E2531C0D016F",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2531C0D016F",
                    "hideLabel": false
                },
                {
                    "lookupObjShowedFieldName": "name",
                    "lookupObjid": "2C904B72686017330168605160FA0106",
                    "length": null,
                    "name": "czgx",
                    "readOnly": false,
                    "label": "查找关系",
                    "type": "Y",
                    "lookupObjShowedFieldid": "2C904B72686017330168605161560107",
                    "key": "2C904B7269D8FEA60169E2536CD20185",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2536CD20185",
                    "hideLabel": false
                },
                {
                    "formulaType": "文本",
                    "length": null,
                    "name": "gs",
                    "readOnly": true,
                    "label": "公式",
                    "type": "Z",
                    "key": "2C904B7269D8FEA60169E253CB570191",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E253CB570191",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "zdbh",
                    "readOnly": true,
                    "label": "自动编号",
                    "type": "V",
                    "key": "2C904B7269D8FEA60169E254111F019D",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E254111F019D",
                    "hideLabel": false
                },
                {
                    "lookupObjShowedFieldName": "name",
                    "lookupObjid": "2C904B72686017330168605160FA0106",
                    "length": null,
                    "name": "zxxxgx",
                    "readOnly": false,
                    "label": "主详信息关系",
                    "type": "M",
                    "lookupObjShowedFieldid": "2C904B72686017330168605161560107",
                    "key": "2C904B7269D8FEA60169E2546DF001AC",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2546DF001AC",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "url",
                    "readOnly": false,
                    "label": "URL",
                    "type": "U",
                    "key": "2C904B7269D8FEA60169E2550DC201C5",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2550DC201C5",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "pf",
                    "readOnly": false,
                    "label": "评分",
                    "type": "SCORE",
                    "maxScore": "10",
                    "key": "2C904B7269D8FEA60169E25537EF01D0",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25537EF01D0",
                    "hideLabel": false
                },
                {
                    "length": "2",
                    "name": "tp",
                    "readOnly": false,
                    "label": "图片",
                    "type": "IMG",
                    "key": "2C904B7269D8FEA60169E2556A5E01DB",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2556A5E01DB",
                    "hideLabel": false
                },
                {
                    "decimalPlaces": 0,
                    "length": "10",
                    "name": "bfb",
                    "readOnly": false,
                    "label": "百分比",
                    "type": "P",
                    "key": "2C904B7269D8FEA60169E2558F8701E6",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2558F8701E6",
                    "hideLabel": false
                },
                {
                    "length": "2000",
                    "name": "wbqz",
                    "readOnly": false,
                    "label": "文本区 (长)",
                    "type": "J",
                    "key": "2C904B7269D8FEA60169E255BEAB01F1",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E255BEAB01F1",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "dh",
                    "readOnly": false,
                    "label": "电话",
                    "type": "H",
                    "key": "2C904B7269D8FEA60169E255E08801FC",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E255E08801FC",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "dzyj",
                    "readOnly": false,
                    "label": "电子邮件",
                    "type": "E",
                    "key": "2C904B7269D8FEA60169E255FF710207",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E255FF710207",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "fxk",
                    "readOnly": false,
                    "label": "复选框",
                    "type": "B",
                    "value": false,
                    "key": "2C904B7269D8FEA60169E25623D60212",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25623D60212",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "wbqfwb",
                    "readOnly": false,
                    "label": "文本区（富文本",
                    "type": "A",
                    "key": "2C904B7269D8FEA60169E25648C3021D",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25648C3021D",
                    "hideLabel": false
                },
                {
                    "length": "100",
                    "name": "jmwbccjm",
                    "readOnly": false,
                    "label": "加密文本(存储加密)",
                    "type": "enc",
                    "key": "2C904B7269D8FEA60169E2567A500228",
                    "required": false,
                    "maskcharacter": "*",
                    "fieldid": "2C904B7269D8FEA60169E2567A500228",
                    "hideLabel": false
                },
                {
                    "length": "100",
                    "name": "jmwbxsjm",
                    "readOnly": false,
                    "label": "加密文本(显示加密)",
                    "type": "encd",
                    "key": "2C904B7269D8FEA60169E256ADC70233",
                    "required": false,
                    "maskcharacter": "*",
                    "fieldid": "2C904B7269D8FEA60169E256ADC70233",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "xxlbdx",
                    "options": [
                        {
                            "text": "A",
                            "value": "A"
                        },
                        {
                            "text": "B",
                            "value": "B"
                        },
                        {
                            "text": "C",
                            "value": "C"
                        }
                    ],
                    "readOnly": false,
                    "label": "选项列表（多选，下拉列表）",
                    "type": "Q",
                    "key": "2C904B7269D8FEA60169E2570C75023E",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E2570C75023E",
                    "hideLabel": false
                },
                {
                    "length": null,
                    "name": "xxlbdxfxklb",
                    "readOnly": false,
                    "label": "选项列表（多选，复选框列表）",
                    "type": "Q",
                    "key": "2C904B7269D8FEA60169E25746B50249",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25746B50249",
                    "hideLabel": false
                },
                {
                    "length": "2",
                    "name": "wj",
                    "readOnly": false,
                    "label": " 文件",
                    "type": "FILE",
                    "key": "2C904B7269D8FEA60169E25786650254",
                    "required": false,
                    "fieldid": "2C904B7269D8FEA60169E25786650254",
                    "hideLabel": false
                }
            ],
            "titleShowedInEditPage": true,
            "titleShowedInDetailPage": true,
            "key": "2C904B7269D8FEA60169E2506788010C"
        }
        ],
        "buttons": [
            {
                "standard": false,
                "custom": true,
                "methodName": "onClick1",
                "id": "C032F30F3B2D48EEB86FDC49A88408FB",
                "text": "申请检测"
            }
        ]

    }
    componentDidMount() {
    }
    onChangeOfUsername = (value) => {
        this.setState({
            username: value,
        });
    }
    onChangeOfPassword = (value) => {
        this.setState({
            password: value,
        });
    }
    handleOk = ()=> {
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

const BasicInputWrapper = createForm()(BasicInput);

class Add extends React.Component {

    componentDidMount() {
        document.title = '新增';

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
                <BasicInputWrapper/>
            </div>
        );
    }
}

export default Add;
