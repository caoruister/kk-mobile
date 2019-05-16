import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import qs from 'qs';

import { ListView, List, WhiteSpace, NavBar, Icon } from 'antd-mobile';

import CustomNavBar from './CustomNavBar';
import NotFound from './NotFound';

import { getList } from '../api/ListAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX, _setTitle } from '../common/Utils';

import addImg from '../assets/images/add.png';

import styles from './List.module.css';

function MyBody(props) {
  return (
    <div className="my-body">
      {!props.isLoading && props.data.length == 0 && (
        <NotFound title="当前没有数据" />
      )}
      {props.children}
    </div>
  );
}

function View(props) {
  const record = props.record;
  const fields = props.fields.map((field, idx) => {
    let value = record[field.name];

    let output = '';
    if (!value || value.length == 0) {
      output = <span>&nbsp;</span>;
    } else if (field.type === 'IMG') {
      output = record[field.name].map((img, idx) => {
        return (
          <img
            key={img.url + idx}
            src={FILE_URL_PREFIX + img.url}
            alt=""
            style={{ marginLeft: '5px' }}
          />
        );
      });
    } else if (field.type === 'Y') {
      output = <span>{record[field.name].name || ''}&nbsp;</span>;
    } else if (field.type === 'A') {
      output = <div dangerouslySetInnerHTML={{ __html: record[field.name] }} />;
    } else if (field.type === 'B') {
      output = <Icon type={value == 1 ? 'check' : 'cross'} />;
    } else {
      output = <span>{value}&nbsp;</span>;
    }

    return (
      <List.Item
        key={field.fieldid + idx}
        extra={output}
        className={styles.extraItem}
      >
        {!field.hideLabel ? field.label : ''}
      </List.Item>
    );
  });
  return fields;
}

class List1 extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });

    this.state = {
      dataSource,
      data: [],
      fields: [],
      isLoading: true,
      useBodyScroll: false,
      height: (document.documentElement.clientHeight * 3) / 4,
      pageIndex: 0,
      objid: '',
      canAdd: false,
      tabLabel: '',
      navTitle: ''
    };
  }

  componentDidMount() {
    this._isMounted = true;
    _setTitle(this.state.navTitle);
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.genData().then(() => {
      if (this._isMounted) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.data),
          isLoading: false,
          height: hei
        });
      }
    });

    _setTitle(this.state.navTitle);
  }

  componentDidUpdate() {}

  genData(pIndex = 0) {
    let params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    });
    let title = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    }).title;

    return getList({
      ...params,
      objid: this.props.match.params.objid,
      current: pIndex + 1
    }).then(res => {
      if (res == null || !res) {
        window.location.href = WEB_CONTEXT + '/#/Login';
        return;
      }
      //
      console.log(res);
      let root = res.root;
      let data = this.state.data.concat(root.records);

      if (this._isMounted) {
        this.setState({
          data: data,
          fields: root.showedFields,
          objLabel: root.objLabel,
          tabLabel: root.tabLabel,
          objid: root.objid,
          canAdd: root.canAdd,
          hasMore: root.records !== 0 && data.length < root.total,
          navTitle: title || root.tabLabel || root.layoutName
        });

        _setTitle(this.state.navTitle);
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.state.isLoading = true;
    //this.setState({ isLoading: true });
    this.genData(++this.state.pageIndex).then(() => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.data),
        isLoading: false
      });
    });
  };

  render() {
    const {
      data,
      fields,
      navTitle,
      dataSource,
      isLoading,
      canAdd,
      objid
    } = this.state;

    let length = data.length - 1;
    let row = (rowData, sectionID, rowID) => {
      if (rowID > length) {
        return null;
      }

      const record = data[rowID];

      //console.log(record);
      let layoutidOfViewPage = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      }).layoutidOfViewPage;

      let url = record.canEdit
        ? '/#/edit/' + this.state.objid + '/' + record.id
        : record.canView
        ? '/#/view/' +
          this.state.objid +
          '/' +
          record.id +
          '?layoutid=' +
          (layoutidOfViewPage || '')
        : '/#';
      return (
        <a href={url}>
          <List>
            <View record={record} fields={fields} />
          </List>
        </a>
      );
    };

    const separator = (sectionID, rowID) => (
      <WhiteSpace key={sectionID + rowID} size="lg" />
    );

    return (
      <div>
        <CustomNavBar navTitle={navTitle} />
        <ListView
          ref={el => (this.lv = el)}
          dataSource={dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {isLoading ? '加载中...' : ''}
            </div>
          )}
          renderBodyComponent={() => (
            <MyBody data={data} isLoading={isLoading} />
          )}
          renderRow={row}
          renderSeparator={separator}
          useBodyScroll={this.state.useBodyScroll}
          style={
            this.state.useBodyScroll
              ? {}
              : {
                  height: this.state.height,
                  overflow: 'auto'
                }
          }
          pageSize={10}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
        />
        {canAdd && (
          <div
            className={styles.footer + ' ' + styles.fixedBottom}
            style={{ zIndex: '3' }}
          >
            <a href={'/#/Add/' + objid} style={{ float: 'right' }}>
              <img className={styles.addIcon} src={addImg} alt="" />
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default List1;
