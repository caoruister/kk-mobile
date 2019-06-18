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

    let leftJSX = (
      <a href={data.left.path} style={data.left.style}>
        <img className={styles.leftImg} src={data.left.icon} alt="" />
      </a>
    );

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

    let bottomJSX = this.props.data.bottom.items.map((item, idx) => (
      <a key={idx} href={item.path}>
        <img
          className={styles.bottomImg}
          src={data.bottom.icon}
          alt={item.desc}
        />
      </a>
    ));

    let rightJSX = this.props.data.right.items.map((item, idx) => (
      <a key={idx} href={item.path}>
        <img
          className={styles.rightImg}
          src={data.right.icon}
          alt={item.desc}
        />
      </a>
    ));

    return (
      <div className={styles.detail}>
        <div className={styles.left}>
          <div className={styles.leftCenter}>
            {!data.left.hide && leftJSX}
            {!data.center.hide && (
              <div className={styles.center} style={data.center.style}>
                {centerJSX}
              </div>
            )}
          </div>
          {!data.bottom.hide && (
            <div className={styles.leftBottom} style={data.bottom.style}>
              {bottomJSX}
            </div>
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
