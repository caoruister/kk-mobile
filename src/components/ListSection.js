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

import DetailSection from './DetailSection';

import styles from './ListSection.module.css';

class ListSection extends React.Component {
  render() {
    const { data, columnNum } = this.props;

    let renderItem = dataItem => {
      return <DetailSection data={dataItem} />;
    };

    return (
      <Grid
        data={data}
        columnNum={columnNum || 3}
        square={false}
        hasLine={false}
        renderItem={renderItem}
      />
    );
  }
}

export default ListSection;
