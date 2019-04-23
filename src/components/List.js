import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'qs';

import { ListView, WhiteSpace, NavBar, Icon } from 'antd-mobile';

import { getList } from '../api/ListAPI';
import { WEB_CONTEXT, FILE_URL_PREFIX } from '../common/Utils';

import addImg from '../assets/images/add.png';

import '../assets/weui.css';

function MyBody(props) {
    return (
        <div class1="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const  NUM_ROWS = 10;

function View(props) {
    const record = props.record;
    const fields = props.fields.map((field, idx)=>
            <div key={field.fieldid+idx} className="weui-form-preview__item">
                {!field.hideLabel && <div className="weui-form-preview__label">{field.label}:</div>}
                <div className="weui-form-preview__value">
                    {field.type !== 'IMG' && <span>{record[field.name] || ''}&nbsp;</span>}
                    {field.type === 'IMG' && <img src={FILE_URL_PREFIX + record[field.name][0].thumbnail_url} alt=""></img>}
                </div>
            </div>
    );
    return fields;
}

class List extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            data: [],
            fields: [],
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
            dataBlobs: {},
            sectionIDs: [],
            rowIDs: [],
            pageIndex: 0,
            objid: '',
            canAdd: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        document.title = '列表';
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        this.genData().then(()=>{
            if (this._isMounted) {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.state.dataBlobs),
                    isLoading: false,
                    height: hei,
                });
            }

        });
    }

    genData(pIndex = 0) {

        for (let i = 0; i < NUM_ROWS; i++) {
            const ii = (pIndex * NUM_ROWS) + i;
            this.state.dataBlobs[`${ii}`] = `row - ${ii}`;
        }

        let memberFieldName = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).MEMBER_FIELD_NAME;
        let title = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).title;

        return getList({
            objid: this.props.match.params.objid,
            notNeedLogin: false,
            current: pIndex + 1,
            MEMBER_FIELD_NAME: (memberFieldName || '')
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
                    hasMore: root.records != 0 && data.length < root.total
                });

                document.title = title || this.state.tabLabel || this.state.objLabel;
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

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.state.isLoading = true;
        //this.setState({ isLoading: true });
        this.genData(++this.state.pageIndex).then(()=>{
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.state.dataBlobs),
                isLoading: false,
            });
        });
    }

    render() {

        let length = this.state.data.length - 1;
        let row = (rowData, sectionID, rowID) => {
            if (rowID > length) {
                return null;
            }

            const record = this.state.data[rowID];

            //console.log(record);
            let layoutidOfViewPage = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).layoutidOfViewPage;

            let url = record.canEdit ? '/#/edit/'+this.state.objid+'/'+record.id
                : (record.canView ? '/#/view/'+this.state.objid+'/' + record.id + '?layoutid=' + (layoutidOfViewPage || '') : '/#');
            return (
                <a href={url} >
                    <div className="weui-form-preview__bd" style={{backgroundColor:'#fff'}} >
                        <View record={record} fields={this.state.fields}/>
                    </div>
                </a>

            );
        }

        const separator = (sectionID, rowID) => (
            <WhiteSpace key={sectionID+rowID} size="lg" />
        );

        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="Back"
                    rightContent={[
                    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                    <Icon key="1" type="ellipsis" />,
                  ]}
                    >NavBar</NavBar>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : ''}
            </div>)}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    renderSeparator={separator}
                    style={{
              height: this.state.height,
              overflow: 'auto',
            }}
                    pageSize={10}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    />

                {this.state.canAdd && <div className="weui-footer weui-footer_fixed-bottom">
                    <a href={'/#/Add/'+this.state.objid} style={{float:'right'}}>
                        <img className="weui-grid__icon" style={{width:'100px',height:'100px'}} src={addImg} />
                    </a>
                </div>}

            </div>
        );
    }
}

export default List;