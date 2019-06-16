import React from 'react';

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
  Toast,
  Grid
} from 'antd-mobile';

import styles from './RichText.module.css';

class RichText extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <List.Item wrap>
        {!data.hideLabel && (
          <div style={data.labelStyle}>
            <span>{data.label}</span>
          </div>
        )}
        ;
        <div
          style={data.style}
          dangerouslySetInnerHTML={{ __html: data.value }}
        />
      </List.Item>
    );
  }
}

export default RichText;
