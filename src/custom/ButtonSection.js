import React from 'react';

import { Button } from 'antd-mobile';

var styles = {
  buttonArea: {
    padding: '0 20px',
    marginTop: '15px',
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
  onZsyd = () => {
    console.log(this.props.page.props);
    //this.props.page.props.history.push(
    //  '/Add/FF8080816BDE6699016BE0F26AB503BD?layoutid=FF8080816BEBAFB4016BEBE0BBD4008E'
    //);

    this.props.page.props.history.push('/ReserveRoom');
  };
  render() {
    return (
      <div style={styles.buttonArea}>
        <Button style={styles.buttonArea.button} onClick={this.onZsyd}>
          住宿预订
        </Button>
      </div>
    );
  }
}

export default ButtonSection;
