import React from 'react';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch} from 'antd-mobile';
import { createForm } from 'rc-form';

import { getView } from '../api/ViewAPI';
import { WEB_CONTEXT } from '../common/Utils';

import '../assets/weui.css';

class SectionItems extends React.Component {
    state = {
    }
    render() {

        return this.props.sections.map((section, idx1)=>
                <List key={section.key+idx1} renderHeader={section.title}>
                    {
                        section.fields.map((field, idx2)=> {
                            if (field.type === 'B') {
                                return <List.Item key={field.fieldid+idx2} extra={field.value}>{field.label}</List.Item>
                            } else if (field.type === 'IMG') {
                                return <List.Item key={field.fieldid+idx2} extra={<img src={field.value} alt=''/>}>
                                            {field.label}
                                        </List.Item>
                            } else {
                                return <List.Item key={field.fieldid+idx2} extra={field.value}>{field.label}</List.Item>
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
    render() {

        const {sections, buttons} = this.props.state0;
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

class View extends React.Component {
    _isMounted = false;

    state = {
        sections: [],
        buttons: [],
        layoutid: '',
        objLabel: '',
        objid: '',
        id: ''
    }

    componentDidMount() {
        this._isMounted = true;
        document.title = '新增';

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

    getData = () => {
        getView({
            id: this.props.match.params.id,
            objid: this.props.match.params.objid,
            notNeedLogin: true
        }).then(res => {
            if (res == null || !res) {
                window.location.href = WEB_CONTEXT + '/#/Login';
                return;
            }
            //
            console.log(res);

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
                <BasicForm state0={this.state}/>
            </div>
        );
    }
}

export default View;
