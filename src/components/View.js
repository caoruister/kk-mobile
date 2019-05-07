import React from 'react';
import qs from 'qs';

import {
  List,
  Button,
  InputItem,
  WingBlank,
  WhiteSpace,
  ImagePicker,
  Picker,
  DatePicker,
  TextareaItem,
  Switch,
  Flex,
  NavBar,
  Icon,
  Toast
} from 'antd-mobile';

import ButtonSection from './ButtonSection';

import { getView } from '../api/ViewAPI';
import { _callInterface } from '../api/CommonAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX, setTitle } from '../common/Utils';

class SectionItems extends React.Component {
  render() {
    return this.props.sections.map((section, idx1) => (
      <List key={section.key + idx1} renderHeader={section.title}>
        {section.fields.map((field, idx2) => {
          if (field.type === 'B') {
            return (
              <List.Item key={field.fieldid + idx2} extra={field.value}>
                {field.label}
              </List.Item>
            );
          } else if (field.type === 'IMG') {
            return (
              <List.Item
                key={field.fieldid + idx2}
                extra={
                  <img
                    src={FILE_URL_PREFIX + field.value[0].thumbnail_url}
                    alt=""
                  />
                }
              >
                {field.label}
              </List.Item>
            );
          } else if (field.type === 'X') {
            return (
              <div key={field.fieldid + idx2}>
                <List.Item extra={field.value}>{field.label}</List.Item>
              </div>
            );
          } else {
            return (
              <List.Item
                key={field.fieldid + idx2}
                extra={field.value || field.value2}
              >
                {field.label}
              </List.Item>
            );
          }
        })}
      </List>
    ));
  }
}

class View extends React.Component {
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
    navTitle: ''
  };

  componentDidMount() {
    this._isMounted = true;
    //debugger
    this.getData();
    setTitle(this.state.navTitle);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    //debugger
    // 上面步骤3，通过参数更新数据
    //let oldId = prevProps.params.invoiceId
    //let newId = this.props.params.invoiceId
    //if (newId !== oldId)
    //    this.fetchInvoice()
  }

  callInterface = (apiName, data, callback) => {
    _callInterface(apiName, data).then(res => {
      !!callback && callback(res);
    });
  };

  getFieldValue = fieldName => {
    return (
      this.state.fieldNameMap[fieldName] &&
      this.state.fieldNameMap[fieldName].value
    );
  };

  setFieldValue = (fieldName, value) => {
    this.state.fieldNameMap[fieldName] &&
      (this.state.fieldNameMap[fieldName].value = value) &&
      this.setState({});
  };

  getId = () => {
    return this.state.id;
  };

  getData = () => {
    //console.log(this.props)

    let layoutid = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).layoutid;
    let notNeedLogin = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).notNeedLogin;
    let title = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).title;

    let params = {
      id: this.props.match.params.id,
      objid: this.props.match.params.objid,
      notNeedLogin: notNeedLogin,
      layoutid: layoutid
    };

    getView(params).then(res => {
      if (res == null || !res) {
        //window.location.href = WEB_CONTEXT + '/#/Login';
        this.props.history.push('/Login');
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
          layoutName: res.layoutName,
          objid: res.objid,
          id: res.id,
          navTitle: title || res.layoutName
        });

        setTitle(this.state.navTitle);

        //used in onLoad method
        let page = this;
        let onLoadMethodName = res.onLoadMethodName;
        console.log(onLoadMethodName);
        !!onLoadMethodName && eval(onLoadMethodName);
      }
    });
  };

  render() {
    const { sections, buttons, navTitle } = this.state;

    return (
      <div style={{ paddingBottom: '80px' }}>
        <NavBar
          mode="dark"
          style={{ background: '#4182e6' }}
          leftContent={[<Icon key="0" type="left" size="lg" />]}
          onLeftClick={() => this.props.history.goBack()}
        >
          {navTitle}
        </NavBar>
        <SectionItems sections={sections} />
        <WhiteSpace size="lg" />
        <ButtonSection buttons={buttons} page={this} useDefault={false} />
      </div>
    );
  }
}

export default View;
