import React from 'react';

import { Tabs, WhiteSpace } from 'antd-mobile';

import CustomNavBar from 'components/CustomNavBar';

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
  renderContent = tab => (
    <div style={styles.tab}>
      <img
        src="http://dj3199.kz-info.cn:7073/ysdj-file/file?getfile=402883B86BD1787A016BD1787A120000/mobile/images/home_bg.jpg"
        style={styles.tab.image}
      />
    </div>
  );

  render() {
    const tabs = [
      { title: '1st Tab' },
      { title: '2nd Tab' },
      { title: '3rd Tab' },
      { title: '4th Tab' },
      { title: '5th Tab' },
      { title: '6th Tab' },
      { title: '7th Tab' },
      { title: '8th Tab' },
      { title: '9th Tab' }
    ];

    return (
      <div>
        <CustomNavBar navTitle="住房预定" />
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
