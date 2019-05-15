import React from 'react';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { Grid, WhiteSpace, Flex, WingBlank, NavBar, Icon } from 'antd-mobile';

import BottomTabBar from './BottomTabBar';
import Swiper from './Swiper';
import GridSection from './GridSection';
import ImagesSection from './ImagesSection';
import MessagesSection from './MessagesSection';
import DynamicSection from '../custom/DynamicSection';
import CustomNavBar from './CustomNavBar';

import {
  WEB_CONTEXT,
  FILE_URL_PREFIX,
  _isWeiXinEnv,
  _setTitle
} from '../common/Utils';
import { getHome } from '../api/HomeAPI';

class Section extends React.Component {
  render() {
    let template = null;
    if (this.props.type === 'topItems') {
      template = (
        <GridSection data={this.props.data} columnNum={this.props.columnNum} />
      );
    } else if (this.props.type === 'swiper') {
      template = <Swiper data={this.props.data} />;
    } else if (this.props.type === 'images') {
      template = <ImagesSection data={this.props.data} />;
    } else if (this.props.type === 'messages') {
      template = <MessagesSection data={this.props.data} />;
    } else if (this.props.type === 'dynamic') {
      template = <DynamicSection sectionName={this.props.data.sectionName} />;
    } else if (this.props.type === 'customItems') {
      template = (
        <GridSection data={this.props.data} columnNum={this.props.columnNum} />
      );
    }

    return (
      this.props.showSection && (
        <div>
          <div className="sub-title">{this.props.title}</div>
          <div>{template}</div>
        </div>
      )
    );
  }
}

class DynamicPage extends React.Component {
  _isMounted = false;

  state = {
    items: [],
    selectedTab: '',
    navTitle: ''
  };

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    // 根据动态参数调用接口
    let oldId = prevProps.match.params.pageName;
    let newId = this.props.match.params.pageName;
    if (newId !== oldId) this.getData();
  }

  getData = () => {
    let title = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).title;

    let params = {
      pageName: this.props.match.params.pageName || 'HOME'
    };

    getHome(params).then(res => {
      if (res == null || !res) {
        window.location.href = WEB_CONTEXT + '/#/Login';
        return;
      }
      //
      console.log(res);

      if (this._isMounted) {
        this.setState({
          items: res.items || [],
          selectedTab: res.selectedTabKey,
          navTitle: title || res.tabLabel || res.layoutName || ''
        });

        //debugger;
        _setTitle(this.state.navTitle, !!this.state.selectedTab);
      }
    });
  };

  render() {
    const { items, selectedTab, navTitle } = this.state;

    let sectionsJSX = items.map((section, idx) => (
      <Section
        key={section.templateType + idx}
        type={section.templateType}
        showSection={section.show}
        title={section.sectionTitle}
        showTitle={!section.hideSectionTitle}
        columnNum={section.columnCount}
        data={section.data}
      />
    ));

    return (
      <div>
        {!selectedTab && <CustomNavBar navTitle={navTitle} />}
        <div style={{ paddingBottom: '80px' }}>{sectionsJSX}</div>
        {selectedTab && <BottomTabBar selectedTab={selectedTab} page={this} />}
      </div>
    );
  }
}

export default DynamicPage;
