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
  PickerView,
  Radio,
  NavBar,
  Icon,
  Toast
} from 'antd-mobile';
import { createForm, formShape } from 'rc-form';

import Lookup from './Lookup';
import ButtonSection from './ButtonSection';
import Sections from './Sections';
import CustomNavBar from './CustomNavBar';

import { getAdd, saveAdd, uploadFile } from '../api/AddAPI';
import { _callInterface } from '../api/CommonAPI';

import {
  WEB_CONTEXT,
  FILE_URL_PREFIX,
  _formatDate,
  _formatTime,
  _setTitle,
  _success,
  _fail,
  _info,
  _setButtonVisible
} from '../common/Utils';

class Add extends React.Component {
  static propTypes = {
    form: formShape
  };

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
    navTitle: '',
    errorMsg: []
  };

  componentDidMount() {
    this._isMounted = true;
    //debugger
    this.getData();
    _setTitle(this.state.navTitle);

    this.success = _success;
    this.fail = _fail;
    this.info = _info;
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
    this.state.currentLookupField.value.id = field.id;
    this.state.currentLookupField.value.name = field.name;

    this.setState({
      lookupModal: false
    });
  }

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

  callInterface = (apiName, data, callback) => {
    _callInterface(apiName, data).then(res => {
      !!callback && callback(res);
    });
  };

  setButtonVisible = (buttonName, isVisible) => {
    _setButtonVisible(buttonName, isVisible, this);
  };

  getData = () => {
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

    getAdd({
      ...params,
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

          if (field.type === 'D' || field.type === 'F') {
            field.value = new Date();
          } else if (field.type === 'L' && field.edittype === '1') {
            field.value = [];
          } else if (field.type === 'IMG') {
            field.value = [];
          } else if (field.type === 'Y') {
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

        _setTitle(this.state.navTitle);

        //used in onload method
        let page = this;
        let onLoadMethod = res.events && res.events.onLoad;
        console.log(onLoadMethod);
        !!onLoadMethod && eval(onLoadMethod);
      }
    });
  };

  save = callback => {
    //this.setState({
    //    errorMsg: '',
    //});
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
          if (!tempValue || typeof tempValue == 'undefined') {
            // 如果不处理 值为 undefined 的情况，则 输入框中 清空值时，会导致 不提交 该字段的值（应该提交 空值）
            fieldValue[key] = null;
          } else {
            //
            let field = this.state.fieldIdMap[key];
            if (field.type === 'IMG') {
              //handle file prefix in the url
              tempValue = tempValue.map(value => {
                value.url = value.url.replace(FILE_URL_PREFIX, '');
                return value;
              });
              fieldValue[key] = JSON.stringify(tempValue);
            } else if (field.type === 'D') {
              fieldValue[key] = _formatDate(tempValue);
            } else if (field.type === 'F') {
              fieldValue[key] = _formatTime(tempValue);
            } else if (field.type === 'L' && field.edittype === '1') {
              fieldValue[key] = tempValue.length > 0 ? tempValue[0] : null;
            } else {
              fieldValue[key] = tempValue;
            }
          }
        }

        console.log('saveAdd:');
        console.log(fieldValue);
        //
        return saveAdd(fieldValue).then(res => {
          if (res == null) {
            return;
          }
          //
          if (res) {
            if (res.errorMsg) {
              this.setState({
                errorMsg: res.errorMsg
              });
            } else {
              let navigateBackDelta = qs.parse(this.props.location.search, {
                ignoreQueryPrefix: true
              }).navigateBackDelta;
              let back = ~navigateBackDelta + 1;
              console.log('goback:' + back);

              !!callback
                ? callback(res.id)
                : this.props.history.go(back !== 0 ? back : -1);
            }
          }
        });
      } else {
        for (var key in err) {
          if (err[key].errors.length > 0) {
            Toast.info(err[key].errors[0].message, 1);
            return;
          }
        }
      }
    });
  };

  render() {
    let {
      lookupModal,
      currentLookupField,
      sections,
      buttons,
      navTitle
    } = this.state;

    return (
      <div>
        <div>
          {lookupModal && (
            <Lookup
              objid={currentLookupField.lookupObjid}
              lookupObjShowedFieldid={currentLookupField.lookupObjShowedFieldid}
              selectLookup={record => this.selectLookup(record)}
            />
          )}
        </div>

        <div
          style={{ paddingBottom: '80px' }}
          className={lookupModal ? 'hide' : 'show'}
        >
          <CustomNavBar navTitle={navTitle} />
          <div>
            <form>
              <Sections
                sections={sections}
                showLookupModal={field => this.showLookupModal(field)}
                form={this.props.form}
                page={this}
              />
              <WhiteSpace size="lg" />
              <ButtonSection buttons={buttons} page={this} useDefault={true} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default createForm()(Add);
