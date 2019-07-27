import React from 'react';

import { Button } from 'antd-mobile';

var styles = {
  buttonArea: {
    margin: '22px 20px 0px',
    textAlign: 'center',
    button: {
      backgroundColor: '#cc9e48',
      borderRadius: '5px',
      fontSize: '19px',
      color: '#fff',
      height: '60px',
      lineHeight: '60px'
    }
  }
};

class ButtonSection extends React.Component {
  goReserve = () => {
    console.log(this.props.page.props);
    this.props.page.props.history.push('/ReserveRoom');
  };
  render() {
    return (
      <div style={styles.buttonArea}>
        <div style={styles.buttonArea.button} onClick={this.goReserve}>
          住宿预订
        </div>
      </div>
    );
  }
}

export default ButtonSection;
