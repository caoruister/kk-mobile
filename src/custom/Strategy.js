import React from 'react';
import qs from 'qs';
import { Tabs, WhiteSpace } from 'antd-mobile';

import CustomNavBar from 'components/CustomNavBar';

import { FILE_URL_PREFIX } from 'common/Utils';

import { _callInterface } from 'api/CommonAPI';

var styles = {
  tab: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    image: {
      width: '100%'
    }
  }
};

class Strategy extends React.Component {
  _isMounted = false;

  state = {
    navTitle: '',
    tabs: []
  };

  componentDidMount() {
    this._isMounted = true;

    let title = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).title;

    this.setState({
      navTitle: title
    });

    let oThis = this;
    //
    var interfaceName = 'getBanner'; // 接口名称
    var params = {
      bannerTypeName: title
    }; // 向接口提交的参数
    _callInterface(interfaceName, params).then(res => {
      if (!res) {
        this.props.history.push('/Login');
        return;
      }
      //
      console.log('------------data-------------');
      console.log(res);

      if (oThis._isMounted) {
        oThis.setState({
          tabs: res.list
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderContent = tab => (
    <div style={styles.tab}>
      <img src={FILE_URL_PREFIX + tab.wznytp} style={styles.tab.image} />
    </div>
  );

  render() {
    const { navTitle, tabs } = this.state;

    return (
      <div>
        <CustomNavBar navTitle={navTitle} />
        <Tabs
          tabs={tabs}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
        >
          {this.renderContent}
        </Tabs>
      </div>
    );
  }
}

export default Strategy;
