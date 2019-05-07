import React from 'react';

import { Carousel, WingBlank } from 'antd-mobile';

class Swiper extends React.Component {
  state = {
    imgHeight: '100'
  };

  componentDidMount() {}

  render() {
    const imgHtml = this.props.data.map(val => (
      <a
        key={val}
        href={val.webviewUrl}
        style={{
          display: 'inline-block',
          width: '100%',
          height: this.state.imgHeight
        }}
      >
        <img
          src={val.imageUrl}
          alt=""
          style={{ width: '100%', verticalAlign: 'top' }}
          onLoad={() => {
            // fire window resize event to change height
            window.dispatchEvent(new Event('resize'));
            //this.setState({ imgHeight: 'auto' });
          }}
        />
      </a>
    ));

    return (
      <Carousel autoplay={true} infinite={true}>
        {imgHtml}
      </Carousel>
    );
  }
}

export default Swiper;
