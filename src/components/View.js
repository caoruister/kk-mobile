import React from 'react';

import {List, Button, InputItem, WingBlank, ImagePicker, Picker, DatePicker, TextareaItem, Switch, Flex} from 'antd-mobile';
import { createForm } from 'rc-form';

import { getView } from '../api/ViewAPI';
import { WEB_CONTEXT } from '../common/Utils';

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

    render() {
        let buttons = '';
        if (this.props.buttons.length !== 0) {
            buttons = this.props.buttons.map((button, idx)=><Flex.Item key={button.id+idx}><Button type="primary" style={{ marginRight: '4px' }} data-method-name={ button.methodName } onClick={this.onClickOfButton}>{ button.text }</Button></Flex.Item>)
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

        const {sections, buttons} = this.props.state0;
        return (
            <div>
                <SectionItems sections={sections} form={this.props.form}/>
                <ButtonItems buttons={buttons} form={this.props.form}/>
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
