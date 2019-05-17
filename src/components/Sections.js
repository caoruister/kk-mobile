import React from 'react';
import { formShape } from 'rc-form';

import {
  List,
  InputItem,
  WingBlank,
  ImagePicker,
  Picker,
  DatePicker,
  TextareaItem,
  Switch,
  Radio,
  Flex,
  Toast
} from 'antd-mobile';

import { uploadFile } from '../api/EditAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX, _formatDate } from '../common/Utils';

class Sections extends React.Component {
  static propTypes = {
    form: formShape
  };

  onChangeOfValue(field, value) {
    console.log(field.fieldid + ':' + value);
    field.value = value;

    if (field.type === 'L' && field.edittype === '2') {
      let valueObj = {};
      valueObj[field.fieldid] = value;
      this.props.form.setFieldsValue(valueObj);
    } else {
      this.props.page.setState({});
    }
  }

  onChangeOfFileValue(field, values, operationType) {
    //console.log(operationType);
    //console.log(values);

    //上传图片
    if (operationType === 'add') {
      let formdata = new FormData();
      let orgid = localStorage.getItem('__orgid__');
      formdata.append('orgid', orgid);

      values &&
        values.forEach((val, idx) => {
          val.file && formdata.append('file', val.file);
        });

      uploadFile(formdata).then(res => {
        //console.log(res);
        /*
                 res && res.map((img, idx)=>{
                 img.url = FILE_URL_PREFIX + img.url;
                 return img;
                 });*/
        field.value = [...field.value, ...res];

        let valueObj = {};
        valueObj[field.fieldid] = field.value;
        this.props.form.setFieldsValue(valueObj);

        //this.props.page.setState({});
      });
    } else if (operationType === 'remove') {
      field.value = values;
      this.props.page.setState({});
    }
    console.log(field);
  }

  getImages(images) {
    images &&
      images.map((img, idx) => {
        let url = img.url;
        if (img.url.match(/^file\?getfile.*/g)) {
          console.log(img);
          img.url = FILE_URL_PREFIX + url;
        }
      });

    return images;
  }

  render() {
    //console.log('test render');

    const { getFieldProps, getFieldDecorator } = this.props.form;

    return this.props.sections.map((section, idx1) => (
      <List key={section.key + idx1} renderHeader={section.title}>
        {section.fields.map((field, idx2) => {
          //field.hideLabel = true;
          //field.required = true;

          let placeholderJSX = !field.readOnly
            ? '请输入' +
              field.label +
              (field.hideLabel && field.required ? ' (必填)' : '')
            : '    ';
          let requiredJSX = field.required ? (
            <span style={{ color: 'red' }}>*</span>
          ) : null;
          let labelJSX = !field.hideLabel ? (
            <div>
              {requiredJSX}
              <span>{field.label}</span>
            </div>
          ) : null;

          if (field.type === 'S') {
            return (
              <InputItem
                {...getFieldProps(field.fieldid, {
                  initialValue: field.value,
                  onChange() {},
                  rules: [
                    {
                      required: field.required,
                      message: '请输入' + field.label
                    }
                  ]
                })}
                key={field.fieldid + idx2}
                placeholder={placeholderJSX}
                type="text"
                maxLength={field.length}
                disabled={field.readOnly}
                id={field.fieldid}
              >
                {labelJSX}
              </InputItem>
            );
          } else if (field.type === 'N') {
            return (
              <InputItem
                {...getFieldProps(field.fieldid, {
                  initialValue: field.value,
                  onChange() {},
                  rules: [
                    {
                      required: field.required,
                      message: '请输入' + field.label
                    }
                  ]
                })}
                key={field.fieldid + idx2}
                placeholder={placeholderJSX}
                type="tel"
                disabled={field.readOnly}
                maxLength={field.length}
              >
                {labelJSX}
              </InputItem>
            );
          } else if (field.type === 'H') {
            return (
              <InputItem
                {...getFieldProps(field.fieldid, {
                  initialValue: field.value,
                  onChange() {},
                  rules: [
                    {
                      required: field.required,
                      message: '请输入' + field.label
                    }
                  ]
                })}
                key={field.fieldid + idx2}
                placeholder={placeholderJSX}
                type="phone"
                disabled={field.readOnly}
                maxLength={field.length}
              >
                {labelJSX}
              </InputItem>
            );
          } else if (field.type === 'enc') {
            return (
              <InputItem
                {...getFieldProps(field.fieldid, {
                  initialValue: field.value,
                  onChange() {},
                  rules: [
                    {
                      required: field.required,
                      message: '请输入' + field.label
                    }
                  ]
                })}
                key={field.fieldid + idx2}
                placeholder={placeholderJSX}
                type="password"
                disabled={field.readOnly}
                maxLength={field.length}
              >
                {labelJSX}
              </InputItem>
            );
          } else if (field.type === 'L') {
            let data = field.options.map(option => {
              return { label: option.text, value: option.value };
            });

            if (field.edittype === '1') {
              return (
                <Picker
                  {...getFieldProps(field.fieldid, {
                    initialValue: field.value,
                    onChange() {},
                    rules: [
                      {
                        required: field.required,
                        message: '请输入' + field.label
                      },
                      {
                        validator(rule, value, callback, source, options) {
                          var errors = [];
                          if (!value[0]) {
                            callback(field.label + '不能为空');
                          } else {
                            callback(errors);
                          }
                        }
                      }
                    ]
                  })}
                  disabled={field.readOnly}
                  key={field.fieldid + idx2}
                  extra={placeholderJSX}
                  data={data}
                  cols={1}
                  okText="确定"
                  dismissText="取消"
                >
                  <List.Item
                    arrow="horizontal"
                    className={field.readOnly ? 'am-list-item-disabled' : ''}
                  >
                    {labelJSX}
                  </List.Item>
                </Picker>
              );
            } else if (field.edittype === '2') {
              return (
                <div key={field.fieldid + idx2}>
                  {!field.hideLabel && <List.Item>{labelJSX}</List.Item>}
                  <div
                    {...getFieldProps(field.fieldid, {
                      initialValue: field.value,
                      onChange() {},
                      rules: [
                        {
                          required: field.required,
                          message: '请输入' + field.label
                        }
                      ]
                    })}
                  />
                  {data.map(i => (
                    <Radio.RadioItem
                      key={i.value}
                      checked={field.value === i.value}
                      disabled={field.readOnly}
                      onChange={this.onChangeOfValue.bind(this, field, i.value)}
                    >
                      {i.label}
                    </Radio.RadioItem>
                  ))}
                </div>
              );
            }
          } else if (field.type === 'D' || field.type === 'F') {
            let mode = field.type === 'D' ? 'date' : 'datetime';

            return (
              <DatePicker
                {...getFieldProps(field.fieldid, {
                  initialValue: field.value,
                  onChange() {},
                  rules: [
                    {
                      required: field.required,
                      message: '请输入' + field.label
                    }
                  ]
                })}
                mode={mode}
                disabled={field.readOnly}
                key={field.fieldid + idx2}
                extra={placeholderJSX}
              >
                <List.Item arrow="horizontal">{labelJSX}</List.Item>
              </DatePicker>
            );
          } else if (field.type === 'X') {
            return (
              <TextareaItem
                {...getFieldProps(field.fieldid, {
                  initialValue: field.value,
                  onChange() {},
                  rules: [
                    {
                      required: field.required,
                      message: '请输入' + field.label
                    }
                  ]
                })}
                key={field.fieldid + idx2}
                title={labelJSX}
                placeholder={placeholderJSX}
                disabled={field.readOnly}
                rows={5}
                count={100}
              />
            );
          } else if (field.type === 'A') {
            //富文本
            if (field.readOnly) {
              return <div dangerouslySetInnerHTML={{ __html: field.value }} />;
            }
            return null;
          } else if (field.type === 'B') {
            return (
              <List.Item
                key={field.fieldid + idx2}
                className={field.readOnly ? 'am-list-item-disabled' : ''}
                extra={
                  <Switch
                    {...getFieldProps(field.fieldid, {
                      initialValue: field.value
                    })}
                    color="#4182e6"
                    disabled={field.readOnly}
                    checked={field.value}
                    onChange={this.onChangeOfValue.bind(this, field)}
                  />
                }
              >
                {labelJSX}
              </List.Item>
            );
          } else if (field.type === 'IMG') {
            let imageField = (
              <div key={field.fieldid + idx2}>
                {!field.hideLabel && <List.Item>{labelJSX}</List.Item>}
                <ImagePicker
                  {...getFieldProps(field.fieldid, {
                    initialValue: field.value,
                    onChange() {},
                    rules: [
                      {
                        required: field.required,
                        message: '请输入' + field.label
                      }
                    ]
                  })}
                  files={this.getImages(field.value)}
                  onChange={this.onChangeOfFileValue.bind(this, field)}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={field.value.length < 1}
                  multiple={false}
                />
              </div>
            );
            return imageField;
          } else if (field.type === 'Y') {
            return (
              <List.Item
                {...getFieldProps(field.fieldid, {
                  initialValue: field.value,
                  onChange() {},
                  rules: [
                    {
                      required: field.required,
                      message: '请输入' + field.label
                    }
                  ]
                })}
                key={field.fieldid + idx2}
                extra={field.value.name || placeholderJSX}
                disabled={field.readOnly}
                arrow="horizontal"
                onClick={() => {
                  !field.readOnly && this.props.showLookupModal(field);
                }}
              >
                {labelJSX}
              </List.Item>
            );
          }
        })}
      </List>
    ));
  }
}

export default Sections;
