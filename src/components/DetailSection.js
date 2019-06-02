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
  Toast
} from 'antd-mobile';

import styles from './DetailSection.module.css';

class DetailSection extends React.Component {
  render() {
    const { data } = this.props;

    let leftJSX = !data.left.hide ? (
      <a href={data.left.path}>
        <img
          className={styles.leftImg}
          src="https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png"
          alt=""
        />
      </a>
    ) : null;

    let centerJSX = this.props.data.center.rows.map((row, idx1) => {
      let columnsJSX = row.columns.map((column, idx2) => {
        let labelJSX = column.hideLabel ? (
          <span style={column.labelStyle}>{column.label}：</span>
        ) : null;

        return (
          <div key={idx2} style={column.style} className={styles.rowColumn}>
            {labelJSX} <span style={column.inputStyle}>{column.value}</span>
          </div>
        );
      });

      return (
        <div key={idx1} style={{ display: 'flex' }} className={styles.row}>
          {columnsJSX}
        </div>
      );
    });

    let rightJSX = this.props.data.right.items.map((item, idx) => (
      <a key={idx} href={item.path}>
        <img
          style={item.style}
          className={styles.rightImg}
          src="https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png"
          alt=""
        />
      </a>
    ));

    return (
      <div className={styles.detail}>
        <div className={styles.left}>
          {leftJSX}
          {!data.center.hide && (
            <div className={styles.center}>{centerJSX}</div>
          )}
        </div>
        {!data.right.hide && (
          <div className={styles.right} style={data.right.style}>
            {rightJSX}
          </div>
        )}
      </div>
    );
  }
}

export default DetailSection;
