import React from 'react';
import { withRouter } from 'react-router-dom';

import { NavBar, Icon } from 'antd-mobile';

import { _isWeiXinEnv } from '../common/Utils';

class CustomNavBar extends React.Component {
  render() {
    return _isWeiXinEnv() ? null : (
      <NavBar
        mode="dark"
        style={{ background: '#4182e6' }}
        leftContent={[<Icon key="0" type="left" size="lg" />]}
        onLeftClick={() => this.props.history.goBack()}
      >
        {this.props.navTitle}
      </NavBar>
    );
  }
}

export default withRouter(CustomNavBar);
