import React from 'react';
import { Link } from 'react-router-dom';

import { WingBlank } from 'antd-mobile';

class ImagesSection extends React.Component {
  render() {
    const { data } = this.props;

    let imageJSX = data.map((img, idx) => {
      return (
        <a key={idx} href={img.path || 'javascript:;'}>
          <img
            src={img.imageUrl}
            style={{ width: img.width || '100%', height: img.height }}
          />
        </a>
      );
    });

    return <div>{imageJSX}</div>;
  }
}

export default ImagesSection;
