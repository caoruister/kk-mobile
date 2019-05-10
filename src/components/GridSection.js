import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, WhiteSpace, Flex } from 'antd-mobile';

class GridSection extends React.Component {
  render() {
    const { data, columnNum } = this.props;

    let renderItem = dataItem => {
      return (
        <a href={dataItem.path} className="am-grid-item-inner-content">
          <img
            src={dataItem.icon}
            alt=""
            className="am-grid-icon"
            style={{ width: '60px', height: '60px' }}
          />
          <div className="am-grid-text">
            <span>{dataItem.label}</span>
          </div>
        </a>
      );
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

export default GridSection;
