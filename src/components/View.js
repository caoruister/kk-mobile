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
import CustomNavBar from './CustomNavBar';

import { getView } from '../api/ViewAPI';
import { _callInterface } from '../api/CommonAPI';
import {
  WEB_CONTEXT,
  FILE_URL_PREFIX,
  _setTitle,
  _success,
  _fail,
  _info,
  _setButtonVisible
} from '../common/Utils';

class SectionItems extends React.Component {
  render() {
    return this.props.sections.map((section, idx1) => {
      let title = section.title;
      if (!section.titleShowedInDetailPage) {
        title = null;
      }

      return (
        <List key={section.key + idx1} renderHeader={title}>
          {section.fields.map((field, idx2) => {
            let labelJSX = !field.hideLabel ? (
              <div>
                <span>{field.label}</span>
              </div>
            ) : null;

            if (field.type === 'B') {
              return (
                <List.Item
                  key={field.fieldid + idx2}
                  extra={<Icon type={field.value == 1 ? 'check' : 'cross'} />}
                >
                  {labelJSX}
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
                  {labelJSX}
                </List.Item>
              );
            } else if (field.type === 'X') {
              return (
                <div key={field.fieldid + idx2}>
                  <List.Item extra={field.value}>{labelJSX}</List.Item>
                </div>
              );
            } else if (field.type === 'A') {
              return (
                <div key={field.fieldid + idx2}>
                  <List.Item wrap>
                    {labelJSX}
                    <div dangerouslySetInnerHTML={{ __html: field.value }} />
                  </List.Item>
                </div>
              );
            } else if (field.type === 'Y') {
              return (
                <div key={field.fieldid + idx2}>
                  <List.Item
                    extra={(field.value && field.value.name) || field.value2}
                  >
                    {labelJSX}
                  </List.Item>
                </div>
              );
            } else {
              return (
                <List.Item
                  key={field.fieldid + idx2}
                  extra={field.value || field.value2}
                >
                  {labelJSX}
                </List.Item>
              );
            }
          })}
        </List>
      );
    });
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
    this.getData();
    _setTitle(this.state.navTitle);

    this.success = _success;
    this.fail = _fail;
    this.info = _info;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    //debugger
    // 上面步骤3，通过参数更新数据
    let oldId = prevProps.match.path;
    let newId = this.props.match.path;
    if (newId !== oldId) this.getData();
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

  setButtonVisible = (buttonName, isVisible) => {
    _setButtonVisible(buttonName, isVisible, this);
  };

  getId = () => {
    return this.state.id;
  };

  getData = () => {
    //console.log(this.props)

    //debugger
    //let layoutid = qs.parse(this.props.location.search, {
    //  ignoreQueryPrefix: true
    //}).layoutid;
    //let notNeedLogin = qs.parse(this.props.location.search, {
    //  ignoreQueryPrefix: true
    //}).notNeedLogin;

    let params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    let title = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).title;

    getView({
      ...params,
      id: this.props.match.params.id,
      objid: this.props.match.params.objid
      //notNeedLogin: notNeedLogin,
      //layoutid: layoutid
    }).then(res => {
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

        _setTitle(this.state.navTitle);

        //used in onLoad method
        let page = this;
        let onLoadMethod = res.events && res.events.onLoad;
        console.log(onLoadMethod);
        !!onLoadMethod && eval(onLoadMethod);
      }
    });
  };

  render() {
    const { sections, buttons, navTitle } = this.state;

    return (
      <div style={{ paddingBottom: '80px' }}>
        <CustomNavBar navTitle={navTitle} />
        <SectionItems sections={sections} />
        <WhiteSpace size="lg" />
        <ButtonSection buttons={buttons} page={this} useDefault={false} />
      </div>
    );
  }
}

export default View;
